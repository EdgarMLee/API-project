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
           <div className='starSpot'>{spot?.avgRating}</div>
           <div key={spot?.id} className='citySpot'>{spot?.city}, {spot?.state}</div>
          <div className='imgDiv'>
           <img className='imgSpot' src={spot?.previewImage} alt="Image Not Available"/>
           </div>
           <div className='priceSpot'>${spot?.price}</div>
           <div className='nightSpot'>night</div>
      </div>
      </>
    )
  )
}

export default FindSpot;
