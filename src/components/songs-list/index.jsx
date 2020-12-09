import React from 'react';
import PropType from 'prop-types';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// own
import MyListItem from './_children/songs-list-item';
import SongListHeader from './_children/header';



function SongsList({ songs, variant, heightOffset = 0}) {


  function ListItemWithVariant(props) {
    return <MyListItem {...props} variant = {variant} />
  }

  return (
    <>
      <SongListHeader variant={variant} />
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
      id: PropType.string,
      number: PropType.number,
      cover: PropType.string,
      name: PropType.string.isRequired,
      artist: PropType.string.isRequired,
      album: PropType.string,
      dateAdded: PropType.string,
      seconds: PropType.number.isRequired,
      audio: PropType.string,
    })
  ),
};

export default SongsList;