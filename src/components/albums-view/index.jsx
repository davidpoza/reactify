import React from 'react';

// own
import AlbumList from '../album-list';
import useStyles from './styles.js';

function AlbumsView() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AlbumList/>
    </div>
  );
}

export default AlbumsView;