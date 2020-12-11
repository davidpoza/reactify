import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// own
import useStyles from './styles.js';
import LastSongs from '../last-songs';
import LastAlbums from '../last-albums';
import { makeToolbarOpaque } from '../../actions/ui';

function HomeView({ makeToolbarOpaque }) {

  const classes = useStyles();

  useEffect(() => {
    makeToolbarOpaque();
  }, []);

  return (<div className={classes.root}>
    <LastSongs />
    <LastAlbums />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeToolbarOpaque: () => dispatch(makeToolbarOpaque()),
  }
}

export default connect(() => ({}), mapDispatchToProps)(HomeView);