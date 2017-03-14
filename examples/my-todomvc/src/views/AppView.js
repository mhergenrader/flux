import React from 'react';

// just forwarding along our props here in AppView to the child components
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
  return (
    <section id="main">
      <ul id="todo-list">
        {
          todosList.map(todo => (
            <li key={todo.id}>
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
          ))
        }
      </ul>
    </section>
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
      <span id="todo-count">
        <strong>{remaining}</strong> {phrase}
      </span>
    </footer>
  );
};

export default AppView;