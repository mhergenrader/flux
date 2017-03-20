import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';

// these are the actions to call by the UI and other areas to
// update the state stores that listen to the particular
// action types
const Actions = {
  addTodo(text) {
    console.log('executing addTodo action');
    TodoDispatcher.dispatch({
      type: TodoActionTypes.ADD_TODO,
      text,
    });
  },

  deleteTodo(id) {
    TodoDispatcher.dispatch({
      type: TodoActionTypes.DELETE_TODO,
      id,
    });
  },

  toggleTodo(id) {
    console.log('calling toggle todo w/ id =', id);
    TodoDispatcher.dispatch({ // dispatch an action
      type: TodoActionTypes.TOGGLE_TODO,
      id,
    });
  },

  updateDraft(draftContents) { // another way would be to possibly overload this action for editing todo text as well
    console.log('updating todos draft contents');
    TodoDispatcher.dispatch({
      type: TodoActionTypes.UPDATE_DRAFT,
      draftContents,
    });
  },

  clearCompleted() {
    console.log('clearing completed actions');
    TodoDispatcher.dispatch({
      type: TodoActionTypes.CLEAR_COMPLETED,
    })
  },

  markAllComplete() {
    console.log('marking all completed');
    TodoDispatcher.dispatch({
      type: TodoActionTypes.MARK_ALL_COMPLETE,
    });
  },

  startEditingTodo(id, currentTodoText) {
    console.log('started editing todo');
    TodoDispatcher.dispatch({
      type: TodoActionTypes.START_EDITING_TODO,
      id: id,
      currentTodoText,
    });
  },

  stopEditingTodo(id) {
    console.log('stopped editing todo');
    TodoDispatcher.dispatch({
      type: TodoActionTypes.STOP_EDITING_TODO,
      id: id, // likely don't really need this - this is just to lear the field/a notification action
    });
  },

  editTodo(id, savedTodoText) {
    console.log('submitting todo edit text');
    TodoDispatcher.dispatch({
      type: TodoActionTypes.EDIT_TODO,
      id,
      savedTodoText,
    });
  },

  editTodoText(updatedTodoText) {
    console.log('updating todo text');
    TodoDispatcher.dispatch({
      updatedTodoText,
    });
  },
};

export default Actions;