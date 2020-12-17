import { getAlbums, _getAlbum } from '../actions/albums';
import types from '../actions/types';

const initialState = {
  isLoading: false,
  error: false,
  albumsFetched: [],
  albumFetched: undefined,
  errorMessage: undefined,
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
        error: true,
        errorMessage: action.payload.message,
      };
    case String(_getAlbum.pending):
      return {
        ...state,
        isLoading: true,
        albumFetched: undefined,
        error: false
      };
    case String(_getAlbum.fulfilled):
      return {
        ...state,
        isLoading: false,
        albumFetched: action.payload,
        error: false
      };
    case String(_getAlbum.rejected):
      return {
        ...state,
        isLoading: false,
        albumFetched: undefined,
        error: true,
        errorMessage: action.payload.message,
      };
    case types.ALBUMS_CLEAN_ERRORS:
      return {
        ...state,
        error: false,
        errorMessage: undefined,
      };
    default:
      return state;
  }
}

export default reducer;
