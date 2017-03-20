// containers connect state from stores back to views

import AppView from '../views/AppView';
import {Container} from 'flux/utils'; // creates FluxContainer

import TodoStore from '../data/TodoStore';
import TodoDraftStore from '../data/TodoDraftStore';

import TodoActions from '../data/TodoActions';

// stores callback for a container that we are creating
// state to inject the state into the component/mix it in for the view
// likely that the container subscribes the view to the stores specified

const getStores = () => [
  TodoStore,
  TodoDraftStore, // TODO: actions dispatched to these stores in any order? does it matter? (since we have a list here)
];

// TODO: (remaining functionality: 6-1)
// only part I'm not entirely sure about here: should we have separate containers?
// we have the view all nested under AppView, but should the new todo be a separate
// part of the UI, such that we should have a separate container for it?

// notes from docs: if a view uses a store but doesn't subscribe to it, then
// likely a bug; I think the container from flux provides this subscription setup

/*
flux docs: Container
- react components that control a view
- gather info from stores and save in their state
- no props, no UI logic

indeed container create makes a react class component into a container that updates
state when relevant stores change that the container looks at (sets up the
subscriptions)

containers are pure by default: do not rerender when props and state don't change
(determined via ==)
- cannot access props (for perf reasons)

just think of containers as UI component wrappers (that are components themselves)
that automatically subscribe to the stores you specify
- auto updates component state if registered stores emit change event
- assumes that component does not depend on other parts of app state



the views are controlled by containers under the Flux architecture
- the receive all info and callbacks as props
*/

// executes this when stores have emitted change events to then get the latest
// state for the wrapped component - my thinking here is that when stores
// emit events, the container will then on change, create a new react component
// for the one that is wrapped, execute the getState method here to get
// all the state, and pass that in as props (correct on the props piece)
// and it perhaps creates a new container component itself, since it also
// takes in a callback that produces references to the stores, likely then
// to subscribe to them again for this newest component
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

  onClearCompleted: TodoActions.clearCompleted,

}); // interesting here that they are passed down as "state"

// connect stores to functional stateless view
// higher-order component function that creates a view that renders appView
// and also passes in the stores and higher level state that it can rely upon
export default Container.createFunctional(AppView, getStores, getState);