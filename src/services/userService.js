import httpService from "./httpService";
import storageService from './asyncStorageService'

export const userService ={
  login,
  logout,
  signup,
  getById,
  update,
  loginAsGuest
};



async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  return _handleLogin(user)
}
async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred)
  return _handleLogin(user)
}
async function logout() {
  await httpService.post('auth/logout');
  // sessionStorage.clear();
}
function _handleLogin(user) {
  // sessionStorage.setItem('user', JSON.stringify(user))
  return user;
}













function getById(userId) {
  // return httpService.get(`user/${userId}`);
  return storageService.get('user', userId)
}


function update(user) {
  return storageService.put('user', user)
  // return httpService.put(`user/${user._id}`, user);
}


// async function signup(userCred) {
//   userCred._id ='u'+ makeId
//   const user = await storageService.post('user', userCred)
//     return _handleLogin(user)

//   // const user = await httpService.post("auth/signup", userCred);
//   // return _handleLogin(user);
// }

// async function logout() {
//   // await httpService.post("auth/logout");
//   // sessionStorage.clear();
//   sessionStorage.clear()
  
// }



function loginAsGuest(){
    const user = { _id: 'u104', userName: 'Guest'}
    return  user 
       
}


// function makeId(length = 5) {
//   var txt = '';
//   var possible = '0123456789abcdefgABCDEFG';
//   for (var i = 0; i < length; i++) {
//     txt += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return txt;
// }