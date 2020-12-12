import { createAsyncAction } from 'redux-promise-middleware-actions';
import * as albumApi from '../api-client/album';
import { transformSongs } from  '../utils/utilities';

export const getAlbums = createAsyncAction('ALBUMS', async (token) => {
  const res = await albumApi.getAlbum({token});
  return res;
});

export const getAlbum = createAsyncAction('ALBUM', async (token, albumId) => {
  const albumData = await albumApi.getAlbum({token, albumId});
  const albumObj = { name: albumData.name, artist: albumData.artists[0].name, cover: albumData.cover.url };
  const songs = await albumApi.getAlbumSongs({ token: token, albumId});
  albumData.songs = transformSongs(songs, albumObj);
  return albumData;
});