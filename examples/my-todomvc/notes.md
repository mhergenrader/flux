# Learnings
- careful about how you import! if you export something as default but then use named syntax for importing, you won't get your item! (undefined)
- only place that should have knowledge of flux is the container, so anything the view needs should be passed down from the container
  - note: view doesn't dispatch actions directly - easier to reuse, test, change views (more modular)
- wow - the immutable data structure/paradigm is so handy and concise!
  - reduce just allows us to return some subset of the data easily
  - easy for the flux stores to determine whether changes need to be emitted via just the
    == (shallow equals) operator! if so, then the emit the changes, and the containers
    will receive those changes and create the new view components, forwarding the updated
    store state and actions, etc. as props to the new UI component
- push to your own repo on github, and just make sure when the notification for compare
  and pull request pops up, that you just make sure the forked copy is selected (looks
  like for forked projects, even if you route the push to your own copy, it will suggest
  the original project to open the pull request for)


# TODOS
- use strict at top of each module?
  - not needed: when using ES6 modules w/ that import syntax,
    automatically in strict mode in our modules, and thus
    the default this binding for all ES6 modules is undefined
    - though with the note that node modules themselves would
      need it, and their this in the top level is the exports
      object (but perhaps )
- why do I have to refresh? shouldn't it hot reload automatically?