import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import {findSpot, allSpotsArray, allSpotsObj, deleteSpot} from '../../store/spots';
import {allReviewsArray, allReviewsObj, findReview} from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';
import EditSpotModal from "../EditSpotModal";
import UserReview from '../UserReview';
import "./FindSpot.css";

const FindSpot = () => {
  let currentUser;
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const spotsObj = useSelector(allSpotsObj);
  const reviewsObj = useSelector(allReviewsArray);
  const [isLoaded, setIsLoaded] = useState(false)
  const spot = spotsObj[Number(spotId)]
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(findSpot(spotId))
    // dispatch(findReview(spotId))
    .then(() => dispatch(findReview(spotId)))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  const handleDelete = (e) => {
  e.preventDefault();
  const res = dispatch(deleteSpot(spotId))
  if (res) history.push("/")
}

if (sessionUser && spot) {
  if (sessionUser.id === spot.ownerId) {
    currentUser = true;
  } else currentUser = false;
}


  return isLoaded && (
        (
      <>
      <div className='firstDiv'/>
      <div className='topText'>
          <div className="nameSpot">{spot?.name}</div>
           <div className='ratingSpot'>
           <div className="fa-solid fa-star"/>
            {spot?.avgRating} · {spot?.numReviews} reviews
            </div>
            {currentUser && (
            <div className='editDeleteSpot'>
              <EditSpotModal/>
              <button onClick={handleDelete} className='deleteButton'>Delete</button>
            </div>
             )}
           <div key={spot?.id} className='stateSpot'> · {spot?.city}, {spot?.state}, {spot?.country}</div>
      </div>
          <div className='imgDiv'>
           <img className='imageSpot' src={spot?.Images[0]?.url || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt="Image Is Not Available"/>
           </div>
           <div className='bottomText'>
           <div className='pricesSpot'>${spot?.price}</div>
           <div className='nightsSpot'>night</div>
           <div className='descriptSpot'>{spot?.description}</div>
           <div className='createReviewSpot'>
              <CreateReviewModal/>
           </div>
           <div className='allReviewSpot'>
            {reviewsObj.map(review => (
              <UserReview key={review.id} review={review}/>
            ))}
           </div>
           </div>
      </>
    )
  )
}

export default FindSpot;
