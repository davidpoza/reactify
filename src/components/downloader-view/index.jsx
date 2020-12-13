import React, {useState} from 'react';

// material ui
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

// own
import useStyles from './styles';
import * as apiDownloader from '../../api-client/downloader';
import AlbumList from '../album-list';
import withViewStyles from '../../hocs/with-view-styles'
import withIsMobile from '../../hocs/with-is-mobile';

function DownloaderView({viewClasses, isMobile }) {
  const classes = useStyles({ isMobile });
  const [query, setQuery] = useState('');
  const [albums, setAlbums] = useState([]);

  function handleOnChange(e) {
    setQuery(e.target.value)
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const result = await apiDownloader.getResults({ query });
    setAlbums(transformAlbums(result))
  }

  function transformAlbums(albums) {
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
      <AlbumList albumsArray={albums} absoluteUrls={true} />
    </div>
  )
}

export default withViewStyles(withIsMobile(DownloaderView));