import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// own
import useStyles from './styles.js';
import AlbumList from '../album-list';
import LastSongs from '../last-songs';
import { makeToolbarOpaque } from '../../actions/ui';

const songs = [
  { number: 1, name: 'cancion1', artist: 'cantante1', album: 'disco1', dateAdded: '8 Jul 2020', seconds: 120, cover: 'http://localhost:1337/uploads/thumbnail_download_5638d95acc.jpeg' },
  { number: 2, name: 'cancion2', artist: 'cantante2', album: 'disco2', dateAdded: '8 Jul 2020', seconds: 356, cover: 'http://localhost:1337/uploads/thumbnail_download_5638d95acc.jpeg' },
]

function HomeView({ makeToolbarOpaque }) {

  const classes = useStyles();

  useEffect(() => {
    makeToolbarOpaque();
  }, []);

  return (<div className={classes.root}>
    <LastSongs />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeToolbarOpaque: () => dispatch(makeToolbarOpaque()),
  }
}

export default connect(() => ({}), mapDispatchToProps)(HomeView);