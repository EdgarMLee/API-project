import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {allSpotsArray,getAllSpots} from '../../store/spots';
import "./Home.css";
import SpotBox from '../SpotBox';
const Home = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector(allSpotsArray);
  useEffect(() => {
    dispatch(getAllSpots(spotsObj))
  },[dispatch])

  return (
    spotsObj && (
      <>
      <div className='firstDiv'></div>
      <div className='spotBox'>
        {spotsObj?.map(spot => (
          <SpotBox spot={spot}/>
        )
          // <Link key={spot?.id} className='eachSpot' to={`/spots/${spot?.id}`}>
          // <div className='imgDiv'>
          //  <img className='imgSpot' src={spot?.previewImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt="Image Not Available"/>
          //  </div>
          //  <div className='locationReviews'>
          //  <div key={spot?.id} className='citySpot'>{spot?.city}, {spot?.state}</div>
          //  <div className='starSpot'>
          //  <div className="fa-solid fa-star"/>
          //  {spot?.avgRating}</div>
          //  </div>
          //  <div className='priceNight'>
          //  <div className='priceSpot'>${spot?.price}</div>
          //  <div className='nightSpot'>night</div>
          //  </div>
          //  </Link>
          )}
      </div>
    </>
   )
  )
}

export default Home;
