const actions = [
  // user
  'USER_RESET_STATE',

  // ui
  'TRANSPARENT_TOOLBAR',
  'OPAQUE_TOOLBAR',

  // albums
  'ALBUMS_CLEAN_ERRORS',
  'ALBUMS_RESET_STATE',

  // player
  'ADD_TO_QUEUE',
  'REPLACE_QUEUE',
  'CONSUME_FROM_QUEUE',
  'REMOVE_FROM_QUEUE',
  'CLEAR_QUEUE',
  'PLAY',
  'PAUSE',
  'SET_JUMP_NEXT',
  'SET_RELOAD',
  'PLAYER_RESET_STATE',

  // history
  'LOG_SONG',
  'LOG_ALBUM',
  'LOG_RESET_STATE',

  // downloader
  'DOWNLOADER_CLEAN_RESULTS',
  'SET_ALBUM_PREVIEW',
  'DOWNLOADER_CLEAN_ERRORS',
  'DOWNLOADER_RESET_STATE'
];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;