import React from 'react';
import {connect} from 'react-redux';

// material ui
import Grid from '@material-ui/core/Grid';

// own
import useStyles from './styles.js'
import AlbumCover from '../album-cover';

function LastAlbums({
  history
}) {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <h1>Visited albums</h1>
      <Grid container spacing={3}>
        {
          history.albums.map((album, index) => {
            return (<Grid item key={`$album-grid-item-${album.id}`} >
              <AlbumCover
                key={album.id} id={album.id} name={album.name} artist={album.artists[0].name} cover={album.cover.url}
              />
            </Grid>);
          })
        }
      </Grid>
    </div>
  );

}

const mapStateToProps = (state) => {
  return ({
    history: state.history,
  });
}

export default connect(mapStateToProps)(LastAlbums);