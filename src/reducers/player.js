import types from '../actions/types';

const initialState = {
  queue: [],
}
// Remember: Queue works as FIFO
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
          cover: action.albumCover,
        }],
      }
    case types.CONSUME_FROM_QUEUE:
      return {
        ...state,
        queue: state.queue.slice(1)
      }
    case types.REMOVE_FROM_QUEUE:
      return {
        ...state,
        queue: state.queue.filter((song) => {
          return (song.id !== action.songId);
        }),
      }
    case types.CLEAR_QUEUE:
      return {
        ...state,
        queue: []
      }
    default:
      return state;
  }
}

export default reducer;
