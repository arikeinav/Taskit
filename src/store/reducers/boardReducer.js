const initialState = {
    boards: [],
    currBoard : null
  };
  
  export function boardReducer(state = initialState, action) {
    switch (action.type) {
      case "SET_BOARDS":
  
        return {
          ...state,
          boards: [...action.boards],
        };
        case "SET_BOARD":
            return {
              ...state,
              currBoard: {...action.board},
            };
      case "REMOVE_BOARD":
        return {
          ...state,
          boards: state.boards.filter((board) => board._id !== action.id),
        };
  
      case "ADD_BOARD":
        return {
          ...state,
          boards: [...state.boards, action.board],
        };
      case "UPDATE_BOARD":
        return {
          ...state,
          currBoard: {...action.board},
        };
        case "CLEAN_BOARD":
        return {
          ...state,
          currBoard: action.value,
        };
  
      default:
        return state;
    }
  }