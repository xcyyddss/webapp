// 在Redux中定义action types、action creators和reducer

// reducer.js
import { SET_USERNAME } from './actionTypes';

const initialState = {
  username: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
