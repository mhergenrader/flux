# Learnings
- careful about how you import! if you export something as default but then use named syntax for importing, you won't get your item! (undefined)
- only place that should have knowledge of flux is the container, so anything the view needs should be passed down from the container
  - note: view doesn't dispatch actions directly - easier to reuse, test, change views (more modular)

# TODOS
- use strict at top of each module?
  - not needed: when using ES6 modules w/ that import syntax,
    automatically in strict mode in our modules, and thus
    the default this binding for all ES6 modules is undefined
    - though with the note that node modules themselves would
      need it, and their this in the top level is the exports
      object (but perhaps )
- why do I have to refresh? shouldn't it hot reload automatically?