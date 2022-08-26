import { csrfFetch } from "./csrf"
import { findSpot } from "./spots";

// Variables
const CREATE = 'reviews/CREATE';
const GET = 'reviews/GET';
const DELETE = 'reviews/DELETE';
// const FIND = 'reviews/FIND';

export const allReviewsArray = (state) => Object.values(state.reviews);
export const allReviewsObj = state => state.reviews;

// Action Creators
const CREATE_REVIEW = (reviewInfo) => ({
  type: CREATE,
  reviewInfo
})

const GET_REVIEW = (reviews) => ({
  type: GET,
  reviews
})

const DELETE_REVIEW = (reviewId) => ({
  type: DELETE,
  reviewId
})

// const FIND_REVIEW = (reviewId) => ({
//   type: FIND,
//   reviewId
// })

// Thunks
//CREATE REVIEW
export const createReview = (reviewInfo, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      reviewInfo
    )
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(CREATE_REVIEW(newReview));
    dispatch(findSpot(newReview.spotId));
    return newReview;
  }
};

//GET ALL REVIEWS
export const getAllReviews = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews');
  if (res.ok) {
    const allReviews = await res.json();
    dispatch(GET_REVIEW(allReviews.Reviews));
  };
  return res;
}

//GET ALL REVIEWS BY CURRENT USER
export const allReviewsUser = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews/current');
  if (res.ok) {
    const allReviews = await res.json();
    console.log('allReviews', allReviews)
    dispatch(GET_REVIEW(allReviews.Reviews));
  };
}

export const getAllReviewsBySpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const review = await res.json();
    dispatch(GET_REVIEW(review.Reviews))
  }
}

//EDIT A REVIEW
// export const editReview = (reviewId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/reviews/${reviewId.id}`, {
//     method: "PUT",
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       reviewId
//     })
//   });
//   if (res.ok) {
//     const eachReview = await res.json();
//     dispatch(EDIT_REVIEW(eachReview));
//     return eachReview;
//   }
// }

//DELETE A REVIEW
export const deleteReview = (reviewId, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reviewId
    })
  });
  const review = await res.json();
  dispatch(DELETE_REVIEW(reviewId));
  dispatch(findSpot(spotId))
  return review;
}

export const findReview = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
  if (res.ok) {
    const review = await res.json()
    dispatch(GET_REVIEW(review.Reviews))
    dispatch(getAllReviewsBySpot(review.spotId))
    dispatch(findSpot(review.spotId))
  }
}

const initialState = {}

// Reducer
const reviewReducer = (state = initialState, action) => {
  let newState = {};
  switch(action.type) {
    case GET: {
      newState = {};
      action.reviews.forEach(review => {
        newState[review.id] = review;
      })
      return newState;
    }
    case CREATE: {
      newState = {...state}
      newState[action.reviewInfo.id] = action.reviewInfo
      return newState;
    }
    // case EDIT: {
    //   const newState = {...state}
    //   newState[action.review.id] = action.review
    //   return newState;
    // }
    case DELETE: {
      newState = {...state}
      delete newState[action.reviewId]
      return newState;
    }
    // case FIND: {
    //   const newState = {...state}
    //   newState[action.review.id] = action.review;
    //   return newState
    // }
    default:
      return state;
  }
}

export default reviewReducer;
