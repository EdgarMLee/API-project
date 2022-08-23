import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import {findSpot, allSpots} from '../../store/spots';
import "./FindSpot.css";


const FindSpot = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const spotsObj = useSelector(allSpots);
  const spot = spotsObj.find(spot => spot.id == spotId)

  useEffect(() => {
    dispatch(findSpot(spotsObj))
  }, [dispatch])

  return (
        (
      <>
      <div className='firstDiv'></div>
      <div>
          <div className="nameSpot">{spot?.name}</div>
          {/* TODO IMPLEMENT A STAR ICON HERE */}
           <div className='ratingSpot'>
           <div className="fa-solid fa-star"/>
            {spot?.avgRating} ·
            </div>
           <div key={spot?.id} className='stateSpot'> · {spot?.city}, {spot?.state}, {spot?.country}</div>
          <div className='imgDiv'>
           <img className='imageSpot' src={spot?.previewImage} alt="Image Not Available"/>
           </div>
           <div className='pricesSpot'>${spot?.price}</div>
           <div className='nightsSpot'>night</div>
      </div>
      </>
    )
  )
}

export default FindSpot;
