import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

// material ui
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

// own
import useStyles from './styles';
import AlbumList from '../album-list';
import withViewStyles from '../../hocs/with-view-styles'
import withIsMobile from '../../hocs/with-is-mobile';
import withLoader from '../../hocs/with-loader';
import { searchAlbums, cleanResults } from '../../actions/downloader';

function DownloaderView({
  viewClasses, isMobile, searchAlbums, albums, cleanResults, error,
}) {
  const classes = useStyles({ isMobile });
  const [query, setQuery] = useState('');

  // clean results before close site
  useEffect(() => {
    window.addEventListener('beforeunload', cleanResults);
    return () => {
      window.removeEventListener('beforeunload', cleanResults);
    }
  }, []);

  function handleOnChange(e) {
    setQuery(e.target.value)
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    searchAlbums(query);
  }

  function transformAlbums(albums) {
    if (!albums) {
      return [];
    }
    return (
      albums.map(album => ({
        id: album.album_id,
        name: album.album,
        cover: {
          url: album.img_url.replace('56x56', '192x192')
        },
        artists: [
          {
            name: album.artist,
          }
        ]
      }))
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className={viewClasses}>
      <h1>Music downloader</h1>
      <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
        <TextField
          id="search-query"
          className={classes.textfield}
          placeholder="Type an album title"
          value={query}
          onChange={handleOnChange}
          InputProps={{
            className: classes.input,
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}

         />
      </form>
      <AlbumList albumsArray={transformAlbums(albums)} disablePlay={true} absoluteUrls={true} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    albums: state.downloader.albumsFetched,
    loading: state.downloader.isLoading,
    error: state.downloader.error,
    errorMessage: state.downloader.errorMessage,
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    searchAlbums: (query) => dispatch(searchAlbums(query)),
    cleanResults: () => dispatch(cleanResults()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(withViewStyles(withIsMobile(withLoader(DownloaderView))));