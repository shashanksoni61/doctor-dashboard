import { ActionTypes } from "../constants/action-types";

const intialState = {
  nurses: [],
};
export const nursesListReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_NURSES_LIST:
      return { ...state, nurses: payload };
    default:
      return state;
  }
};
