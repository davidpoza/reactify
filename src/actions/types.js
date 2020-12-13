const actions = [
  // user
  'LOGOUT',

  // ui
  'TRANSPARENT_TOOLBAR',
  'OPAQUE_TOOLBAR',

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

  // history
  'LOG_SONG',
  'LOG_ALBUM',

  // downloader
  'DOWNLOADER_CLEAN_RESULTS',
  'SET_ALBUM_PREVIEW',
];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;