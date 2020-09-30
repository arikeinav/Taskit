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
}
function _handleLogin(user) {
  return user;
}
function getById(userId) {
  return httpService.get(`user/${userId}`);
}

function update(user) {
  return storageService.put('user', user)
}

function loginAsGuest(){
    const user = { _id: 'u104', userName: 'Guest'}
    return  user 
       
}
