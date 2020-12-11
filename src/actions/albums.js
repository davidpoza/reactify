import { createAsyncAction } from 'redux-promise-middleware-actions';
import * as albumApi from '../api-client/album';


export const getAlbums = createAsyncAction('ALBUMS', async (token) => {
  const res = await albumApi.getAlbum({token});
  return res;
});