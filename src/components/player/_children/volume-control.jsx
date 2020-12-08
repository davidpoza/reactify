import React, {useState} from 'react';
import PropType from 'prop-types';

// material ui
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import VolumeIcon from '@material-ui/icons/VolumeUp';
import MutedIcon from '@material-ui/icons/VolumeOff';
import useStyles from '../styles';

const CustomSlider = withStyles({
  root: {
    color: '#b3b3b3',
    height: '4px',
    padding: 0,
    width: '80px',
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

function VolumeControl({
  handler, value
}) {
  const classes = useStyles();
  const [hovered, setHovered] = useState(false);
  const styles = makeStyles({
    root: { color: hovered ? '#1db954' : '#b3b3b3' },
    thumb: { color: 'white', display: hovered ? 'flex' : 'none' }
  })();

  return (
    <div>
      {
        value > 0
        ? <VolumeIcon fontSize="small" className={classes.extraIcon} />
        : <MutedIcon  fontSize="small" className={classes.extraIcon}/>
      }
      <CustomSlider
        classes={styles}
        onChange={(e, value) => { handler(value) }}
        onMouseEnter={() => { setHovered(true)}}
        onMouseLeave={() => { setHovered(false)}}
        aria-label="control de volumen"
        value={value*100}
        component='div'
      />
    </div>
  )
}

VolumeControl.propType = {
  handler: PropType.func,
  value: PropType.number,
}

export default VolumeControl;