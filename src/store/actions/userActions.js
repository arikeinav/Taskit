// import { cloneElement } from "react";
import { userService } from "../../services/userService";

export function login(userCreds) {
  return async dispatch => {
    const user = await userService.login(userCreds);
    if(!user) return;
    dispatch({ type: 'SET_USER', user }); 
    window.location.assign('#/board')
    return user
    }
};
export function signup(userCreds) {
  return async dispatch => {
    const user = await userService.signup(userCreds);
    dispatch({ type: 'SET_USER', user });
    window.location.assign('#/board')
  };
}
export function logout() {
  return async dispatch => {
    await userService.logout();
    dispatch({ type: 'SET_USER', user: null });
    window.location.assign('#/')

  };
}










export function update(userCreds) {
  return async dispatch => {
    const user = await userService.signup(userCreds);
    dispatch({ type: 'SET_USER', user });
    window.location.assign('#/board')
  };
}

export function loginAsGuest() {
  return async dispatch => {
    const user = await userService.loginAsGuest();
    dispatch({ type: 'SET_USER', user });
    window.location.assign('#/board')
  };
}