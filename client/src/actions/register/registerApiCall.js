import axios from 'axios';

import {
  attemptRegisterSuccessfully,
  attemptRegisterFailed
} from './attemptRegisterAction';

import { HOST, REGISTER_URI } from '../../constant';

// Register
export const attemptRegister = userData => dispatch => {
  axios
    .post(`${HOST}${REGISTER_URI}`, userData)
    .then(res => {
      console.log('attempt register callAPI');
      console.log(res.data);
      dispatch(attemptRegisterSuccessfully(res.data));
    })
    .catch(err => {
      console.log('error');
      console.log(err);
      dispatch(attemptRegisterFailed(err));
    });
};
