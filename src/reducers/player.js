import types from '../actions/types';

const initialState = {
  playing: false,
  currentSec: 0,
  queue: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.PLAY:
      return {
        ...state,
        playing: true,
      }
    case types.PAUSE:
      return {
        ...state,
        playing: false,
      }
    case types.STOP:
      return {
        ...state,
        queue: [],
      }
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
