import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import {Link} from 'react-router-dom';

// material ui
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import QueueIcon from '@material-ui/icons/QueueMusic';

// own
import Config from '../../utils/config';
import useStyles from './styles';
import { secondsToShortString } from '../../utils/utilities';
import {
  play as playAction, pause as pauseAction, setJumpNext, setReload, consumeFromQueue, pause,
} from '../../actions/player';
import TimeBar from './_children/time-bar';
import VolumeControl from './_children/volume-control';

function Player({
  playerState, playRedux, pauseRedux, setJumpNext, consumeFromQueue, setReload
}) {
  const [length, setLength] = useState(0);
  const [second, setSecond] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [audio, setAudio] = useState();
  const [canPlay, setCanPlay] = useState(false);
  const [interval, saveInterval] = useState(null);
  const classes = useStyles();
  const player = useRef();

 // pause song on page refresh
  useEffect(() => {
    setJumpNext(false);
    window.addEventListener('beforeunload', pauseRedux);
    return () => {
      window.removeEventListener('beforeunload', pauseRedux);
    }
  }, []);

  // play/pause
  useEffect(() => {
    if (playerState.queue.length > 0) {
      setAudio(playerState.queue[0].audio);
      if (playerState.playing) {
        playHandler();
      } else {
        pauseHandler();
      }
    }
  }, [playerState.playing]);

  // next song
  useEffect(() => {
    if (playerState.jumpNext && playerState.queue.length > 0) {
      console.log("next song:", playerState.queue[0].audio)
      setCanPlay(false);
      setJumpNext(false);
      pauseHandler();
      setAudio(playerState.queue[0].audio);
      console.log("load()")
      player.current.load();
      setTimeout(() => {
        playHandler();
      }, 1000);

    }
  }, [playerState.jumpNext])

  // reload audio component
  useEffect(() => {
    if (playerState.reload) {
      setCanPlay(false);
      setTimeout(() => {
        pauseHandler();
        console.log("load()")
        player.current.load();
        setReload(false);
        playHandler();
      }, 1000);
    }
  }, [playerState.reload]);

  // if audio wasn't able to be played during playHandler, now we try again
  useEffect(() => {
    if (canPlay && playerState.playing) {
      playHandler();
    }
  }, [canPlay]);

  function playHandler() {
    playRedux();
    if (canPlay) {
      player.current.play();
      setLength(get(player, 'current.duration'));
      const int = setInterval(() => {
        setSecond(Math.trunc(get(player, 'current.currentTime')))
      }, 1000);
      saveInterval(int);
    }
  }

  function pauseHandler() {
    player.current.pause();
    pauseRedux();
    clearInterval(interval);
    saveInterval(null);
  }

  function nextHandler() {
    pauseHandler();
    setJumpNext(true);
    consumeFromQueue();
    playHandler();
  }

  function onCanPlayHandler() {
    setCanPlay(true);
  }

  function onEndedHandler() {
    if (length > 0 && playerState.playing && !playerState.jumpNext) {
      setJumpNext(true);
      consumeFromQueue();
    }
  }

  function setTime(percentage) {
    const second = percentage * length / 100;
    setSecond(second);
    player.current.currentTime = second;
  }

  /**
   * @param {number} value - Values between 1.0 and 0.0
   */
  function setVolumeSlider(value) {
    setVolume(value / 100);
    player.current.volume = value / 100;
  }

  if (playerState.queue.length === 0) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.info}>
          info
        </div>
        <div className={classes.controls}>
          <div className={classes.buttons}>
            <IconButton aria-label="previous" >
              <SkipPreviousIcon className={classes.previousIcon} />
            </IconButton>
            { playerState.playing
              ? <IconButton title="Pause" aria-label="pause" onClick={pauseHandler} className={classes.playBtn}>
                  <PauseCircleOutlineIcon className={classes.playIcon} />
                </IconButton>
              : <IconButton title="Resume" aria-label="play" onClick={playHandler} className={classes.playBtn}>
                  <PlayCircleOutlineIcon className={classes.playIcon} />
                </IconButton>
            }
            <IconButton aria-label="next" onClick={nextHandler}>
              <SkipNextIcon className={classes.nextIcon} />
            </IconButton>
          </div>
          <div className={classes.bar}>
            <div className={classes.currentTime}>
              {secondsToShortString(second)}
            </div>
            {
              <TimeBar
                handler={setTime}
                value={second * 100 / length}
              />
            }
            <div className={classes.length}>
              {secondsToShortString(length)}
            </div>
          </div>
        </div>
        <div className={classes.extra}>
          {
            <>
              <Link to="/queue">
                <IconButton
                  title="See queue"
                  aria-label="queue"
                  className={classes.extraButton}
                >
                  <QueueIcon fontSize="small" className={classes.extraIcon} />
                </IconButton>
              </Link>
              <VolumeControl
                handler={setVolumeSlider}
                value={volume}
              />
            </>
          }
        </div>
      </div>
      <audio id="player" preload='auto' ref={player} onCanPlayThrough={onCanPlayHandler} onEnded={onEndedHandler}>
        <source
          src={`${Config.API_HOST}${audio}`} type='audio/flac'
        />
      </audio>
    </div>
  );
}

const mapStateToProps = (state) => {
  return ({
    playerState: state.player,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    playRedux: () => dispatch(playAction()),
    pauseRedux: () => dispatch(pauseAction()),
    setJumpNext: (val) => dispatch(setJumpNext(val)),
    setReload: (val) => dispatch(setReload(val)),
    consumeFromQueue: () => dispatch(consumeFromQueue()),
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
