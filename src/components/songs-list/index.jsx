import React from 'react';
import PropType from 'prop-types';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// material ui
import ListItemText from '@material-ui/core/ListItemText';

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
      <div style={{display:'flex'}}>
        <ListItemText primary="#" className={classes.headerNumber} />
        <ListItemText primary="TITLE" className={classes.headerTitle} />
        {
          (variant === 'playlist' || variant === 'queue') &&
          <>
            <ListItemText primary=""/>
            <ListItemText primary="ALBUM"/>
          </>
        }
        {
          variant === 'playlist' &&
          <ListItemText primary="DATE ADDED" />
        }
        <ListItemText primary="DURATION" className={classes.headerDuration} />
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