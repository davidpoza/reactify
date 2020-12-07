import React from 'react';
import PropType from 'prop-types';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// own
import ListItem from './_children/songs-list-item';

import useStyles from './styles.js'

function SongsList({songs}) {
  const classes = useStyles();
  return (
    <AutoSizer>
      {
        ({ height, width}) => (
          <FixedSizeList width={width} height={400} itemSize={60} itemCount={songs.length} itemData={songs}>
            {
              ListItem
            }
          </FixedSizeList>
        )
      }
    </AutoSizer>
  );
}

SongsList.propType = {
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