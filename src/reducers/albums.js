import { getAlbums } from '../actions/albums';

const initialState = {
  isLoading: false,
  error: false,
  fetched: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case String(getAlbums.pending):
      return {
        ...state,
        isLoading: true,
        fetched: [],
        error: false
      };
    case String(getAlbums.fulfilled):
      return {
        ...state,
        isLoading: false,
        fetched: action.payload,
        error: false
      };
      case String(getAlbums.rejected):
    return {
      ...state,
      isLoading: false,
      fetched: [],
      error: true
    };
    default:
      return state;
  }
}

export default reducer;
