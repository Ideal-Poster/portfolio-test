import produce from 'immer';


const initialState = {
  counter: 0,
  repeatArray: [0, 1, 2, 3, 4, 5]
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'REMOVE':
      return {
        
      }
  }
  // if (action.type === 'REMOVE') {
  //     return {
  //       ...state,
  //       repeatArray:
  //         console.log(
  //           action.type
  //         )
  //     }
  // }
  return state;
};

export default reducer;