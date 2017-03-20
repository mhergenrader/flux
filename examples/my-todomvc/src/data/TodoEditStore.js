import TodoDispatcher from './TodoDispatcher';
import TodoActionTypes from './TodoActionTypes';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import Todo from './Todo';

class TodoEditStore extends ReduceStore {
  constructor() {
    super(TodoDispatcher); // register this store against the dispatcher singleton
  }

  getInitialState() {
    //return ''; // default no edit id (id is string of form id-n)
    return Immutable.OrderedMap({
      id: '',
      currentTodoText: '',
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case TodoActionTypes.START_EDITING_TODO:
        return Immutable.OrderedMap({
          id: action.id,
          currentTodoText: action.currentTodoText,
        });

      case TodoActionTypes.STOP_EDITING_TODO:
        return this.getInitialState();      

      
      // TODO: was this meant to be the event for below?
      case TodoActionTypes.EDIT_TODO: // aka submit change
        return this.getInitialState();
        //return ''; // submitted the updated todo text, so no longer editing
        // this will allow the UI to reset to the non-input state
        // also helpful that the actions are sent to all stores the same way
        // such that doesn't matter what order the stores receive them
      
      case TodoActionTypes.EDIT_TODO_TEXT:
        return state.set('currentTodoText', action.updatedTodoText);

      default:
        return state;
    }
  }


}

export default new TodoEditStore(); // export the singleton store