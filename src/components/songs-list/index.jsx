import React from 'react';
import PropType from 'prop-types';

import { FixedSizeList } from 'react-window';

// own
import ListItem from './_children/songs-list-item';

import useStyles from './styles.js'

function SongsList({songs}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FixedSizeList height={400} width={800} itemSize={46} itemCount={songs.length} itemData={songs}>
      {
        ListItem
      }
      </FixedSizeList>
    </div>
  );
}

SongsList.propType = {
  songs: PropType.array,
};

export default SongsList;