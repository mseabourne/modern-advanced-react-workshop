Brown Bag Notes

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
- Declarative - set the temp and the car deals with it.  What we want.
- Imperative - Control the knobs to set the temperature. How to get to what we want.

### [Lecture](./01-imperative-to-declarative/lecture/src/App.start.js)
- Modify the oscillator program to be declarative.

### [Exercise](./01-imperative-to-declarative/exercise/src/App.start.js)
- Add a DocumentTitle component that updates as the number of TODO items changes.


### 2. HOCs and Render Props

#### HOC vs Render Props Analogy
- HOC - static composition
  - hard chocolate shell icecream
- Render props are dynamic composition
  - bowl of ice cream with tang sprinkles

#### [Higher Order Components](https://reactjs.org/docs/higher-order-components.html)
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
- bummers
    - ugly
    - can’t use data in lifecycles easily
- benefits
    - you can make HOCs out of them
    - very  composable

### [Lecture](./03-clone-element/lecture/src/App.start.js)
- Tab control with clone element and to support selecting active tab.

### [Exercise](./03-clone-element/exercise/src/App.start.js)
- Radio button group that prevents two buttons from being clicked at once.


## 4. [Context](https://reactjs.org/docs/react-api.html#cloneelement)
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
- Return value is used as third arguement on componentDidUpdate
- Two use cases
  - scrolling chat
  - setting focus when components are removed

### [Lecture](./07-gsbu/lecture/src/App.start.js)
- Know if the user moved focus during a form submit so it can be saved.

### [Exercise](./07-gsbu/exercise/src/App.start.js)
- Scrolling window pin to the bottom if the user hasn’t scrolled

## 8. [getDerivedStateFromProps](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
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

## 9. Suspense - React 17
[Time slicing and the React API](https://blog.pusher.com/time-slice-suspense-api-react-17/)
### [Lecture](./09-suspense/lecture/src/App.js)
- Demonstrate the ability to load portions of the page and show a spinner for each.  utilizes reach router.

### [Exercise](./09-suspense/exercise/src/App.start.js)
- Loading contact cards.  Loading images as resources.


## Bonus: Hooks - RFC
- [React Hooks Docs](https://reactjs.org/docs/hooks-intro.html)
- [React Hooks RFC](https://github.com/reactjs/rfcs/blob/hooks-rfc/text/0000-react-hooks.md)
- [Hook a Day](https://usehooks.com/)
- [React Conf 2018 Keynote](https://github.com/ryanflorence/react-conf-2018)
- [React Carousel from keynote](https://90.now.sh/)


## Random Notes
- Reading - Mixins Considered Harmful by Dan Abramov
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