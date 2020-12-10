import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// material ui
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// own
import useStyles from './styles.js';
import AlbumCover from '../album-cover';
import SongsList from '../songs-list/index.jsx';
import {getAlbum} from '../../api-client/album';
import { makeToolbarOpaque } from '../../actions/ui';

const songs = [
  { number: 1, name: 'cancion1', artist: 'cantante1', album: 'disco1', dateAdded: '8 Jul 2020', seconds: 120, cover: 'http://localhost:1337/uploads/thumbnail_download_5638d95acc.jpeg' },
  { number: 2, name: 'cancion2', artist: 'cantante2', album: 'disco2', dateAdded: '8 Jul 2020', seconds: 356, cover: 'http://localhost:1337/uploads/thumbnail_download_5638d95acc.jpeg' },
]

function Home({ makeToolbarOpaque }) {
  getAlbum({ token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA3Mjc3Mzk2LCJleHAiOjE2MDk4NjkzOTZ9.Yzv5p_Jdspc9Y-zeeZaWkgeW1rvuByl7BnoGZdeqDCY' })
   .then(data => console.log(data))
  const classes = useStyles();

  useEffect(() => {
    makeToolbarOpaque();
  }, []);

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

const mapDispatchToProps = (dispatch) => {
  return {
    makeToolbarOpaque: () => dispatch(makeToolbarOpaque()),
  }
}

export default connect(() => ({}), mapDispatchToProps)(Home);