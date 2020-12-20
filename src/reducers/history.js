import types from '../actions/types';

const initialState = {
  songs: [],
  albums: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOG_SONG: // last listened the first one on array
      return {
        ...state,
        songs: [action.song, ...state.songs.slice(0, 29)] // last listened the first one on array (we're keeping 30 items)
      }
    case types.LOG_ALBUM:
      const tempArray = [action.album, ...state.albums.slice(0, 29)]; // last listened the first one on array (we're keeping 30 items)
      const distinctSet = new Set(tempArray.map(e => e.id)); // set of unique ids
      const newArray = Array.from(distinctSet).map(id => ({ // transform set to array of those unique ids
        ...tempArray.find(e => e.id === id) // array mapped to full object array
      }));
      return {
        ...state,
        albums: newArray
      }
    case types.LOG_RESET_STATE:
      return (initialState);
    default:
      return state;
  }
}

export default reducer;
