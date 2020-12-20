import React, { useState } from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// material ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import { useHistory } from "react-router-dom";

// material ui icons
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhite';
import InfoIcon from '@material-ui/icons/Info';

// own
import useStyles from './styles';
import { replaceQueue, setReload } from '../../actions/player';
import { setAlbumPreview } from '../../actions/downloader';
import { getAlbumSongs } from '../../api-client/album';
import { transformSongs } from '../../utils/utilities';
import Config from '../../utils/config';
import withIsMobile from '../../hocs/with-is-mobile';

function AlbumCover({
  user, id, cover, name, artist, link, replaceQueue, setReload, absoluteUrls, isMobile, disablePlay, setAlbumPreview,
}) {
  const classes = useStyles({ isMobile });
  const history = useHistory();
  const [display, setDisplay] = useState(false);

  function onMouseEnterHandler() {
    setDisplay(true);
  }

  function onMouseLeaveHandler() {
    setDisplay(false);
  }

  async function handleOnClickPlay(e) {
    e.preventDefault();
    const songs = await getAlbumSongs({
      token: user.jwt,
      albumId: id,
    });
    replaceQueue(transformSongs(songs, { name, artist, cover }) );
    setReload(true);
  }

  function handleOnClickLoadPreview(e) {
    setAlbumPreview({
      id,
      cover,
      name,
      artist
    });
    history.push("/album-preview");
  }

  return (<Card className={classes.root}>
    <CardActionArea
      component={disablePlay ? undefined : Link} to={ disablePlay ? undefined : `/album/${id}`}
      className={classes.actionArea}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <CardMedia
        component="img"
        alt={`Cover del álbum ${name} de ${artist}`}
        className={classes.media}
        image={ absoluteUrls ? cover : `${Config.API_HOST}${cover}` }
      />
      <Fade in={display} timeout={500}>
        {
          disablePlay
            ? <InfoIcon color="primary" className={classes.icon} onClick={handleOnClickLoadPreview} />
            : <PlayIcon color="primary" className={classes.icon} onClick={handleOnClickPlay} />
        }
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
  disablePlay: PropType.bool,
  absoluteUrls: PropType.bool,
  id: PropType.number,
  cover: PropType.string,
  name: PropType.string,
  artist: PropType.string,
  link: PropType.string,
}

const mapStateToProps = (state) => {
  return {
    user: state.user.current,
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    replaceQueue: (newQueue) => dispatch(replaceQueue(newQueue)),
    setReload: (val) => dispatch(setReload(val)),
    setAlbumPreview: (obj) => dispatch(setAlbumPreview(obj)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(withIsMobile(AlbumCover));