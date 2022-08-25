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
          )}
      </div>
    </>
   )
  )
}

export default Home;
