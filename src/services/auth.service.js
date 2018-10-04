import {userService} from './';

var registerAuthChangeFn;

function check(){
  return localStorage.getItem('user') !== null;
}

function getClubs(){
  return [1,2,3];
}

function getUserId(){
  return getUser().getUserId();
}

function getUser(){
  return userService.getUserById(1);
}

function registerAuthChange(fn){
  registerAuthChangeFn = fn;
}

function login(username, password){
  localStorage.setItem('user',true);
  registerAuthChangeFn && registerAuthChangeFn(true);
  return true;
}

function logout(){
  localStorage.removeItem('user');
}

export const authService = {
  check,
  getUser,
  getUserId,
  login,
  logout,
  registerAuthChange,
  getClubs
};

//export default authService;
