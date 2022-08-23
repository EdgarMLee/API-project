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
      <div className='firstDiv'/>
      <div className='topText'>
          <div className="nameSpot">{spot?.name}</div>
           <div className='ratingSpot'>
           <div className="fa-solid fa-star"/>
            {spot?.avgRating} ·
            </div>
            <div className='e'></div>
           <div key={spot?.id} className='stateSpot'> · {spot?.city}, {spot?.state}, {spot?.country}</div>
      </div>
          <div className='imgDiv'>
           <img className='imageSpot' src={spot?.previewImage} alt="Image Is Not Available"/>
           </div>
           <div className='bottomText'>
           <div className='pricesSpot'>${spot?.price}</div>
           <div className='nightsSpot'>night</div>
           <div className='descriptSpot'>{spot?.description}</div>
           </div>
      </>
    )
  )
}

export default FindSpot;
