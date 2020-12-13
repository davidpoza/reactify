import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';

// material-ui
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PlayArrow from '@material-ui/icons/PlayArrow';

// own
import useStyles from '../styles.js';
import Config from '../../../utils/config';
import { secondsToShortString } from '../../../utils/utilities';
import { addToQueue, play, pause, setReload } from '../../../actions/player';

/**
 * This component will be used on Albums and playlists.
 */

function SongListItem({
   index, style, data, addToQueue, play, pause, playerState, variant = 'album', setReload
  }) {
  const classes = useStyles();
  const [displayIcon, setDisplayIcon] = useState(false);
  const item = data[index];

  function onMouseEnterHandler() {
    if (variant !== 'queue') {
      setDisplayIcon(true);
    }
  }

  function onMouseLeaveHandler() {
    if (variant !== 'queue') {
      setDisplayIcon(false);
    }
  }

  function handleOnClick() {
    if (variant !== 'queue') {
      addToQueue({
        songId: item.id,
        songName: item.name,
        songSeconds: item.seconds,
        songAlbum: item.album,
        songArtist: item.artist,
        albumCover: item.cover,
        songAudio: item.audio,
      });
      setReload(true);
      play();
    }
  }

  return (
    <ListItem
      button style={style}
      key={index}
      className={classes.row}
      onClick={handleOnClick}
      onDoubleClick={handleOnClick}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {
        displayIcon
        ? <ListItemIcon className={classes.icon}>
            <PlayArrow />
          </ListItemIcon>
        : <ListItemText primary={index+1} className={classes.number} /> // TODO: use item.number instead of index
      }
      {
        ['playlist', 'queue', 'history'].includes(variant) && item.album && item.cover &&
        <ListItemAvatar>
          <Avatar
            variant="square"
            alt={`album cover for ${item.album}`}
            src={`${Config.API_HOST}${item.cover}`}
          />
        </ListItemAvatar>
      }

      <ListItemText
        primary={item.name}
        secondary={item.artist}
        className={variant === 'queue' && playerState.playing && index === 0 ? classes.playingTitle : classes.title}
      />
      {
        (variant === 'playlist' || variant === 'queue') && item.album &&
        <ListItemText primary={item.album} />
      }
      {
        variant === 'playlist' && item.dateAdded &&
        <ListItemText primary={item.dateAdded} />
      }
      <ListItemText primary={item.seconds ? secondsToShortString(item.seconds) : 'N/A'} className={classes.duration} />
    </ListItem>
  );
}

SongListItem.PropType = {
  variant: PropType.string,
  index: PropType.number,
  style: PropType.object,
  data: PropType.shape({
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
};

const mapStateToProps = (state) => {
  return {
    playerState: state.player,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToQueue: (obj) => dispatch(addToQueue(obj)),
    play: () => dispatch(play()),
    pause: () => dispatch(pause()),
    setReload: (val) => dispatch(setReload(val))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongListItem);