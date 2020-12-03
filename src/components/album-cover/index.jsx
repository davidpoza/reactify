import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

function AlbumCover({
  cover, title, author, link,
}) {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);

  function onMouseEnterHandler() {
    setDisplay(true);
  }

  function onMouseLeaveHandler() {
    setDisplay(false);
  }

  return (<Card className={classes.root}>
    <CardActionArea className={classes.actionArea} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      <CardMedia
        component="img"
        alt={`Cover del álbum ${title} de ${author}`}
        className={classes.media}
        image={cover}
      />
      <Fade in={display} timeout={500}>
        <PlayIcon color="primary" className={classes.icon} />
      </Fade>
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h2" component="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h3" color="textSecondary" component="h3" className={classes.author}>
          {author}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>);
}

AlbumCover.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  link: PropTypes.string,
}

export default AlbumCover;