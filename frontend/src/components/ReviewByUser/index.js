import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import UserReview from "../UserReview";
import { allReviewsUser, allReviewsArray } from "../../store/reviews";
import "./ReviewByUser.css";
const ReviewByUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allReviews = useSelector(allReviewsArray);
  useEffect(() => {
    dispatch(allReviewsUser());
  },[dispatch]);

  return (
    <>
    <div className='ReviewsTitle'>My Reviews</div>
    <div className='MyReviews'>
    {allReviews.map((review) => (
      <UserReview key={review?.id} review={review}/>
      ))}
      </div>
      </>
  )
}

export default ReviewByUser;
