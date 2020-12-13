import { searchAlbums } from '../actions/downloader';
import types from '../actions/types';

const initialState = {
  isLoading: false,
  error: false,
  albumsFetched: [],
  albumFetched: undefined,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case String(searchAlbums.pending):
      return {
        ...state,
        isLoading: true,
        albumsFetched: [],
        error: false
      };
    case String(searchAlbums.fulfilled):
      return {
        ...state,
        isLoading: false,
        albumsFetched: action.payload,
        error: false
      };
    case String(searchAlbums.rejected):
      return {
        ...state,
        isLoading: false,
        albumsFetched: [],
        error: true
      };
    case types.DOWNLOADER_CLEAN_RESULTS:
      return {
        ...state,
        albumsFetched: [],
      }
    default:
      return state;
  }
}

export default reducer;
