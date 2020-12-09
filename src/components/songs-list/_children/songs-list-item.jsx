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
import PauseIcon from '@material-ui/icons/Pause';

// own
import useStyles from '../styles.js';
import Config from '../../../utils/config';
import { secondsToShortString } from '../../../utils/utilities';
import { addToQueue } from '../../../actions/player';

/**
 * This component will be used on Albums and playlists.
 */

function SongListItem({ index, style, data, addToQueue, playerState, variant = 'album' }) {
  const classes = useStyles();
  const [displayIcon, setDisplayIcon] = useState(false);
  const item = data[index];

  function onMouseEnterHandler() {
    setDisplayIcon(true);
  }

  function onMouseLeaveHandler() {
    setDisplayIcon(false);
  }

  function handleOnClick() {
    addToQueue({
      songId: item.id,
      songName: item.name,
      songSeconds: item.duration,
      songAlbum: item.album,
      songArtist: item.author,
      albumCover: item.cover,
      songAudio: item.audio,
    });
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
        : <ListItemText primary={item.number} className={classes.number} />
      }
      {
        (variant === 'playlist' || variant === 'queue') && item.album && item.cover &&
        <ListItemAvatar>
          <Avatar
            variant="square"
            alt={`Carátula del album ${item.album}`}
            src={`${Config.API_HOST}${item.cover}`}
          />
        </ListItemAvatar>
      }

      <ListItemText primary={item.name} secondary={item.author} className={classes.title} />
      {
        (variant === 'playlist' || variant === 'queue') && item.album &&
        <ListItemText primary={item.album} />
      }
      {
        variant === 'playlist' && item.dateAdded &&
        <ListItemText primary={item.dateAdded} />
      }
      <ListItemText primary={secondsToShortString(item.duration)} className={classes.duration} />
    </ListItem>
  );
}

SongListItem.PropType = {
  variant: PropType.string,
  index: PropType.number,
  style: PropType.object,
  data: PropType.shape({
    number: PropType.number,
    cover: PropType.string,
    name: PropType.string.isRequired,
    author: PropType.string.isRequired,
    album: PropType.string,
    dateAdded: PropType.string,
    duration: PropType.number.isRequired,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongListItem);