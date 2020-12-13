import { createAsyncAction } from 'redux-promise-middleware-actions';
import { logAlbum } from './history';
import * as albumApi from '../api-client/album';
import { transformSongs } from  '../utils/utilities';

export const getAlbums = createAsyncAction('ALBUMS', async (token) => {
  const res = await albumApi.getAlbum({token});
  return res;
});

export const _getAlbum = createAsyncAction('ALBUM', async (token, albumId) => {
  console.log("lanzada")
  const albumData = await albumApi.getAlbum({token, albumId});
  const albumObj = { name: albumData.name, artist: albumData.artists && albumData.artists[0].name, cover: albumData.cover && albumData.cover.url };
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