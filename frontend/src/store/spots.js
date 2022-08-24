import { csrfFetch } from "./csrf"

// Variables
const CREATE = 'spots/CREATE';
const GET = 'spots/GET';
const EDIT = 'spots/EDIT';
const DELETE = 'spots/DELETE';
const FIND = 'spots/FIND';

export const allSpotsArray = (state) => Object.values(state.spots);
export const allSpotsObj = state => state.spots
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

const EDIT_SPOT = (spot) => ({
  type: EDIT,
  spot
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
    body: JSON.stringify(spotInfo)
  });
  if (res.ok) {
    const newSpot = await res.json();
    dispatch(CREATE_SPOT(newSpot));
  };
  return res;
}

//GET ALL SPOTS
export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  if (res.ok) {
    const allSpots = await res.json();
    dispatch(GET_SPOT(allSpots.spots));
  };
  return res;
}

//GET ALL SPOTS BY CURRENT USER
export const allSpotsUser = () => async (dispatch) => {
  const res = await csrfFetch('/api/currentUser/spots');
  if (res.ok) {
    const allSpots = await res.json();
    dispatch(GET_SPOT(allSpots.spots));
  };
  return res;
}

//EDIT A SPOT
export const editSpot = (info, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info)
  });
  if (res.ok) {
    const eachSpot = await res.json();
    dispatch(EDIT_SPOT(eachSpot));
  };
    return res;
}

//DELETE A SPOT
export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  });
  // const spot = await res.json();
  if (res.ok) {
    dispatch(DELETE_SPOT(spotId));
  }
  return res;
}

//FIND A SPOT'S DETAIL
export const findSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)
  if (res.ok) {
    const spot = await res.json()
    dispatch(GET_SPOT([spot]))
  }
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
      newState[action.spotInfo.id] = action.spotInfo
      return newState;
    }
    case EDIT: {
      const newState = {...state}
      newState[action.spot.id] = action.spot
      return newState;
    }
    case DELETE: {
      console.log('state', state)
      const newState = {...state}
      console.log('newState', newState)
      delete newState[action.spotId]
      return newState;
    }
    case FIND: {
      const newState = {...state}
      newState[action.spotId] = action.spot;
      return newState;
    }
    default:
      return state;
  }
}

export default spotReducer;
