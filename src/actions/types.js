const actions = [
  // User
  'LOGOUT',

  // UI
  'TRANSPARENT_TOOLBAR',
  'OPAQUE_TOOLBAR',

  // Player
  'ADD_TO_QUEUE',
  'REPLACE_QUEUE',
  'CONSUME_FROM_QUEUE',
  'REMOVE_FROM_QUEUE',
  'CLEAR_QUEUE',
  'PLAY',
  'PAUSE',
  'SET_JUMP_NEXT'
];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;