import storageService from './asyncStorageService'
// import httpService from './httpService'

const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}

window.userService = userService;
export default userService;

function getUsers() {
    return storageService.query('user')
}

function getById(userId) {
    // return httpService.get(`user/${userId}`)
    return storageService.get('user', userId)
}
function remove(userId) {
    // return httpService.delete(`user/${userId}`)
    return storageService.remove('user', userId)
}

function update(user) {
    return storageService.put('user', user)
    // return httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    // const user = await httpService.post('auth/login', userCred)
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    if (user) return _handleLogin(user)
}
async function signup(userCred) {
    // const user = await httpService.post('auth/signup', userCred)
    const user = await storageService.post('user', userCred)
    return _handleLogin(user)
}
async function logout() {
    // await httpService.post('auth/logout');
    sessionStorage.clear();
}
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}