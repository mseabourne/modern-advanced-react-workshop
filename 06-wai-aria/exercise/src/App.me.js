/*

Follow the WAI ARIA Radio Group example at:
https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html

- Turn the span into a button to get keyboard and focus events
- Use tabIndex to allow only the active button to be tabbable
- Use left/right arrows to select the next/previous radio button
  - Tip: you can figure out the next value with React.Children.forEach(fn),
    or React.Children.toArray(children).reduce(fn)
- Move the focus in cDU to the newly selected item
  - Tip: do it in RadioOption not RadioGroup
  - Tip: you'll need a ref
- Add the aria attributes
  - radiogroup
  - radio
  - aria-checked
  - aria-label on the icons

*/
import React, { Component } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

function findNextItemIndex(forward, index, count) {
  if (forward) {
    return (index + 1) % count;
  }
  return (index - 1 + count) % count;
}

function findNextValue(children, currentValue) {
  return React.Children.toArray(children).reduce(
    (nextValue, child, index, array) => {
      if (child.props.value === currentValue) {
        let nextIndex = index === array.length - 1 ? 0 : index + 1;
        return array[nextIndex].props.value;
      }
      return nextValue;
    },
    null
  );
}

function findPrevValue(children, currentValue) {
  return React.Children.toArray(children).reduce(
    (nextValue, child, index, array) => {
      if (child.props.value === currentValue) {
        let nextIndex = index === 0 ? array.length - 1 : index - 1;
        return array[nextIndex].props.value;
      }
      return nextValue;
    },
    null
  );
}

class RadioGroup extends Component {
  state = {
    value: this.props.defaultValue,
  };

  componentDidMount() {
    React.Children.forEach(this.props.children, (child, index) => {
      if (child.props.value === this.state.value) {
        this.setState({ activeIndex: index });
      }
    });
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        isActive: this.state.value === child.props.value,
        onSelect: () => this.setState({ value: child.props.value })
      });
    });
    return (
      <fieldset
        className="radio-group"
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            this.setState({
              value: findPrevValue(this.props.children, this.state.value)
              // activeIndex: findNextItemIndex(true, this.state.activeIndex, React.Children.count(this.props.children))
            });
          } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            this.setState({
              value: findNextValue(this.props.children, this.state.value)
              // activeIndex: findNextItemIndex(false, this.state.activeIndex, React.Children.count(this.props.children))
            });
          }
        }}>
        <legend>{this.props.legend}</legend>
        {children}
      </fieldset>
    );
  }
}

class RadioButton extends Component {
  render() {
    const { isActive, onSelect } = this.props;
    const className = "radio-button " + (isActive ? "active" : "");
    return (
      <button className={className} onClick={onSelect} tabIndex={ isActive ? 0 : -1 }>
        {this.props.children}
      </button>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <RadioGroup defaultValue="pause" legend="Radio Group 1">
            <RadioButton value="back">
              <FaBackward />
            </RadioButton>
            <RadioButton value="play">
              <FaPlay />
            </RadioButton>
            <RadioButton value="pause">
              <FaPause />
            </RadioButton>
            <RadioButton value="forward">
              <FaForward />
            </RadioButton>
          </RadioGroup>
        </div>
        <div>
        <RadioGroup defaultValue="back" legend="Radio Group 2">
          <RadioButton value="back">
            <FaBackward />
          </RadioButton>
          <RadioButton value="play">
            <FaPlay />
          </RadioButton>
          <RadioButton value="pause">
            <FaPause />
          </RadioButton>
          <RadioButton value="forward">
            <FaForward />
          </RadioButton>
        </RadioGroup>
      </div>
      </div>
    );
  }
}

export default App;
