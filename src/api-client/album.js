import config from '../utils/config';
import { getBlobFromUrl } from '../utils/utilities';

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
    throw Error('Error during album/s fetch');
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
    throw Error('Error during album songs list fetch');
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
    throw Error('Error during song search');
  }
};

/**
 * Fetches albums with text included in name
 * @param {Object} params
 * @param {string} params.token - jwt token
 * @param {number} params.text - text included in album name
 */
export async function searchAlbum({
  token, text
}) {
  try {
    const res = await fetch(`${config.API_HOST}/albums?name_contains=${text}`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer "+token,
      },
    });
    return await res.json();
  } catch {
    throw Error('Error during album search');
  }
};

/**
 * Fetches artist with text included in name
 * @param {Object} params
 * @param {string} params.token - jwt token
 * @param {number} params.text - text included in artist name
 */
export async function searchArtist({
  token, text
}) {
  try {
    const res = await fetch(`${config.API_HOST}/artists?name_contains=${text}`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer "+token,
      },
    });
    return await res.json();
  } catch {
    throw Error('Error during artist search');
  }
};

/**
 * creates an artist
 * @param {Object} params
 * @param {string} params.token - jwt token
 * @param {Object} params.artist - song
 * @param {string} params.artist.name
 */
export async function createArtist({
  token, artist
}) {
  try {
    const res = await fetch(`${config.API_HOST}/artists`, {
      method: 'POST',
      headers: {
        "Authorization": "Bearer "+token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(artist)
    });
    return await res.json();
  } catch {
  throw Error('Error during artist creation');
  }
}

/**
 * creates an album
 * @param {Object} params
 * @param {string} params.token - jwt token
 * @param {Object} params.song - song
 * @param {string} params.song.name
 * @param {string} params.song.duration
 */
export async function createSong({
  token, song
}) {
  try {
    const res = await fetch(`${config.API_HOST}/songs`, {
      method: 'POST',
      headers: {
        "Authorization": "Bearer "+token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(song)
    });
    return await res.json();
  } catch {
  throw Error('Error during song creation');
  }
}

export async function uploadBlobFromUrl({
  token, url, ref, refId, field, filename,
}) {
  const blob = await getBlobFromUrl(url, filename);
  const data = new FormData();
  data.append('files', blob);
  data.append('ref', ref);
  data.append('refId', refId);
  data.append('field', field);

  const uploaded = await fetch(`${config.API_HOST}/upload`, {
    method: 'POST',
    headers: {
      "Authorization": "Bearer "+token,
    },
    body: data
  });
  return await uploaded.json();
}

/**
 * creates an album
 * @param {Object} params
 * @param {string} params.token - jwt token
 * @param {Object} params.album - album
 * @param {string} params.album.name
 * @param {string} params.album.cover - url with cover (it'll be uploaded)
 * @param {Array<Object>} param.album.songs
 * @param {string} params.album.songs.name
 * @param {string} params.album.songs.duration
 * @param {string} params.album.songs.audio - url, pointing to downloader api
 */
export async function createAlbum({
  token, album
}) {
  try {
    // create songs entries
    const songs = [];
    let artist = null;
    album.songs.forEach((song) => {
      const tempSong = {
        name: song.title,
        duration: parseInt(song.duration, 10),
        audio: `${album.artist} - ${song.title}.flac`,
      };
      const createdSong = createSong({ token, song:tempSong });
      songs.push(createdSong);
    })
    const fulfilledSongs = await Promise.all(songs);

    // here we're passing an song ids array
    album.songs = fulfilledSongs.map(s => s.id);

    // look for artist, if not found then create it
    [artist] = await searchArtist({ token, text: album.artist });
    if (!artist || artist.length === 0) {
      artist = await createArtist({ token, artist: { name: album.artist }});
    }

    // create album
    const res = await fetch(`${config.API_HOST}/albums`, {
      method: 'POST',
      headers: {
        "Authorization": "Bearer "+token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: album.name,
        artists: [artist.id],
        songs: album.songs,
      }),
    });
    const createdAlbum =  await res.json();

    // upload cover
    const cover = await uploadBlobFromUrl({
      token, url: album.cover, ref: 'album', refId: createdAlbum.id, field: 'cover', filename: `${album.name}-cover.jpg`
    });
    createdAlbum.cover = {
      url: cover.url
    };
    return createdAlbum;
  } catch {
    throw Error('Error during album creation');
  }
};
