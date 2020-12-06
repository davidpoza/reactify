import config from '../utils/config';


/**
 * @param {Object} params
 * @param {string} params.token - jwt token
 * @param {number} params.albumId - album id
 */
export async function getAlbum({
  token, albumId
}) {
  try {
    const res = await fetch(`${config.API_HOST}/albums${albumId ? `/${albumId}` : ''}`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer "+token,

      },
    });
    return await res.json();
  } catch {
    return -1
  }
};


export async function getAlbumSongs({
  token, albumId
}) {
  try {
    const res = await fetch(`${config.API_HOST}/songs?albums.id=${albumId}`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer "+token,

      },
    });
    return await res.json();
  } catch {
    return -1
  }
};
