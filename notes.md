# Training Notes

## Introduction
[Github: Reach Modern Advanced React Workshop](https://github.com/reach/modern-advanced-react-workshop)
### Ryan Florence
_Ryan Florence. Ryan is a consultant/trainer who has been creating websites since the early 90's, focusing primarily on the frontend for the past several years. He conceived ReactRouter, which quickly became the most popular 3rd-party library built on React._ [Source](https://www.pluralsight.com/authors/ryan-florence)
- [Twitter](https://twitter.com/ryanflorence)
- [Github](https://github.com/ryanflorence)
- [Medium](https://medium.com/@ryanflorence)
- [Workshops](https://reach.tech/workshops)
- [Reach UI](https://ui.reach.tech/) - Trying to complete by next year
- [React Conf 2018 Keynote](https://github.com/simonccarter/react-conf-videos#react-conf-2018) - 90% Cleaner Code

## 1. Declarative vs Imperative
- Declarative
  - _Declarative programming is a programming paradigm … that expresses the logic of a computation without describing its control flow._ [Source](https://en.wikipedia.org/wiki/Declarative_programming)
  - Set the temp and the car deals with it.  What we want.
- Imperative
  - _Imperative programming is a programming paradigm that uses statements that change a program’s state._[Source](https://en.wikipedia.org/wiki/Imperative_programming)
  - Control the knobs to set the temperature. How to get to what we want.

### [Reconcilation](https://reactjs.org/docs/reconciliation.html)
_React provides a declarative API so that you don’t have to worry about exactly what changes on every update. This makes writing applications a lot easier, but it might not be obvious how this is implemented within React. This article explains the choices we made in React’s “diffing” algorithm so that component updates are predictable while being fast enough for high-performance apps._

### [Lecture](./01-imperative-to-declarative/lecture/src/App.start.js)
- Modify the oscillator program to be declarative.

### [Exercise](./01-imperative-to-declarative/exercise/src/App.start.js)
- Add a DocumentTitle component that updates as the number of TODO items changes.


### 2. HOCs and Render Props

#### [Higher Order Components](https://reactjs.org/docs/higher-order-components.html)
_A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature._

_Concretely, *a higher-order component is a function that takes a component and returns a new component.*_

- bummers
    - can’t change inputs
    - can’t be conditional
    - chaining HOCs can be confusing because of implicit dependencies
    - name clashes
    - complexity
    - are going to go away once Hooks become active
- benefits
    - use data in lifecycles
    - easier to test

#### [RenderProps](https://reactjs.org/docs/render-props.html)
_The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function._

_A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic._

- bummers
    - ugly
    - can’t use data in lifecycles easily
- benefits
    - you can make HOCs out of them
    - very  composable

#### HOC vs Render Props Analogy
- HOC - static composition
  - hard chocolate shell ice cream
- Render props - dynamic composition
  - bowl of ice cream with tang sprinkles

### [Lecture](./03-clone-element/lecture/src/App.start.js)
- Tab control with clone element and to support selecting active tab.

### [Exercise](./03-clone-element/exercise/src/App.start.js)
- Radio button group that prevents two buttons from being clicked at once.


## 4. [Context](https://reactjs.org/docs/context.html)
_Context provides a way to pass data through the component tree without having to pass props down manually at every level._

_In a typical React application, data is passed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree._

- break up larger components into smaller pieces for robustness
- cloning using React.Children.map allows extra props to be injected
- make the types optional
- Compound component (eg. Tab Control or Radio Button Group)
  - multiple components that work together
  - put into the same file for simplicity
- Implicit state - state within a compound component that is injected by cloning.
- React team will likely start figuring out how to deal with cloneElement so it’s easier to understand
- If a single child is passed then props.children will reference only that child. - If multiple elements then it will be an array.  Using children.map or React.Children.toArray
- Cloning can break very easily if extra ```<div>```’s are added for something like flexbox
- Let React handle the objection mutation which means passing in `this.state` to the context provider
- ```<TabContext.Provider value={this.state}>```
- This means that you will need to add event handlers to the state
- If mutation  is handled yourself then it can be tricky and prone to bugs
- Set the state within the state.
- ```state = { activeIndex: 1, onSelect: () => this.setState(newindex); }```
- future of context will use the `useContext` hook which greatly simplifies the code

### [Lecture](./04-context/lecture/src/App.start.js)
- Modify the oscillator program to be declarative.

### [Exercise](./04-context/exercise/src/App.start.js)
- Add a DocumentTitle component that updates as the number of TODO items changes.

## 5. [Portals](https://reactjs.org/docs/portals.html)
_Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component._
- Cool scenario of creating a portal for chat to a new browser window. Need to copy stylesheets. [here](https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202)

### [Lecture](./05-portals/lecture/src/App.start.js)
- Dialog example.

### [Exercise](./05-portals/exercise/src/App.start.js)
- Drop down with accessibility improvements.  Tested using screenreader.

## 6. Accessibility
- Covered next week.


## 7. [getSnapshotBeforeUpdate](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)
_`getSnapshotBeforeUpdate()` is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle will be passed as a parameter to `componentDidUpdate()`._

_This use case is not common, but it may occur in UIs like a chat thread that need to handle scroll position in a special way._

- Return value is used as third arguement on componentDidUpdate
- Two use cases
  - scrolling chat
  - setting focus when components are removed

### [Lecture](./07-gsbu/lecture/src/App.start.js)
- Know if the user moved focus during a form submit so it can be saved.

### [Exercise](./07-gsbu/exercise/src/App.start.js)
- Scrolling window pin to the bottom if the user hasn’t scrolled

## 8. [getDerivedStateFromProps](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
_getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing._

_This method exists for rare use cases where the state depends on changes in props over time. For example, it might be handy for implementing a `<Transition>` component that compares its previous and next children to decide which of them to animate in and out._

- no longer use componentWillReceiveProps since it causes problems with suspense
- componentDidMount can be used, although may  cause an extra render when state is being updated
- can pass in “key” to component to reset the state of a component
-  another option is  to use getDerivedStateFromProps
   - returns the new state based on a change in props
   - the state is merged so not all items in the state will be overridden
- _excercise skipped to move to suspense_

### [Lecture](./08-gdsfp/lecture/src/App.start.js)
- Loading contacts.

### [Exercise](./08-gdsfp/exercise/src/App.start.js)
- Skipped

## 9. [Suspense](https://reactjs.org/docs/code-splitting.html#suspense)
_The simple definition of the suspense feature is that ReactJS can pause any state update until the data been fetched is ready to be rendered. In essence, ReactJS suspends the component tree while waiting for the data to be fetched completely. During the suspension, it goes ahead to handle other high-priority updates._
[Time slicing and the React API](https://blog.pusher.com/time-slice-suspense-api-react-17/)

- React suspense is released
- React cache is still in alpha, hopefully more of a beta by the end of the year
- suspense is all about managing transitions between screens
- originally React router had to live outside of the react app to handle loading data while  the old screen was still displayed
- React router 4 made the shift but resulted in the new screens showing loaders because react suspense wasn’t ready  yet
- use ErrorBoundary around Suspense to catch errors from network requests

### [Lecture](./09-suspense/lecture/src/App.js)
- Demonstrate the ability to load portions of the page and show a spinner for each.  utilizes reach router.

### [Exercise](./09-suspense/exercise/src/App.start.js)
- Loading contact cards.  Loading images as resources.


## Bonus: [Hooks](https://reactjs.org/docs/hooks-intro.html) - RFC
_Hooks are a new feature proposal that lets you use state and other React features without writing a class. They’re currently in React v16.7.0-alpha and being discussed in an open RFC._
- [React Hooks Docs](https://reactjs.org/docs/hooks-intro.html)
- [React Hooks RFC](https://github.com/reactjs/rfcs/blob/hooks-rfc/text/0000-react-hooks.md)
- [Hook a Day](https://usehooks.com/)
- [React Conf 2018 Keynote](https://github.com/ryanflorence/react-conf-2018)
- [React Carousel from keynote](https://90.now.sh/)


## Random Notes
- Reading - [Mixins Considered Harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) by Dan Abramov
- Server Rendering  - Facebook is making server rendering a priority. Currently rendered by PHP.
  - next.js recommended
- Getting the latest version of React
  - `npm install react@next react-dom@next`
- Advice: Don’t use redux-form.  final-form is a rewrite using observables
  - https://github.com/final-form/react-final-form
- Refs
  - can use React.createRef instead of using the ref handler on an element
- [React 16.6.0](https://reactjs.org/blog/2018/10/23/react-v-16-6.html) memo, lazy, contextType
- [React Context and Re-Renders: React Take the Wheel](https://medium.com/@ryanflorence/react-context-and-re-renders-react-take-the-wheel-cd1d20663647) - Article about putting handlers into the state
- Ryan does not like redux
- [react.i18n.next with hooks](https://react.i18next.com/experimental/using-with-hooks)