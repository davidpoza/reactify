import types from './types';

export const addToQueue = ({
  songId, songName, songSeconds, songAlbum, songArtist
}) => ({
  type: types.ADD_TO_QUEUE,
  songId,
  songName,
  songSeconds,
  songAlbum,
  songArtist
});

export const removeFromQueue = (songId) => ({
  type: types.REMOVE_FROM_QUEUE,
  songId
});


