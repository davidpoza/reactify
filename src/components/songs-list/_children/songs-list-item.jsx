import React from 'react';
import PropType from 'prop-types';

// material-ui
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// own
import useStyles from '../styles.js';
import { secondsToString } from '../../../utils/utilities';


/**
 * This component will be used on Albums and playlists.
 * For playlist case it will use all non-required fields.
 */

function SongListItem({ index, style, data }) {
  const classes = useStyles();
  const item = data[index];
  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={item.number} className={classes.number} />
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

      <ListItemText primary={item.title} secondary={item.author} className={classes.title} />
      {
        item.album &&
        <ListItemText primary={item.album} />
      }
      {
        item.dateAdded &&
        <ListItemText primary={item.dateAdded} />
      }
      <ListItemText primary={secondsToString(item.duration)} />
    </ListItem>
  );
}

SongListItem.PropType = {
  index: PropType.number,
  style: PropType.object,
  data: PropType.shape({
    number: PropType.number,
    cover: PropType.string,
    title: PropType.string.isRequired,
    author: PropType.string.isRequired,
    album: PropType.string,
    dateAdded: PropType.string,
    duration: PropType.number.isRequired,
  })
};

export default SongListItem;