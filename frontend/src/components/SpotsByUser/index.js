import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { allSpotsArray, allSpotsUser } from "../../store/spots";
import { useParams } from 'react-router-dom';
import "./SpotsByUser.css";
import SpotBox from "../SpotBox";
const SpotsByUser = () => {
  let currentUser;
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const spotsObj = useSelector(allSpotsArray);
  // const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(allSpotsUser());
  },[dispatch]);

  return  (
    <>
    <div className='SpotsTitle'>My Spots</div>
    <div className='MySpots'>
      {spotsObj.map(spot => (<SpotBox key={spot?.id} spot={spot}/>))}
      </div>
      </>
  )
}

export default SpotsByUser;
