import React from 'react';

// material ui
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// own
import useStyles from './styles.js';
import AlbumCover from '../album-cover';
import SongsList from '../songs-list/index.jsx';

const songs = [
  { number: 1, title: 'cancion1', author: 'cantante1', album: 'disco1', dateAdded: '8 Jul 2020', duration: 120, cover: 'http://localhost:1337/uploads/thumbnail_download_5638d95acc.jpeg' },
  { number: 2, title: 'cancion2', author: 'cantante2', album: 'disco2', dateAdded: '8 Jul 2020', duration: 356, cover: 'http://localhost:1337/uploads/thumbnail_download_5638d95acc.jpeg' },
]

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

    <SongsList songs={songs} />
    </div>
  );
}

export default Home;