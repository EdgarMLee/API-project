import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import "./userReview.css";

function reviewUser() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  
}
