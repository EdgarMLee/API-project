import { csrfFetch } from "./csrf"

// Variables
const CREATE = 'spots/CREATE';
const GET = 'spots/GET';
const EDIT = 'spots/EDIT';
const DELETE = 'spots/DELETE';
const FIND = 'spots/FIND';

export const allSpots = (state) => Object.values(state.spots);
// console.log('allSpots',allSpots)

// Action Creator
const CREATE_SPOT = (spotInfo) => ({
  type: CREATE,
  spotInfo
})

const GET_SPOT = (spots) => ({
  type: GET,
  spots
})

const EDIT_SPOT = (spotId) => ({
  type: EDIT,
  spotId
})

const DELETE_SPOT = (spotId) => ({
  type: DELETE,
  spotId
})

const FIND_SPOT = (spotId) => ({
  type: FIND,
  spotId
})

// THUNKS
//CREATE SPOT
export const createSpot = (spotInfo) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      spotInfo
    })
  });
  if (res.ok) {
    const newSpot = await res.json();
    dispatch(CREATE_SPOT(newSpot));
    return newSpot;
  }
};

//GET ALL SPOTS
export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  if (res.ok) {
    const allSpots = await res.json();
    // console.log('allSpots', allSpots);
    dispatch(GET_SPOT(allSpots.spots));
  };
  return res;
}

//EDIT A SPOT
export const editSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      spotId
    })
  });
  if (res.ok) {
    const eachSpot = await res.json();
    dispatch(EDIT_SPOT(eachSpot));
    return eachSpot;
  };
}

//DELETE A SPOT
export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      spotId
    })
  });
  const spot = await res.json();
  dispatch(DELETE_SPOT(spotId));
  return spot;
}

export const findSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)
  if (res.ok) {
    const spot = await res.json()
    dispatch(FIND_SPOT(spot))
  }
  return res;
}

const initialState = {}

// SPOT Reducer
const spotReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET: {
      const newState = {...state}
      action.spots.forEach(spot => {
        newState[spot.id] = spot;
      })
      return newState;
    }
    case CREATE: {
      const newState = {...state}
      newState[action.spot.id] = action.spot
      return newState;
    }
    case EDIT: {
      const newState = {...state}
      newState[action.spot.id] = action.spot
      return newState;
    }
    case DELETE: {
      const newState = {...state}
      delete newState[action.spot.id]
      return newState;
    }
    case FIND: {
      const newState = {...state}
      newState[action.spot.id] = action.spot;
      return {...state, ...newState}
    }
    default:
      return state;
  }
}

export default spotReducer;
