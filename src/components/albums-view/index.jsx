import React from 'react';

// own
import AlbumList from '../album-list';
import withViewStyles from '../../hocs/with-view-styles'
import withIsMobile from '../../hocs/with-is-mobile'

function AlbumsView({ viewClasses }) {

  return (
    <div className={viewClasses}>
      <AlbumList/>
    </div>
  );
}

export default withIsMobile(withViewStyles(AlbumsView));