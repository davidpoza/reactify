import { createAsyncAction } from 'redux-promise-middleware-actions';
import get from 'lodash.get';

// own
import { logAlbum } from './history';
import * as albumApi from '../api-client/album';
import { transformSongs } from  '../utils/utilities';
import types from './types';

export const getAlbums = createAsyncAction('ALBUMS', async (token) => {
  const res = await albumApi.getAlbum({token});
  return res;
});

export const _getAlbum = createAsyncAction('ALBUM', async (token, albumId) => {
  console.log("lanzada")
  const albumData = await albumApi.getAlbum({token, albumId});
  const albumObj = { name: albumData.name, artist: get(albumData, 'artists[0].name'), cover: get(albumData, 'cover.url') };
  const songs = await albumApi.getAlbumSongs({ token: token, albumId});
  albumData.songs = transformSongs(songs, albumObj);
  return albumData;
});

export const getAlbum = (token, albumId) => async (dispatch, getState) => {
  console.log("album id", albumId);
  const albumData = await dispatch(_getAlbum(token, albumId));
  await dispatch(logAlbum(getState().albums.albumFetched));
  return albumData;
}

export const cleanErrors = () => ({
  type: types.ALBUMS_CLEAN_ERRORS,
});

export const resetState = () => ({
  type: types.ALBUMS_RESET_STATE,
});
