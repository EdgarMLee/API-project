import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import {findSpot, allSpots, deleteSpot} from '../../store/spots';
import {allReviews} from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';
import EditSpotModal from "../EditSpotModal";
import ReviewUser from '../UserReview';
import "./FindSpot.css";


const FindSpot = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const spotsObj = useSelector(allSpots);
  const reviewsObj = useSelector(allReviews);
  const spot = spotsObj.find(spot => spot.id == spotId)
  const sessionUser = useSelector(state => state.session.user);
  let currentUser;
  useEffect(() => {
    dispatch(findSpot(spotsObj))
  }, [dispatch])

  const handleDelete = async(e) => {
  e.preventDefault();
  const response = await dispatch(deleteSpot(spotId))
  console.log('spotId', spotId)
  console.log('response', response)
  if (response) history.push("/")
}

if (sessionUser && spot) {
  if (sessionUser.id === spot.ownerId) {
    currentUser = true;
  } else currentUser = false;
}

  return (
        (
      <>
      <div className='firstDiv'/>
      <div className='topText'>
          <div className="nameSpot">{spot?.name}</div>
           <div className='ratingSpot'>
           <div className="fa-solid fa-star"/>
            {spot?.avgRating} ·
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
           <img className='imageSpot' src={spot?.previewImage} alt="Image Is Not Available"/>
           </div>
           <div className='bottomText'>
           <div className='pricesSpot'>${spot?.price}</div>
           <div className='nightsSpot'>night</div>
           <div className='descriptSpot'>{spot?.description}</div>
           <div className='createReviewSpot'>
              <CreateReviewModal/>
           </div>
           <div className='allReviewSpot'>
            {/* {reviewsObj.forEach(review => (
              <ReviewUser key={review.id} review={review}/>
            ))} */}
           </div>
           </div>
      </>
    )
  )
}

export default FindSpot;
