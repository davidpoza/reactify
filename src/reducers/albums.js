import { getAlbums, getAlbum } from '../actions/albums';

const initialState = {
  isLoading: false,
  error: false,
  albumsFetched: [],
  albumFetched: undefined,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case String(getAlbums.pending):
      return {
        ...state,
        isLoading: true,
        albumsFetched: [],
        error: false
      };
    case String(getAlbums.fulfilled):
      return {
        ...state,
        isLoading: false,
        albumsFetched: action.payload,
        error: false
      };
      case String(getAlbums.rejected):
    return {
      ...state,
      isLoading: false,
      albumsFetched: [],
      error: true
    };
    case String(getAlbum.pending):
      return {
        ...state,
        isLoading: true,
        albumFetched: undefined,
        error: false
      };
    case String(getAlbum.fulfilled):
      return {
        ...state,
        isLoading: false,
        albumFetched: action.payload,
        error: false
      };
      case String(getAlbum.rejected):
    return {
      ...state,
      isLoading: false,
      albumFetched: undefined,
      error: true
    };
    default:
      return state;
  }
}

export default reducer;
