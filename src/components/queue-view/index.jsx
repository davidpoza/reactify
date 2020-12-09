import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';

// own
import useStyles from './styles';
import SongsList from '../songs-list';
import {clearQueue} from '../../actions/player';

function QueueView({
  playerState, clearQueue
}) {
  const classes = useStyles();

  function transformSongs(arrSongs) {
    return arrSongs.map((e, index) => {
      return ({
        number: index+1,
        id: e.id,
        name: e.name,
        author: e.artist,
        album: e.album,
        duration: e.seconds,
        cover: e.cover,
      });
    });
  }

  return (<div className={classes.root}>
    <div className={classes.header}>
      <h1>Queue</h1>
      {
        playerState.queue.length > 0 &&
        <Button
          variant="outlined"
          disableElevation
          className={classes.clearButton}
          onClick={clearQueue}>
          Clear queue
        </Button>
      }
    </div>
    <SongsList songs={transformSongs(playerState.queue)} variant="queue" heightOffset={200} />
    </div>);

}

const mapStateToProps = (state) => {
  return ({
    playerState: state.player,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    clearQueue: () => dispatch(clearQueue())
  })
}



export default connect(mapStateToProps, mapDispatchToProps)(QueueView);