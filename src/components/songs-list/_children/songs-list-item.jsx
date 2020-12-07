import React, {useState} from 'react';
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
import { secondsToShortString } from '../../../utils/utilities';


/**
 * This component will be used on Albums and playlists.
 * For playlist case it will use all non-required fields.
 */

function SongListItem({ index, style, data }) {
  const classes = useStyles();
  const [displayIcon, setDisplayIcon] = useState(false);
  const item = data[index];

  function onMouseEnterHandler() {
    setDisplayIcon(true);
  }

  function onMouseLeaveHandler() {
    setDisplayIcon(false);
  }

  return (
    <ListItem button style={style} key={index} className={classes.row} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      {
        displayIcon
        ? <ListItemIcon className={classes.icon}>
            <PlayArrow />
          </ListItemIcon>
        : <ListItemText primary={item.number} className={classes.number} />
      }
      {
        item.album && item.cover &&
        <ListItemAvatar>
          <Avatar
            variant="square"
            alt={`Carátula del album ${item.album}`}
            src={item.cover}
          />
        </ListItemAvatar>
      }

      <ListItemText primary={item.name} secondary={item.author} className={classes.title} />
      {
        item.album &&
        <ListItemText primary={item.album} />
      }
      {
        item.dateAdded &&
        <ListItemText primary={item.dateAdded} />
      }
      <ListItemText primary={secondsToShortString(item.duration)} className={classes.duration} />
    </ListItem>
  );
}

SongListItem.PropType = {
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

export default SongListItem;