import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// own
import LastSongs from '../last-songs';
import LastAlbums from '../last-albums';
import { makeToolbarOpaque } from '../../actions/ui';
import withViewStyles from '../../hocs/with-view-styles';

function HomeView({ makeToolbarOpaque, viewClasses }) {

  useEffect(() => {
    makeToolbarOpaque();
  }, []);

  return (<div className={viewClasses}>
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

export default connect(() => ({}), mapDispatchToProps)(withViewStyles(HomeView));