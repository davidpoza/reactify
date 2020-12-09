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