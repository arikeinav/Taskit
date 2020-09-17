import httpService from "./httpService";

export default {
  login,
  logout,
  signup,
  getById,
  update,
  loginAsGuest
};



function getById(userId) {
  return httpService.get(`user/${userId}`);
}


function update(user) {
  return httpService.put(`user/${user._id}`, user);
}

async function login(userCred) {
  const user = { _id: 'u104', userName: userCred.username}
  return user
  // const user = await httpService.post("auth/login", userCred);
  // return _handleLogin(user);
}

async function signup(userCred) {
  const user = { id:'u'+ makeId, userName: userCred.username,password:userCred.password}
  return user
  // const user = await httpService.post("auth/signup", userCred);
  // return _handleLogin(user);
}

async function logout() {
  // await httpService.post("auth/logout");
  // sessionStorage.clear();
  return
}

function _handleLogin(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
  return user;
}


function loginAsGuest(){
    const user = { _id: 'u104', userName: 'Guest'}
    return  user 
       
}
function makeId(length = 3) {
  var txt = '';
  var possible = '0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}