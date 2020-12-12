import React from 'react';

// own
import AlbumList from '../album-list';
import withViewStyles from '../../hocs/with-view-styles'

function AlbumsView({ viewClasses }) {

  return (
    <div className={viewClasses}>
      <AlbumList/>
    </div>
  );
}

export default withViewStyles(AlbumsView);