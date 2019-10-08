import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import temp, { tempSaga } from "./temp";
export function* rootSaga() {
  yield all([tempSaga()]);
}

export default combineReducers({
  temp
});
