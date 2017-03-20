const ActionTypes = {
  ADD_TODO: 'ADD_TODO', // recall: we cannot use shorthand here because we need to have the value be an identifier of a variable defined the same name as a property; here, it is just a string literal
  DELETE_TODO: 'DELETE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',

  UPDATE_DRAFT: 'UPDATE_DRAFT',

  CLEAR_COMPLETED: 'CLEAR_COMPLETED',

  MARK_ALL_COMPLETE: 'MARK_ALL_COMPLETE',

  START_EDITING_TODO: 'START_EDITING_TODO',
  STOP_EDITING_TODO: 'STOP_EDITING_TODO',
  EDIT_TODO: 'EDIT_TODO',

  UPDATE_TODO_TEXT: 'UPDATE_TODO_TEXT',
};

export default ActionTypes;

