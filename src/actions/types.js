const actions = [
  // User
  'LOGOUT',

  // UI
  'TRANSPARENT_TOOLBAR',
  'OPAQUE_TOOLBAR',
];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;