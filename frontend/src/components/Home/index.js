import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {allSpots,getAllSpots} from '../../store/spots';
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector(allSpots);
// console.log('spotsObj',spotsObj)
// console.log('allSpots',allSpots)
  useEffect(() => {
    dispatch(getAllSpots(spotsObj))
  },[dispatch])

  return (
    spotsObj && (
      <>
      <div className='firstDiv'></div>
      <div>
        {spotsObj?.map(spot =>
            // console.log("***spot***",spot)
          <Link className='eachSpot' to={`/spots/${spot?.id}`}>
          <div className='imgDiv'>
           <img className='imgSpot' src={spot?.previewImage} alt="Image Not Available"/>
           </div>
           <div key={spot?.id} className='citySpot'>{spot?.city}, {spot?.state}</div>
           <div className='starSpot'>{spot?.avgRating}</div>
           <div className='priceSpot'>${spot?.price}</div>
           <div className='nightSpot'>night</div>
           </Link>
          )}
      </div>
    </>
   )
  )
}

export default Home;
