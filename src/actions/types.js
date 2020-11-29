const actions = [
  // Todos
  "ADD_TODO",
  "COMPLETE_TODO",
  "CLEAR_TODOS",

  // Usuarios
  "UPDATE_NAME"
];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;