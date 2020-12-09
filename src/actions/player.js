import types from './types';

export const addToQueue = ({
  songId, songName, songSeconds, songAlbum, songArtist, albumCover
}) => ({
  type: types.ADD_TO_QUEUE,
  songId,
  songName,
  songSeconds,
  songAlbum,
  songArtist,
  albumCover
});

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

export const replaceQueue = (newQueue) => ({
  type: types.REPLACE_QUEUE,
  newQueue,
})

