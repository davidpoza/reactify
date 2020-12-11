import React from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';

// own
import useStyles from './styles';
import SongsList from '../songs-list/index.jsx';
import { HistoryOutlined } from '@material-ui/icons';

function LastSongs({
  history
}) {
  const classes = useStyles();
  return (
    <div>
      <h1>Recently played</h1>
      <SongsList songs={history.songs} variant="history" />
    </div>
  )
}

LastSongs.PropType = {

}

const mapStateToProps = (state) => {
  return ({
    history: state.history
  });
};


export default connect(mapStateToProps)(LastSongs);
