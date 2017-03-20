//import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import TodoActionTypes from './TodoActionTypes';

import TodoDispatcher from './TodoDispatcher';

//const DRAFT_TEXT_KEY = 'DRAFT_TEXT';

// don't forget to export!
class TodoDraftStore extends ReduceStore {

  constructor() {
    super(TodoDispatcher); // register this store against the dispatcher singleton (superclass does that registration, I imagine)
  }

  // called during construction of the store
  getInitialState() {
    //return Immutable.Map({
    //  [DRAFT_TEXT_KEY]: '',
    //}); // yes, must set initial values of state here - this is what gets pushed to the view
    return ''; // our state as just a string here
    // do we need any immutable help here? I don't think so, since strings are immutable
  }

  // combine operations under reduce: (acc, curr) => new state returned
  // (accumulated state of draft contents, updated contents operation) => updated string
  // (accumulated state of draft contents, add operation) => empty string (reset)

  // this method must be pure and have no side effects
  reduce(state, action) {
    switch (action.type) {
      case TodoActionTypes.UPDATE_DRAFT:
        //return state.set(DRAFT_TEXT_KEY, action.draftContents);
        return action.draftContents;

      case TodoActionTypes.ADD_TODO:
        // the TodoStore will respond to the action by adding the todo item
        // to its map of items by id; we don't track that here; this is an
        // independent store that just tracks the draft contents, which we clear
        //return state.set(DRAFT_TEXT_KEY, ''); // notice how this action consumed by multiple pieces!
        return '';
      
      default:
        return state; // unrecognized action, so no-op
    }
  }
  // state automatically compared before and after reduce is called; changes
  // then emitted automatically depending on this check - this is why
  // good to have immutable data/reference-level differences like before in
  // raw React

}

// IMPORTANT - DON'T FORGET TO EXPORT A NEW INSTANCE!
export default new TodoDraftStore();