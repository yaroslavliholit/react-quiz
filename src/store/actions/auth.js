import axios from 'axios';
import data from '../../axios/database.js';
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionsType.js';

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url = data.signUp;

    if (isLogin) {
      url = data.signInWithPassword;
    } 
    
    const response = await axios.post(url, authData);
    const dbData = response.data;
    const expirationDate = new Date( new Date().getTime() + dbData.expiresIn * 1000 );

    localStorage.setItem('token', dbData.idToken);
    localStorage.setItem('userId', dbData.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(dbData.idToken));
    dispatch(autoLogout(dbData.expiresIn));
  }
}

export function autoLogout (time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT,
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  }
}

export function autoLogin () {
  return async dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
       const expirationDate = new Date(localStorage.getItem('expirationDate'));

       if (  expirationDate <= new Date() ) {
         dispatch(logout());
       } else {
         dispatch(authSuccess(token));
         dispatch(autoLogout((expirationDate.getTime() - new Date()) / 1000));
       }
    }
  }
}