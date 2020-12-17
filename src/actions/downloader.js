import { createAsyncAction } from 'redux-promise-middleware-actions';
import * as downloaderApi from '../api-client/downloader';
import types from './types';


export const searchAlbums = createAsyncAction('DOWNLOADER_ALBUMS', async (query) => {
  const res = await downloaderApi.getResults({query});
  return res;
});

export const getAlbumSongs = createAsyncAction('DOWNLOADER_ALBUM_SONGS', async (albumId) => {
  const res = await downloaderApi.getAlbumSongs({albumId});
  return res;
});


export const cleanResults = () => ({
  type: types.DOWNLOADER_CLEAN_RESULTS,
});

export const setAlbumPreview = (album) => ({
  type: types.SET_ALBUM_PREVIEW,
  album
});

export const getAlbumPreview = () => ({
  type: types.GET_ALBUM_PREVIEW,
});

export const cleanErrors = () => ({
  type: types.DOWNLOADER_CLEAN_ERRORS,
});
