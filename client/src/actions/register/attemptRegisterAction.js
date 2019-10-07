/* eslint-disable import/prefer-default-export */
import {
  ATTEMPT_REGISTER_FAILED,
  ATTEMPT_REGISTER_SUCCESSFULLY
} from '../../constant';

export const attemptRegisterFailed = error => ({
  type: ATTEMPT_REGISTER_FAILED,
  payload: error
});

export const attemptRegisterSuccessfully = user => ({
  type: ATTEMPT_REGISTER_SUCCESSFULLY,
  payload: user
});
