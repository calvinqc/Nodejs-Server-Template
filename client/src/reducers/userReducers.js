import {
  ATTEMPT_REGISTER_SUCCESSFULLY,
  ATTEMPT_REGISTER_FAILED,
  GET_ERRORS
} from "../constant";

export default function(state = { loading: false, errors: null }, action) {
  switch (action.type) {
    // Register
    case ATTEMPT_REGISTER_SUCCESSFULLY:
      return { ...state, ...action.payload, ...{ loading: false } };
    case ATTEMPT_REGISTER_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };

    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
