import types from '../actions/types';

const initialState = {
  songs: [],
  albums: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOG_SONG:
      return {
        ...state,
        songs: [...state.songs, action.song]
      }
    case types.LOG_ALBUM:
      return {
        ...state,
        albums: [...state.albums, action.album]
      }
    default:
      return state;
  }
}

export default reducer;
