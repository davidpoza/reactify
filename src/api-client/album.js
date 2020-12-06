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

/**
 * Returns songs for specified album
 * @param {Object} params
 * @param {string} params.token - jwt token
 * @param {number} params.albumId - album id
 */
export async function getAlbumSongs({
  token, albumId
}) {
  try {
    const res = await fetch(`${config.API_HOST}/songs?albums_eq=${albumId}`, {
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

/**
 * Fetches songs with text included in name
 * @param {Object} params
 * @param {string} params.token - jwt token
 * @param {number} params.text - text included in song name
 */
export async function searchSong({
  token, text
}) {
  try {
    const res = await fetch(`${config.API_HOST}/songs?name_contains=${text}`, {
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