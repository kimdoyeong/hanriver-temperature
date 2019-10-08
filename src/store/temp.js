import { createAction, handleActions } from "redux-actions";
import { takeEvery, put, call } from "redux-saga/effects";
import getTemperature from "../lib/getTemperature";

// Types
const REFRESH_TEMPERATURE = "temp/REFRESH_TEMPERATURE";
const REFRESH_TEMPERATURE_SUCCESS = "temp/REFRESH_TEMPERATURE_SUCCESS";
const REFRESH_TEMPERATURE_FAIL = "temp/REFRESH_TEMPERATURE_FAIL";

export const refreshTemperature = createAction(REFRESH_TEMPERATURE);

function* refreshTemperatureSaga(action) {
  try {
    const res = yield call(getTemperature);
    yield put({ type: REFRESH_TEMPERATURE_SUCCESS, payload: res.data });
  } catch (e) {
    yield put({ Type: REFRESH_TEMPERATURE_FAIL, error: e });
  }
}

export function* tempSaga() {
  yield takeEvery(REFRESH_TEMPERATURE, refreshTemperatureSaga);
}

const initialState = {
  success: false,
  error: null,
  temperature: null
};

export default handleActions(
  {
    [REFRESH_TEMPERATURE_SUCCESS]: (state, action) => {
      return {
        success: true,
        temperature: action.payload
      };
    },
    [REFRESH_TEMPERATURE_FAIL]: (state, action) => {
      return {
        ...state,
        success: false,
        error: action.error.response
          ? action.error.response.data
          : action.error.message
      };
    }
  },
  initialState
);
