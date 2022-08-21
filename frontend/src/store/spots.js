import { csrfFetch } from "./csrf"

// Variables
const CREATE = 'spots/CREATE';
const GET = 'spots/GET';
const EDIT = 'spots/EDIT';
const DELETE = 'spots/DELETE';

export const allSpots = (state) => Object.values(state.spots);

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

// Thunks
//CREATE SPOT
export const createSpot = (spotInfo) => async (dispatch) => {
  const { ownerId, address, city, state, country, lat, lng, name, description, price } = spotInfo
  const res = await csrfFetch('/api/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ownerId, address, city, state, country, lat, lng, name, description, price
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
    console.log('allSpots', allSpots);
    dispatch(GET_SPOT(spots));
  };
}

//EDIT A SPOT
export const editSpot = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  const spot = await res.json();
  dispatch(EDIT_SPOT(spot));
}

//EDIT A SPOTS
export const deleteSpot = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  const spot = await res.json();
  dispatch(DELETE_SPOT(spot));
}

// Reducer
