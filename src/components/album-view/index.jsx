import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// material ui
import { IconButton } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';

// own
import SongsList from '../songs-list';
import useStyles from './styles.js'
import Config from '../../utils/config';
import { makeToolbarTransparent } from '../../actions/ui';
import { replaceQueue, play , setReload, pause } from '../../actions/player';
import { logAlbum } from '../../actions/history';
import { secondsToLongString } from  '../../utils/utilities';
import { getAlbum } from '../../actions/albums';
import withLoader from '../../hocs/with-loader';

function AlbumView({
   user, makeToolbarTransparent, replaceQueue, play, setReload, pause, logAlbum, getAlbum, album, viewClasses,
}) {
  const color1 = 'blue';
  const color2 = 'pink';
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    makeToolbarTransparent();
    getAlbum(user.jwt, id);
  }, []);

  function calculateTotalTime(arrSongs = []) {
    const totalSeconds = arrSongs
      .map((e) => (e.seconds))
      .reduce((acc, curr) => (acc + curr), 0);
    return secondsToLongString(totalSeconds);
  }

  function handleOnClickPlay() {
    replaceQueue(album.songs);
    setReload(true);
  }

  const totalTime = useMemo(() => {
    if (!album) {
      return 0;
    }
    return calculateTotalTime(album.songs);
  }, [album])


  if (!album ) {
    return null;
  }

  return (<div className={classes.root}>
    <div className={classes.header} style={{ background: `linear-gradient(${color1}, ${color2})`}}>
      <img src={`${Config.API_HOST}${album.cover.url}`} className={classes.cover}
        alt={`Carátula del disco ${album.name}`} />
      <div className={classes.dataBlock}>
        <h3 className={classes.data}>ALBUM</h3>
        <h1 className={classes.title}>{album.name}</h1>
        <h2 className={classes.data}>{album.artists[0].name} - {album.year} - {album.songs.length} canciones - {totalTime}</h2>
      </div>
    </div>
    <div>
      <IconButton title="Play album" onClick={handleOnClickPlay}>
        <PlayIcon className={classes.playIcon} />
      </IconButton>
    </div>
    <SongsList songs={album.songs} heightOffset={90} />
  </div>);
}

const mapStateToProps = (state) => {
  return {
    user: state.user.current,
    album: state.albums.albumFetched,
    loading: state.albums.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeToolbarTransparent: () => dispatch(makeToolbarTransparent()),
    replaceQueue: (newQueue) => dispatch(replaceQueue(newQueue)),
    play: () => dispatch(play()),
    pause: () => dispatch(pause()),
    setReload: (val) => dispatch(setReload(val)),
    logAlbum: (obj) => dispatch(logAlbum(obj)),
    getAlbum: (token, albumId) => dispatch(getAlbum(token, albumId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(AlbumView));