import React from 'react';
import PropType from 'prop-types';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// material ui
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClockIcon from '@material-ui/icons/AccessTime';


// own
import MyListItem from './_children/songs-list-item';
import useStyles from './styles.js'


function SongsList({ songs, variant, heightOffset = 0}) {
  const classes = useStyles();

  function ListItemWithVariant(props) {
    return <MyListItem {...props} variant = {variant} />
  }

  return (
    <>
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
      <AutoSizer>
        {
          ({ height, width}) => (
            <>
              <FixedSizeList
                width={width} height={height-heightOffset} itemSize={60} itemCount={songs.length} itemData={songs}>
                {
                  ListItemWithVariant
                }
              </FixedSizeList>
            </>
          )
        }
      </AutoSizer>
    </>
  );
}

SongsList.propType = {
  heightOffset: PropType.number,
  variant: PropType.string,
  songs: PropType.arrayOf(
    PropType.shape({
      number: PropType.number,
      cover: PropType.string,
      name: PropType.string.isRequired,
      author: PropType.string.isRequired,
      album: PropType.string,
      dateAdded: PropType.string,
      duration: PropType.number.isRequired,
    })
  ),
};

export default SongsList;