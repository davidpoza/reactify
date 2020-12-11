import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

// material ui
import Grid from '@material-ui/core/Grid';

// own
import useStyles from './styles.js';
import AlbumCover from '../album-cover';
import {getAlbum} from '../../api-client/album';

function AlbumList({
  user
}) {
  const [albums, setAlbums] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function loadContent() {
      const result = await getAlbum({ token: user.jwt });
      setAlbums(result);
    }
    loadContent();
  }, []);



  return (
    <Grid container spacing={3}>
      {
        albums.map((album, index) => {
          return (<Grid item key={`$album-grid-item-${album.id}`} >
            <AlbumCover
              key={album.id} id={album.id} name={album.name} artist={album.artists[0].name} cover={album.cover.url}
            />
          </Grid>);
        })
      }
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return ({
    user: state.user.current
  });
}

export default connect(mapStateToProps)(AlbumList);