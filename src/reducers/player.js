import types from '../actions/types';

const initialState = {
  queue: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD_TO_QUEUE:
      return {
        ...state,
        queue: [...state.queue, {
          id: action.songId,
          name: action.songName,
          seconds: action.songSeconds,
          album: action.songAlbum,
          artist: action.songArtist,
        }],
      }
    case types.REMOVE_FROM_QUEUE:
      return {
        ...state,
        queue: state.queue.filter((song) => {
          return (song.id !== action.songId);
        }),
      }
    default:
      return state;
  }
}

export default reducer;
