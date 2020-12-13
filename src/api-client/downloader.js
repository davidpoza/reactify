import config from '../utils/config';


/**
 * @param {Object} params
 * @param {string} params.query - query
 */
export async function getResults({
  query
}) {
  try {
    const res = await fetch(`${config.API_DOWNLOADER_HOST}/search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        type: 'album',
        query
      })
    });
    return await res.json();
  } catch {
    return -1
  }
};

export async function triggerDownload({
  albumId
}) {
  try {
    const res = await fetch(`${config.API_DOWNLOADER_HOST}/download`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        type: 'album',
        music_id: albumId,
        add_to_playlist: false,
        create_zip: false,
      })
    });
    return await res.json();
  } catch {
    return -1
  }
};

