import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

// material ui
import Grid from '@material-ui/core/Grid';

// own
import useStyles from './styles.js';
import AlbumCover from '../album-cover';
import {getAlbums} from '../../actions/albums';
import withLoader from '../../hocs/with-loader';
import withIsMobile from '../../hocs/with-is-mobile';

function AlbumList({
  user, getAlbums, albums, isMobile
}) {
  const classes = useStyles();

  useEffect(() => {
    getAlbums(user.jwt);
  }, []);

  return (
    <Grid justify={isMobile ? "center" : undefined} container spacing={isMobile ? 1 : 3}>
      {
        albums.fetched.map((album, index) => {
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
    user: state.user.current,
    albums: state.albums,
    loading: state.albums.isLoading,
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getAlbums: (token, albumId) => dispatch(getAlbums(token, albumId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(withIsMobile(AlbumList)));