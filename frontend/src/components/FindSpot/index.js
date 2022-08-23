import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import {findSpot, allSpots, deleteSpot} from '../../store/spots';
import CreateReviewModal from '../CreateReviewModal';
import EditSpotModal from "../EditSpotModal";
import "./FindSpot.css";


const FindSpot = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const spotsObj = useSelector(allSpots);
  const spot = spotsObj.find(spot => spot.id == spotId)
  const sessionUser = useSelector(state => state.session.user);
  let currentUser;
  useEffect(() => {
    dispatch(findSpot(spotsObj))
  }, [dispatch])

  const handleDelete = async (e) => {
  e.preventDefault();
  dispatch(deleteSpot(spotId))
  history.push("/")
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
           <div className='reviewSpot'>
              <CreateReviewModal/>
           </div>
           </div>
      </>
    )
  )
}

export default FindSpot;
