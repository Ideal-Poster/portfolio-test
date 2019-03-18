const initialState = {
  counter: 0,
  repeatArray: [0, 1, 2, 3, 4, 5]
}

const reducer = (state = initialState, action) => {
  if (action.type === 'SELECT') {
      return {
        ...state,
        repeatArray: console.log(state)
      }
  }
  return state;
};

export default reducer;