import types from './types';

/**
 *
 * @param {Object} song
 */
export const logSong = (song) => ({
  type: types.LOG_SONG,
  song
});

/**
 *
 * @param {Object} album
 */
export const logAlbum = (album) => ({
  type: types.LOG_ALBUM,
  album
});
