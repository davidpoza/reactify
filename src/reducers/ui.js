import types from '../actions/types';

const initialState = {
  transparentToolbar: false,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.TRANSPARENT_TOOLBAR:
      return {
        ...state,
        transparentToolbar: true,
      }
    case types.OPAQUE_TOOLBAR:
      return {
        ...state,
        transparentToolbar:false,
      }
    default:
      return state;
  }
}

export default reducer;
