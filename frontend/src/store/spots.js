import { csrfFetch } from "./csrf"

// Variables
const CREATE = 'spots/CREATE';
const GET = 'spots/GET';
// const EDIT = 'spots/EDIT';
const DELETE = 'spots/DELETE';
const FIND = 'spots/FIND';

export const allSpotsArray = (state) => Object.values(state.spots);
export const allSpotsObj = state => state.spots

// Action Creator
const CREATE_SPOT = (spotInfo) => ({
  type: CREATE,
  spotInfo
})

const GET_SPOT = (spots) => ({
  type: GET,
  spots
})

// const EDIT_SPOT = (spot) => ({
//   type: EDIT,
//   spot
// })

const DELETE_SPOT = (spotId) => ({
  type: DELETE,
  spotId
})

// const FIND_SPOT = (spotId) => ({
//   type: FIND,
//   spotId
// })

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
    dispatch(findSpotID(newSpot.id));
    return newSpot;
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
  const res = await csrfFetch('/api/spots/current');
  console.log('res', res)
  if (res.ok) {
    const allSpots = await res.json();
    // console.log('allSpots', allSpots)
    dispatch(GET_SPOT(allSpots.Spots));
  };
}

//EDIT A SPOT BY ID
export const editSpot = (info, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info)
  });
  if (res.ok) {
    const eachSpot = await res.json();
    dispatch(findSpot(eachSpot.id));
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

export const findSpotID = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const spot = await res.json();
    dispatch(CREATE_SPOT(spot));
  }
};

export const createImage = (imageUrl, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(imageUrl)
  })
  if (res.ok) {
    dispatch(findSpotID(spotId))
  }
  return res;
}

const initialState = {}

// SPOT Reducer
const spotReducer = (state = initialState, action) => {
  let newState = {}
  switch(action.type) {
    case GET: {
      newState = {};
      action.spots.forEach(spot => {
        newState[spot.id] = spot;
      })
      return newState;
    }
    case CREATE: {
      newState = {...state}
      newState[action.spotInfo.id] = action.spotInfo
      return newState;
    }
    // case EDIT: {
    //   newState = {...state}
    //   newState[action.spot.id] = {newState[action.spot.id], ...action.spot}
    //   return newState;
    // }
    case DELETE: {
      newState = {...state}
      delete newState[action.spotId]
      return newState;
    }
    case FIND: {
      newState = {...state}
      newState[action.spotId] = action.spot;
      return newState;
    }
    default:
      return state;
  }
}

export default spotReducer;
