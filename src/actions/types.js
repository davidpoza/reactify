const actions = [
  // User
  'LOGOUT',

  // UI
  'TRANSPARENT_TOOLBAR',
  'OPAQUE_TOOLBAR',

  // Player
  'PLAY',
  'PAUSE',
  'STOP', // clear queue
  'ADD_TO_QUEUE',
  'REMOVE_FROM_QUEUE',
];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;