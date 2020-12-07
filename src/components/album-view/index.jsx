import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbum, getAlbumSongs } from '../../api-client/album';
import SongsList from '../songs-list';

function AlbumView({
   user
}) {
  const { id } = useParams();
  const [ album, setAlbum ] = useState();
  const [ songs, setSongs ] = useState([]);

  function transformSongs(arrSongs, albumData) {
    return arrSongs.map((e, index) => {
      return ({
        number: index + 1,
        name: e.name,
        author: albumData.name,
        duration: e.duration,
      });
    });
  }

  useEffect(() => {
    async function loadContent() {
      const albumData = await getAlbum({ token: user.jwt, albumId: id });
      setAlbum(albumData);
      setSongs(transformSongs(await getAlbumSongs({ token: user.jwt, albumId: id }), albumData));
    }
    loadContent();
  }, []);

  if (!album ) {
    return null;
  }

  return (<div>
    <h1>{album.name}</h1>
    <h2>{album.artists[0].name} - {album.year}</h2>
    <SongsList songs={songs} />
  </div>);
}
const mapStateToProps = (state) => {
  return {
    user: state.user.current,
  }
}
export default connect(mapStateToProps)(AlbumView);