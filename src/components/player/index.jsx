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
import { play as playAction, pause as pauseAction } from '../../actions/player';
import TimeBar from './_children/time-bar';
import VolumeControl from './_children/volume-control';

function Player({
  playerState, playRedux, pauseRedux,
}) {
  const [duration, setDuration] = useState(0);
  const [second, setSecond] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [audio, setAudio] = useState();
  const [interval, saveInterval] = useState(null);
  const classes = useStyles();
  const player = useRef();

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

  function playHandler() {
    player.current.play();
    playRedux();
    setDuration(get(player, 'current.duration'));
    const int = setInterval(() => {
      setSecond(Math.trunc(get(player, 'current.currentTime')))
    }, 1000);
    saveInterval(int);
  }

  function pauseHandler() {
    player.current.pause();
    pauseRedux();
    clearInterval(interval);
    saveInterval(null);
  }

  function setTime(percentage) {
    const second = percentage * duration / 100;
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

    return (<div className={classes.root}>
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
            <IconButton aria-label="next">
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
                value={second * 100 / duration}
              />
            }
            <div className={classes.duration}>
              {secondsToShortString(duration)}
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

      <audio id="player" preload='auto' ref={player}>
        <source src={`${Config.API_HOST}${audio}`} type='audio/flac' />
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
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
