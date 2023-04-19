import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {findSpot, allSpotsObj, deleteSpot} from '../../store/spots';
import {allReviewsArray, getAllReviewsBySpot} from '../../store/reviews';
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
  const spot = spotsObj[Number(spotId)];
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(findSpot(spotId))
    .then(() => dispatch(getAllReviewsBySpot(spotId)))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  const handleDelete = async (e) => {
  e.preventDefault();
  const res = await dispatch(deleteSpot(spotId))
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
            <div className='outsideStar'>
           <div className="fa-solid fa-star reviewStarTitle"/>
           {spot?.avgRating} · {spot?.countReviews} reviews · {spot?.city}
            <div key={spot?.id} className='stateSpot'>  , {spot?.state}, {spot?.country}</div>
           </div>
           </div>
            {currentUser && (
              <div className='editDeleteSpot'>
              <EditSpotModal/>
              <button onClick={handleDelete} className='deleteButton'>Delete</button>
            </div>
             )}
      </div>
          <div className='imgDivfs'>
           <img className='imageSpotfs' src={spot?.Images[0] ? spot?.Images[0]?.url : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt="Image Is Not Available"/>
           </div>
           <div className='bottomText'>
            <div className='priceNightfs'>
           <div className='descriptSpot'>{spot?.description}</div>
           <div className='spotdetailBox'>
           <div className='pricesSpot'>${spot?.price}
           <div className='nightsSpot'>night</div>
           </div>
           <div className='spotstarReviews'>
           <div className="fa-solid fa-star reviewStar"/>
            {spot?.avgRating} · {spot?.countReviews} reviews
           </div>
           </div>
            </div>
            </div>
           <div className='createReviewSpot'>
             {sessionUser && <CreateReviewModal spotId={spotId}/>}
           </div>
           <div className='emptyBorder'/>
           <div className='bottomAvgCount'>
           <div className='allReviewSpot'>
           <div className='reviewsCard'>
           <div className="fa-solid fa-star reviewCardStar"/>
            {spot?.avgRating} · {spot?.countReviews} reviews
            <div className='profileReview'>
            {reviewsObj.map(review => (
              <UserReview key={review?.id} review={review}/>
              ))}
              </div>
              </div>
           </div>
           </div>
      </>
    )
  )
}

export default FindSpot;
