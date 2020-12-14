import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';

// material ui
import Grid from '@material-ui/core/Grid';

// own
import useStyles from './styles.js';
import AlbumCover from '../album-cover';
import {getAlbums} from '../../actions/albums';
import withLoader from '../../hocs/with-loader';
import withIsMobile from '../../hocs/with-is-mobile';

function AlbumList({
  user, getAlbums, albums, isMobile, albumsArray, absoluteUrls, disablePlay
}) {
  const classes = useStyles();

  useEffect(() => {
    if (!albumsArray) {
      getAlbums(user.jwt);
    }
  }, []);

  const render = (album, index) => {
    return (<Grid item key={`$album-grid-item-${album.id}`} >
      <AlbumCover
        disablePlay={disablePlay}
        absoluteUrls={absoluteUrls}
        key={album.id}
        id={album.id}
        name={album.name}
        artist={album.artists[0].name}
        cover={album.cover.url}
      />
    </Grid>);
  };
console.log("-->", albumsArray)
  return (
    <Grid
      className={classes.grid} justify={isMobile ? "center" : undefined} container spacing={isMobile ? 1 : 3}>
      {
        albumsArray
        ? albumsArray.map(render)
        : albums.albumsFetched.map(render)
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

AlbumList.propTypes = {
  disablePlay: PropType.bool,
  absoluteUrls: PropType.bool,
  albumsArray: PropType.arrayOf(
    PropType.shape({
      id: PropType.number,
      artists: PropType.array,
      name: PropType.string,
      cover:PropType.shape({
        url: PropType.string,
      }),
    })
  ),
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(withIsMobile(AlbumList)));