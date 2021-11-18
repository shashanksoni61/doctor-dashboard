import { ActionTypes } from "../constants/action-types";
export const setNursesList = (nurses) => {
  return {
    type: ActionTypes.SET_NURSES_LIST,
    payload: nurses,
  };
};
