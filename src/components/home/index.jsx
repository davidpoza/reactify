import React from 'react';

// material ui
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// own
import useStyles from './styles.js';
import AlbumCover from '../album-cover';

function Home() {
  const classes = useStyles();
  return (<div className={classes.root}>
    <Grid container spacing={3}>
      {
        [1,2,3,4,5,6,7,8,9,10].map((e, index) => {
          return (<Grid item >
            <AlbumCover title={`Testify ${index}`} author="Phil Collins" cover="http://localhost:1337/uploads/thumbnail_download_5638d95acc.jpeg" />
          </Grid>);
        })
      }
    </Grid>
    </div>
  );
}

export default Home;