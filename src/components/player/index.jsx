import React, { useState, useRef } from 'react';
import get from 'lodash.get';

// material ui
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

// own
import useStyles from './styles';
import { secondsToShortString } from '../../utils/utilities';


function Player() {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [second, setSecond] = useState(0);

  const classes = useStyles();
  const player = useRef();
  let interval = null;

  function play() {
    player.current.play();
    setPlaying(true);
    setDuration(get(player, 'current.duration'));
    interval = setInterval(() => {
      setSecond(Math.trunc(get(player, 'current.currentTime')));
    }, 1000);
  }

  function pause() {
    player.current.pause();
    setPlaying(false);
    clearInterval(interval);
  }

  function setTime(percentage) {
    const second = percentage * duration / 100;
    setSecond(second);
    player.current.currentTime = second;
  }

  const CustomSlider = withStyles({
    root: {
      color: '#b3b3b3',
      height: '4px',
      padding: 0,
      width: '80%',
      textAlign: 'center',
      margin: 'auto',
    },
    thumb: {
      display: 'none',
      },
    active: {},
    track: {
      height: '4px',
      borderRadius: '4px',
    },
    rail: {
      color: '#535353',
      opacity: 1,
      height: '4px',
      borderRadius: '4px',
    },
  })(Slider);

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
            { playing
              ? <IconButton aria-label="pause" onClick={pause} className={classes.playBtn}>
                  <PauseCircleOutlineIcon className={classes.playIcon} />
                </IconButton>
              : <IconButton aria-label="play" onClick={play} className={classes.playBtn}>
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
              <CustomSlider
                onChange={(e, value) => { setTime(value) }}
                aria-label="custom thumb label"
                value={second * 100 / duration}
                component='div'
              />
            }
            <div className={classes.duration}>
              {secondsToShortString(duration)}
            </div>
          </div>
        </div>
        <div className={classes.extra}>
            extra
        </div>
      </div>

      <audio id="player" preload='auto' ref={player}>
        <source src='http://localhost:1337/uploads/Phil_Collins_It_s_Not_Too_Late_f70c57813e.flac' type='audio/flac' />
      </audio>
    </div>
  );
}

export default Player;
