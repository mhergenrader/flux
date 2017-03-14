// containers connect state from stores back to views

import AppView from '../views/AppView';
import {Container} from 'flux/utils';

import TodoStore from '../data/TodoStore';
import TodoDraftStore from '../data/TodoDraftStore';

import TodoActions from '../data/TodoActions';

const getStores = () => [
  TodoStore,
  TodoDraftStore, // TODO: actions dispatched to these stores in any order? does it matter? (since we have a list here)
];

// TODO: (remaining functionality: 6-1)
// only part I'm not entirely sure about here: should we have separate containers?
// we have the view all nested under AppView, but should the new todo be a separate
// part of the UI, such that we should have a separate container for it?
const getState = () => ({
  todos: TodoStore.getState(), // todosById in an immutable map
  draftContents: TodoDraftStore.getState(), // strings are immutable by default
  
  onDeleteTodo: TodoActions.deleteTodo, // naming here is interesting: these are called at the
  // invocation of some event in the UI, so it seems the "on" prefix is warranted here: we want
  // the names to reflect that the action is being dispatched as result of user event interaction
  // with our view component
  onToggleTodo: TodoActions.toggleTodo, // functions that do dispatching of the action of concern

  onAddNewTodo: TodoActions.addTodo,

  onUpdateDraft: TodoActions.updateDraft,

}); // interesting here that they are passed down as "state"

// connect stores to functional stateless view
export default Container.createFunctional(AppView, getStores, getState);