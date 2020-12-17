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
    throw Error('Error during search results fetch');
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
    throw Error('Error during song download');
  }
};

export async function getAlbumSongs({
  albumId
}) {
  try {
    const res = await fetch(`${config.API_DOWNLOADER_HOST}/search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        type: 'album_track',
        query: `${albumId}`,
      })
    });
    return await res.json();
  } catch {
    throw Error('Error during song list fetch');
  }
};


