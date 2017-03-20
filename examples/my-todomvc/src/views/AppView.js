import React from 'react';

// just forwarding along our props here in AppView to the child components
// this component is quite simple: it just delegates the props received (from
// the container state, which subscribes to changes from the store specified
// note that we could split and make a couple of containers here if want to
// isolate out which views listen to which stores (with the containers effectively
// serving as the controllers/model servers)
const AppView = props => (
  <div>
    <section>
      <NewTodoView {...props} />
    </section>
    <section>
      <Header {...props} />
      <Main {...props} />
      <Footer {...props} />
    </section>
  </div>
);

// we have the draftContents in the TodoDraftStore that has been passed down
// to this component in props (and coincidentally through parent component
// of AppView)
// TODO: stateless functional component, but how can we set the focus back to the
// input when hitting enter?
// TODO: we have a button, but what about a form instead to allow user to hit enter?
// and set up the refocusing
/*
<button onClick={(event) => {
        event.preventDefault();
        props.onAddNewTodo(currentDraftContents);
      }}>Add Todo</button>
*/
// stateless functional components cannot have refs
// interesting: input type="submit" when given a text value throws a
// propTypes error! (doesn't recognize this against a normal input?) thus,
// i've changed this to a button element instead
// TODO: better way to autofocus than using document.querySelector?
// seems like this is a sort of side effect when submitting (we modify the
// focus), so maybe shouldn't have this be stateless functional?
// TODO: styling here is a bit strange when I do section and h1 elements
const NewTodoView = props => {
  const currentDraftContents = props.draftContents;
  return (
    <div>
      <p>Add New Todo</p>
      <form noValidate onSubmit={event => {
        event.preventDefault();
        props.onAddNewTodo(currentDraftContents);  
        document.querySelector('#newTodoDraftContents').focus();      
      }}>
        <input id="newTodoDraftContents"
               type="text"
               value={currentDraftContents}
               onChange={event => {
                 props.onUpdateDraft(event.target.value);
               }} />
        <button type="submit">Add Todo</button>
      </form>      
    </div>
  );
};


const Header = (props) => (
  <header id="header">
    <h1>todos</h1>
  </header>
);

const Main = props => {
  if (props.todos.size === 0) {
    return null; // interesting! TODO: null = render nothing?
  }

  const todosList = [...props.todos.values()].reverse();
  console.log('main todosList:', todosList);

  // we just have our todos passed in (ordered map), and then we get their
  // values only (just the todo objects, not the ID's), and then we create
  // a copy of those values, since reverse() is a mutating method of arrays,
  // using the spread operator to do a concat into a new array
  // and then for each todo item, we just output the checkbox, the label,
  // and a delete button all under one div element to contain this type of
  // UI (perhaps we could separate out a list item here as another component)

  // remember: values is an iterator, and the spread operator exhausts that 
  // iterator to make a new array

  // also: for JSX syntax: remember: no semicolons, etc.: just JS expressions
  // interesting that onDoubleClick didn't register when I put this directly
  // on the TodoItem here - only when added to the LI item it contains
  return (
    <section id="main">
      <ul id="todo-list">
        {todosList.map(todo =>
          <TodoItem key={todo.id}
                    todo={todo}
                    editTodoState={props.editTodoState}
                    onEditTodo={props.onEditTodo}
                    onStartEditTodo={props.onStartEditTodo}
                    onStopEditTodo={props.onStopEditTodo}
                    onToggleTodo={props.onToggleTodo}
                    onEditTodoText={props.onEditTodoText}
                    />)}
      </ul>
      <button onClick={props.onMarkAllComplete}>Mark All Complete</button>
    </section>
  );
};


