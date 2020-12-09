import React from 'react';
import PropType from 'prop-types';

// material ui
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClockIcon from '@material-ui/icons/AccessTime';

// own
import useStyles from '../styles.js'

function SongListHeader({
  variant
}) {
  const classes = useStyles();
  return (
    <div className={classes.rowHeader} style={{display:'flex'}}>
      <ListItemText secondary="#" className={classes.headerNumber} />
      <ListItemText secondary="TITLE" className={classes.headerTitle} />
      {
        (variant === 'playlist' || variant === 'queue') &&
        <>
          <ListItemText secondary=""/>
          <ListItemText secondary="ALBUM"/>
        </>
      }
      {
        variant === 'playlist' &&
        <ListItemText secondary="DATE ADDED" />
      }
      <ListItemIcon className={classes.headerDuration}>
        <ClockIcon fontSize="small" />
      </ListItemIcon>
    </div>
  );
}


SongListHeader.propType = {
  variant: PropType.string,
}

export default SongListHeader;