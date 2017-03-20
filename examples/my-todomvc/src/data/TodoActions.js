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

  updateDraft(draftContents) {
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
};

export default Actions;