// startEditing todo is when double click happens, and then the view should
// render an input field
// stopEditing todo is when we cancel
// editTodo is the action that will push the submitted changes to the 
// TodoStore (submit)
// we look at the current todo being edited to see if it matches our todo's
// id, and if so, then we should render the input
const TodoItem = props => {

  //<li key={todo.id}>
  const editingTodo = props.editTodoState.get('id') === props.todo.id;
  const todo = props.todo;

  console.log(`todo with ${todo.id} being edited? ${editingTodo}`);
  
  const submitTodoEditText = () => { // technically gets event, but not used here
    const todoText = props.editTodoState.get('currentTodoText');
    event.preventDefault();
    if (todoText) {
      props.onEditTodo(todo.id, todoText);
      props.onStopEditTodo(todo.id);
    }
  };

  // notice the use of event delegation here on the form element!
  // captures any submit events from the input box and the button
  // notice that we need to put the todo text in a state store somewhere
  // to be managed - this is because we have stateless functional components
  // here, so the submit event here cannot just grab the element text value
  // out of the input, as far as I know (could be multiple possible targets,
  // due to event delegation, and can't use state or refs in stateless functional
  // components)
  // thus, we can store the text inside the edit store as well,

  // TODO:
  // React giving warnings about controlled components when attaching my input element up to the more central state store
  // I'm assuming controlled means that we impose the value state maintained by the HTML element to be whatever React has
  // whereas uncontrolled = just let that input have its own state and pick up later?
  // seems like we have to control it - how else to grab the state and maintain good UI from functional stateless component
  // like this? (since we use event delegation and SFC's don't have refs/state themselves to find that input element)
  // DONE: the || syntax to prefill the edit is hacky - let's remove that
  // value={props.editTodoState.get('currentTodoText') || todo.text} (this was the line)
  // now, just make sure startTodo takes the current text to prefill it
  // after all, the input should only depend on our current state

  if (editingTodo) {
    return (
      <li>
        <div>
          <form noValidate onSubmit={submitTodoEditText}>
            <input id={'edit-todo-' + todo.id}
                   type="text"
                   placeholder="Edit new Todo text"
                   value={props.editTodoState.get('currentTodoText')}
                   onChange={ (event) => {
                     props.onEditTodoText(event.target.value);
                   }}/>
            <button type="submit">Save</button>
            <button onClick={() => {
              props.onStopEditTodo(todo.id);
            }} >Cancel</button>
          </form>
          
        </div>
      </li>
    );
  }


  return (
    <li onDoubleClick={(event) => {
        console.log(`start editing todo with id ${todo.id}`);
        props.onStartEditTodo(todo.id, todo.text);
      }}>
      <div className="view">
        <input className="toggle"
              type="checkbox"
              checked={todo.complete}
              onChange={() => {
                props.onToggleTodo(todo.id);
              }} />
        <label>
          {todo.text}
        </label>
        <button className="destroy"
                onClick={() => {
                  props.onDeleteTodo(todo.id);
                }} />
      </div>
    </li>
  );
};


const Footer = props => {
  if (props.todos.size === 0) {
    return null; // notice this pattern again for render: if return null or false,
    // then this signals that you don't want anything rendered
    // React.findDOMNode(this) will then return null also (makes sense)
    // source: https://facebook.github.io/react/docs/react-component.html#render
  }

  // remember: todos is Immutable.OrderedMap; we are essentially filtering
  // for the number of entries here, likely creating a new Immutable.OrderedMap
  // that is a subset of our original, and then just calling size property on
  // that new OrderedMap
  const remaining = props.todos.filter(todo => !todo.complete).size;
  const phrase = remaining === 1 ? ' item left' : 'items left';

  // TODO: why have a string literal here? why not just text? (' items left')
  // RESOLVED: that was just a placeholder expression until we wanted to
  // put in a real expression (just kept the JS expression syntax around,
  // since going to replace w/ an expression anyway)
  return (
    <footer id="footer">
      <p>
        <span id="todo-count">
          <strong>{remaining}</strong> {phrase}
        </span>
      </p>
      <button onClick={props.onClearCompleted}>Clear Completed</button>
    </footer>
  );
};

export default AppView;