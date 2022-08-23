import { csrfFetch } from "./csrf"

// Variables
const CREATE = 'reviews/CREATE';
const GET = 'reviews/GET';
// const EDIT = 'reviews/EDIT';
const DELETE = 'reviews/DELETE';
const FIND = 'reviews/FIND';

export const allReviews = (state) => Object.values(state.reviews);

// Action Creator
const CREATE_REVIEW = (reviewInfo) => ({
  type: CREATE,
  reviewInfo
})

const GET_REVIEW = (review) => ({
  type: GET,
  review
})

// const EDIT_REVIEW = (reviewId) => ({
//   type: EDIT,
//   reviewId
// })

const DELETE_REVIEW = (reviewId) => ({
  type: DELETE,
  reviewId
})

const FIND_REVIEW = (reviewId) => ({
  type: FIND,
  reviewId
})

// Thunks
//CREATE REVIEW
export const createReview = (reviewInfo) => async (dispatch) => {
  const res = await csrfFetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reviewInfo
    })
  });
  if (res.ok) {
    const newReview = await res.json();
    dispatch(CREATE_REVIEW(newReview));
    return newReview;
  }
};

//GET ALL REVIEWS
export const getAllReviews = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews');
  if (res.ok) {
    const allReviews = await res.json();
    // console.log('allReviews', allReviews);
    dispatch(GET_REVIEW(allReviews));
  };
  return res;
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
export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reviewId
    })
  });
  const review = await res.json();
  dispatch(DELETE_REVIEW(reviewId));
  return review;
}

export const findReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`)
  if (res.ok) {
    const review = await res.json()
    dispatch(FIND_REVIEW(review))
  }
  return res;
}

const initialState = {review:null}

// Reducer
const reviewReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET: {
      const newState = {...state}
      action.payload.forEach(review => {
        newState[review.id] = review;
      })
      return newState;
    }
    case CREATE: {
      const newState = {...state}
      newState[action.review.id] = action.review
      return newState;
    }
    // case EDIT: {
    //   const newState = {...state}
    //   newState[action.review.id] = action.review
    //   return newState;
    // }
    case DELETE: {
      const newState = {...state}
      delete newState[action.review.id]
      return newState;
    }
    case FIND: {
      const newState = {...state}
      newState[action.review.id] = action.review;
      return {...state, ...newState}
    }
    default:
      return state;
  }
}

export default reviewReducer;
