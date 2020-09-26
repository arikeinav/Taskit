// let localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
  loggedInUser: null,
};

export function userReducer (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user };
    default:
      return state;
  }
}