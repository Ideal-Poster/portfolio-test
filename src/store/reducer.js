import produce from 'immer';


const initialState = {
  counter: 0,
  repeatArray: [0, 1, 2, 3, 4, 5]
}


function reducer(state = initialState, action) {
  console.log("reducer", state, action);

  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        count: state.count - 1
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
}

export default reducer;