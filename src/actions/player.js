import types from './types';

/**
 * @param {Object} param
 * @param {number} param.songId
 * @param {string} param.songName
 * @param {number} param.songSeconds
 * @param {string} param.songAlbum
 * @param {string} param.songArtist
 * @param {string} param.albumCover
 */
export const addToQueue = ({
  songId, songName, songSeconds, songAlbum, songArtist, albumCover, songAudio,
}) => ({
  type: types.ADD_TO_QUEUE,
  songId,
  songName,
  songSeconds,
  songAlbum,
  songArtist,
  albumCover,
  songAudio,
});

/**
 * @param {number} songId
 */
export const removeFromQueue = (songId) => ({
  type: types.REMOVE_FROM_QUEUE,
  songId
});

export const consumeFromQueue = () => ({
  type: types.CONSUME_FROM_QUEUE,
})

export const clearQueue = () => ({
  type: types.CLEAR_QUEUE,
})

/**
 * @param {Array} newQueue
 */
export const replaceQueue = (newQueue) => ({
  type: types.REPLACE_QUEUE,
  newQueue,
})

export const play = () => ({
  type: types.PLAY,
})

export const pause = () => ({
  type: types.PAUSE,
})

export const setJumpNext = (value) => ({
  type: types.SET_JUMP_NEXT,
  value
})
