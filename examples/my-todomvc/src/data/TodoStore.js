import TodoDispatcher from './TodoDispatcher';
import TodoActionTypes from './TodoActionTypes';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import Todo from './Todo';

import Counter from './Counter';


// the store will save info about all Todo objects in app
// remember: applications can and should have many stores

// ReduceStore makes sense: just invokes a reduce-like operation:
// we have our accumulated state store (accumulator) and our curren action
// that has been dispatched, and we want to run the combiner to give us the
// new state of the store (notice how we are returning either the same
// state/identity operation in the case where it didn't make sense to get
// and updated state store and then returning back the new state store value
// on cases where an update was intended)
class TodoStore extends ReduceStore {
  constructor() {
    super(TodoDispatcher); // create a store that has a link to the dispatcher
  } // this is likely where we register the store with the dispatcher
  // I'm supposing that ReduceStore performs this registration

  getInitialState() {
    return Immutable.OrderedMap(); // blank map to start out with
  }

  reduce(state, action) {
    switch (action.type) { // recall that switch underneath just uses the === operator for checking the cases
      case TodoActionTypes.ADD_TODO:
        if (!action.text) {
          return state; // give back the original state; invalid text
        }
        console.log('received todo item from dispatcher in TodoStore:', action);

        const id = Counter.increment();

        return state.set(id, new Todo({ // constructor function wrapped inside/decorated by Immutable.Record
          id,
          text: action.text,
          complete: false,
        }));

        // so state is an ordered map, so we are adding an entry into it
      
      case TodoActionTypes.DELETE_TODO:
        return state.delete(action.id);
      
      case TodoActionTypes.TOGGLE_TODO:
        return state.update(
          action.id,
          todo => {
            return todo.set('complete', !todo.complete); // make sure to return the expression! we are returning back a new todo item w/ the complete property set to true
          },
        ); // this line makes sense, but I guess nothing actually gets directly
        // modified here, since we are using an immutable wrapper; I suppose
        // this library allows us to think we are mutating something directly
        // via these methods but underneath just translates these calls into
        // constructing a new object and storing that?
        // at least, that's what it seems like other immutability libraries do,
        // and we know that the store should not be directly mutated

      case TodoActionTypes.CLEAR_COMPLETED:
        return state.filter(todo => !todo.complete); // wow - look how concise!

      case TodoActionTypes.MARK_ALL_COMPLETE:
        // return state.map(todo => Object.assign({}, todo, {
        //   complete: true,
        // }));/// hmm - doesn't set the key properly?
        // note below that todo.set returns a new object here, so we can use
        // this as a no block arrow function
        return state.map(todo => todo.set('complete', true));


      default: // any other action = just give the state back as we had it before
        return state;
    }
  }
}

// this file just contains one of our stores (seems like modules
// should have their own store, one per module)
export default new TodoStore();