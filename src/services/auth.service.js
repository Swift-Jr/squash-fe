var registerAuthChangeFn;

function check(){
  return localStorage.getItem('user') !== null;
}

function getClubs(){
  return [1,2,3];
}

function getLeagues(){
  return [];
}

function getUserId(){
  return getUser().id;
}

function getUser(){
  return {
    id: 1,
    firstname: 'Rob',
    lastname: 'Guard'
  };
}

function getUserById(id){
  return {
    id: id,
    firstname: 'Gavin',
    lastname: 'Brooks'
  };
}

function registerAuthChange(fn){
  registerAuthChangeFn = fn;
}

function login(){
  localStorage.setItem('user',true);
  registerAuthChangeFn && registerAuthChangeFn(true);
  return true;
}

function logout(){
  localStorage.removeItem('user');
}

export const authService = {
  check,
  getClubs,
  getLeagues,
  getUserId,
  login,
  logout,
  registerAuthChange,
  getUser,
  getUserById
};

//export default authService;
