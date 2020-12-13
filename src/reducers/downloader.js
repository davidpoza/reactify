import { searchAlbums, getAlbumSongs } from '../actions/downloader';
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
    case String(getAlbumSongs.pending):
      return {
        ...state,
        isLoading: true,
        albumFetched: {
          ...state.albumFetched,
          songs: [],
        },
        error: false
      };
    case String(getAlbumSongs.fulfilled):
      console.log("....", action)
      return {
        ...state,
        isLoading: false,
        albumFetched: {
          ...state.albumFetched,
          songs: action.payload,
        },
        error: false
      };
    case String(getAlbumSongs.rejected):
      return {
        ...state,
        isLoading: false,
        albumFetched: {
          ...state.albumFetched,
          songs: [],
        },
        error: true
      };
    case types.SET_ALBUM_PREVIEW:
      return {
        ...state,
        albumFetched: action.album,
      }
    default:
      return state;
  }
}

export default reducer;
