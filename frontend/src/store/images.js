import { csrfFetch } from "./csrf";
import { findSpot } from "./spots";

// Variables
const CREATE = 'images/CREATE';

export const allImagesArray = (state) => Object.values(state.images);
export const allImagesObj = (state) => (state.images);

// Action Creators
const CREATE_IMAGE = (imageInfo) => ({
  type: CREATE,
  imageInfo
})

//Thunks
//CREATE IMAGE
export const createImage = (imageInfo, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: `POST`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      imageInfo
    )
  });
  if (res.ok) {
    const newImage = await res.json();
    dispatch(CREATE_IMAGE(newImage));
    dispatch(findSpot(newImage.spotId));
    return newImage;
  }
};

const initialState = {}

// Reducer
const imageReducer = (state = initialState, action) => {
  let newState = {};
  switch(action.type) {
    case CREATE: {
      newState = {};
      action.images.forEach(image => {
        newState[image.id] = image;
      })
      return newState;
    }
    default:
    return state;
  }
}

export default imageReducer;
