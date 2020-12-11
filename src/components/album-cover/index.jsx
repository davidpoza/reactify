import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// material ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

// material ui icons
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhite';

// own
import useStyles from './styles';
import { replaceQueue, setReload } from '../../actions/player';
import { getAlbumSongs } from '../../api-client/album';
import { transformSongs } from '../../utils/utilities';
import Config from '../../utils/config';

function AlbumCover({
  user, id, cover, name, artist, link, replaceQueue, setReload
}) {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);

  function onMouseEnterHandler() {
    setDisplay(true);
  }

  function onMouseLeaveHandler() {
    setDisplay(false);
  }

  async function handleOnClickPlay() {
    const songs = await getAlbumSongs({
      token: user.jwt,
      albumId: id,
    });
    console.log(transformSongs(songs, { name, artist, cover }))
    replaceQueue(transformSongs(songs, { name, artist, cover }) );
    setReload(true);
  }

  return (<Card className={classes.root}>
    <CardActionArea className={classes.actionArea} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      <CardMedia
        component="img"
        alt={`Cover del álbum ${name} de ${artist}`}
        className={classes.media}
        image={`${Config.API_HOST}${cover}`}
      />
      <Fade in={display} timeout={500}>
        <PlayIcon color="primary" className={classes.icon} onClick={handleOnClickPlay} />
      </Fade>
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h2" component="h2" className={classes.title}>
          {name}
        </Typography>
        <Typography variant="h3" color="textSecondary" component="h3" className={classes.author}>
          {artist}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>);
}

AlbumCover.propTypes = {
  id: PropTypes.number,
  cover: PropTypes.string,
  name: PropTypes.string,
  artist: PropTypes.string,
  link: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    user: state.user.current,
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    replaceQueue: (newQueue) => dispatch(replaceQueue(newQueue)),
    setReload: (val) => dispatch(setReload(val))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCover);