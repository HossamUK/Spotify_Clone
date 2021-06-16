import { combineReducers } from "redux";
import { get_spotfiy, get_user } from "./actionTypes";

export const getUser = (state = null, action: any) => {
  switch (action.type) {
    case get_user.type:
      return action.user;
    default:
      return state;
  }
};

export const getSpotfiy = (state = null, action: any) => {
  switch (action.type) {
    case get_spotfiy.type:
      return action.spotify;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: getUser,
  spotify: getSpotfiy,
});