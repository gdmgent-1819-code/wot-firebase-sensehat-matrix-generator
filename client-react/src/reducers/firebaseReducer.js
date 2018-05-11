import { FETCH_MATRICES } from '../actions/types';

const initialState = {
  error: undefined
}

function firebaseReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MATRICES:
      return action.payload;
    default:
      return state;
  }
}

export default firebaseReducer; 