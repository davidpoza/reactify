import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// own
import SongsList from '../songs-list';
import useStyles from './styles.js'
import { makeToolbarTransparent } from '../../actions/ui';
import { getAlbumSongs, setAlbumPreview } from '../../actions/downloader';
import { createAlbum } from '../../api-client/album';
import withLoader from '../../hocs/with-loader';

function AlbumPreviewView({
   user, makeToolbarTransparent, viewClasses, getAlbumSongs, album, setAlbumPreview
}) {
  const color1 = 'blue';
  const color2 = 'pink';
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
      name: s.name,
      artist: s.artist,
      seconds: s.duration,
    }));
  }

  async function handleDownload() {
    await createAlbum({ token: user.jwt, album });
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
    {/*<div>
       <IconButton title="Play album" onClick={handleOnClickPlay}>
        <PlayIcon className={classes.playIcon} />
      </IconButton>
    </div>*/}
    <div onClick={handleDownload}>Download</div>
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