import React from 'react';
import { mount } from 'enzyme';
import { Provider } from "react-redux";

// own
import store from '../../store';
import LastSongs from '../last-songs';

describe('LastSongs', () => {
  it('should render passing history state queue as songs prop to <SongsList>', () => {
    const song1 = {
      "id": 1,
      "number": 1,
      "name": "Wake up call",
      "album": "Testify",
      "artist": "Phil Collins",
      "seconds": 155,
      "cover": "/uploads/download_5638d95acc.jpeg",
      "audio": "/uploads/Phil_Collins_Wake_up_Call_9f5c3a35bd.flac"
    };
    store.dispatch({ type:'LOG_SONG', song:song1 });
    const wrapper = mount(<Provider store={store}><LastSongs/></Provider>);
    expect(wrapper.find('SongsList').prop('songs')).toHaveLength(1);
    expect(wrapper.find('SongsList').prop('songs')[0]).toEqual(song1);
  })
})
