import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { allSpotsObj, allSpotsUser } from "../../store/spots";
import { useParams } from 'react-router-dom';
import "./SpotsByUser.css";
import Home from "../Home";
const SpotsByUser = () => {
  let currentUser;
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const spotsObj = useSelector(allSpotsObj);
  const spot = spotsObj[Number(spotId)]
  // const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(allSpotsUser());
  },[dispatch]);

  // if (sessionUser && spot) {
  //   if (sessionUser.id === spot.ownerId) {
  //     currentUser = true;
  //   } else currentUser = false;
  // }

  return  (
    <>
    <div className='SpotsTitle'>My Spots</div>
    <div className='MySpots'>
      <Home key={spot?.id} spot={spot}/>
      </div>
      </>
  )
}

export default SpotsByUser;
