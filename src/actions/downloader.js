import { createAsyncAction } from 'redux-promise-middleware-actions';
import * as downloaderApi from '../api-client/downloader';
import types from './types';


export const searchAlbums = createAsyncAction('DOWNLOADER_ALBUMS', async (query) => {
  const res = await downloaderApi.getResults({query});
  return res;
});


export const cleanResults = () => ({
  type: types.DOWNLOADER_CLEAN_RESULTS,
});
