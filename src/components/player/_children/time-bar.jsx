import React, {useState} from 'react';
import PropType from 'prop-types';

// material ui
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

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

function TimeBar({
  handler, value
}) {
  const [hovered, setHovered] = useState(false);
  const styles = makeStyles({
    root: { color: hovered ? '#1db954' : '#b3b3b3' },
    thumb: { color: 'white', display: hovered ? 'flex' : 'none' }
  })();

  return (
    <CustomSlider
      classes={styles}
      onChange={(e, value) => { handler(value) }}
      aria-label="audio time bar"
      onMouseEnter={() => { setHovered(true)}}
      onMouseLeave={() => { setHovered(false)}}
      value={value}
      component='div'
    />
  )
}

TimeBar.propType = {
  handler: PropType.func,
  value: PropType.number,
}

export default TimeBar;