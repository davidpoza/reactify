import React from 'react';
import PropTypes from 'prop-types';

// material ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

// own
import useStyles from './styles';



function AlbumCover({
  cover, title, author, link,
}) {
  const classes = useStyles();
  return (<Card className={classes.root}>
    <CardActionArea>
      <CardMedia
        component="img"
        alt={`Cover del álbum ${title} de ${author}`}
        height="180"
        className={classes.media}
        image={cover}
      />
      <CardContent>
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