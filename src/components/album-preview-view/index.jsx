import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// material ui
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { IconButton } from '@material-ui/core';

// own
import SongsList from '../songs-list';
import useStyles from './styles.js'
import { makeToolbarTransparent } from '../../actions/ui';
import { getAlbumSongs, setAlbumPreview } from '../../actions/downloader';
import { createAlbum } from '../../api-client/album';
import { triggerDownload } from '../../api-client/downloader';
import withLoader from '../../hocs/with-loader';

function AlbumPreviewView({
   user, makeToolbarTransparent, viewClasses, getAlbumSongs, album, setAlbumPreview
}) {
  const color1 = '#5f77a6';
  const color2 = '#34415b';
  const classes = useStyles();

  useEffect(() => {
    makeToolbarTransparent();
    if (album) {
      getAlbumSongs( album.id );
    }
  }, []);

  // remove album preview on page refresh
  useEffect(() => {
    window.addEventListener('beforeunload', deleteAlbumPreview);
    return () => {
      window.removeEventListener('beforeunload', deleteAlbumPreview);
    }
  }, []);

  function deleteAlbumPreview() {
    setAlbumPreview(undefined)
  }

  function transformToDeezerFormat(songs) {
    if (!songs) {
      return [];
    }
    return songs.map(s => ({
      name: s.title,
      artist: s.artist,
      seconds: s.duration,
    }));
  }

  async function handleDownload() {
    await createAlbum({ token: user.jwt, album });
    await triggerDownload({ albumId: album.id});
  }

  if (!album ) {
    return null;
  }


  return (<div className={classes.root}>
    <div className={classes.header} style={{ background: `linear-gradient(${color1}, ${color2})`}}>
      <img src={`${album.cover}`} className={classes.cover}
        alt={`album cover ${album.name}`} />
      <div className={classes.dataBlock}>
        <h3 className={classes.data}>ALBUM</h3>
        <h1 className={classes.title}>{album.name}</h1>
        <h2 className={classes.data}>{album.artist}</h2>

      </div>
    </div>
    <div>
       <IconButton title="Load album on music library" onClick={handleDownload}>
        <DownloadIcon className={classes.playIcon} />
      </IconButton>
    </div>
    <SongsList songs={transformToDeezerFormat(album.songs)} heightOffset={90} />
  </div>);
}

const mapStateToProps = (state) => {
  return {
    user: state.user.current,
    loading: state.downloader.isLoading,
    album: state.downloader.albumFetched,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeToolbarTransparent: () => dispatch(makeToolbarTransparent()),
    getAlbumSongs: (id) => dispatch(getAlbumSongs(id)),
    setAlbumPreview: (obj) => dispatch(setAlbumPreview(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(AlbumPreviewView));