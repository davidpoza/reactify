import types from '../actions/types';

const initialState = {
  playing: false,
  jumpNext: false,
  reload: false,
  queue: [],
}
// Remember: Queue works as FIFO
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD_TO_QUEUE: // in to first
      return {
        ...state,
        queue: [...state.queue, {
          id: action.songId,
          name: action.songName,
          seconds: action.songSeconds,
          album: action.songAlbum,
          artist: action.songArtist,
          cover: action.albumCover,
          audio: action.songAudio
        }],
      }
    case types.CONSUME_FROM_QUEUE: // first out
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
    case types.REPLACE_QUEUE:
      return {
        ...state,
        queue: [...action.newQueue],
      }
    case types.CLEAR_QUEUE:
      return {
        ...state,
        queue: []
      }
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
    case types.SET_JUMP_NEXT:
      return {
        ...state,
        jumpNext: action.value,
      }
    case types.SET_RELOAD:
      return {
        ...state,
        reload: action.value,
      }
    default:
      return state;
  }
}

export default reducer;
