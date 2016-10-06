import * as types from './action_types';
import sessionApi from '../api/session_api';

export function signinSuccess() {
  return {
    type: types.SIGN_IN_SUCCESS
  }
}

export function signInUser(credentials) {
  return function(dispatch) {
    return sessionApi.signin(credentials).then(response => {
      sessionStorage.setItem('jwt', response.jwt);
      dispatch(signinSuccess());
    }).catch(error => {
      throw (error);
    });
  };
}