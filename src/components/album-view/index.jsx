import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// material ui
import { IconButton } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';

// own
import { getAlbum, getAlbumSongs } from '../../api-client/album';
import SongsList from '../songs-list';
import useStyles from './styles.js'
import Config from '../../utils/config';
import { makeToolbarTransparent } from '../../actions/ui';
import { replaceQueue, play , setReload, pause } from '../../actions/player';
import { secondsToLongString, transformSongs } from  '../../utils/utilities';


function AlbumView({
   user, makeToolbarTransparent, replaceQueue, play, setReload, pause
}) {
  const color1 = 'blue';
  const color2 = 'pink';
  const classes = useStyles();
  const { id } = useParams();
  const [ album, setAlbum ] = useState();
  const [ songs, setSongs ] = useState([]);

  function calculateTotalTime(arrSongs = []) {
    const totalSeconds = arrSongs
      .map((e) => (e.seconds))
      .reduce((acc, curr) => (acc + curr), 0);
    return secondsToLongString(totalSeconds);
  }

  function handleOnClickPlay() {
    replaceQueue(songs);
    setReload(true);
  }

  const totalTime = useMemo(() => {
    return calculateTotalTime(songs);
  }, [songs])

  useEffect(() => {
    makeToolbarTransparent();
    async function loadContent() {
      const albumData = await getAlbum({ token: user.jwt, albumId: id });
      setAlbum(albumData);
      setSongs(
        transformSongs(
          await getAlbumSongs({ token: user.jwt, albumId: id }),
          { name: albumData.name, artist: albumData.artists[0].name, cover: albumData.cover.url }
        )
      );
    }
    loadContent();
  }, []);

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
        <h2 className={classes.data}>{album.artists[0].name} - {album.year} - {songs.length} canciones - {totalTime}</h2>
      </div>
    </div>
    <IconButton title="Play album" onClick={handleOnClickPlay}>
      <PlayIcon className={classes.playIcon} />
    </IconButton>
    <SongsList songs={songs} heightOffset={600} />
  </div>);
}
const mapStateToProps = (state) => {
  return {
    user: state.user.current,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeToolbarTransparent: () => dispatch(makeToolbarTransparent()),
    replaceQueue: (newQueue) => dispatch(replaceQueue(newQueue)),
    play: () => dispatch(play()),
    pause: () => dispatch(pause()),
    setReload: (val) => dispatch(setReload(val))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);