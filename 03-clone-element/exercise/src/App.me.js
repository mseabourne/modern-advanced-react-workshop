import React, { Component } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

class RadioGroup extends Component {
  state = {
    activeItemValue: this.props.defaultItem
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        isActive: this.state.activeItemValue === child.props.value,
        onSelectItem: (itemValue) => {
          console.log('new value:', itemValue);
          this.setState({activeItemValue: itemValue});
        }
      });
    });
    return (
      <fieldset className="radio-group">
        <legend>{this.props.legend}</legend>
        {children}
      </fieldset>
    );
  }
}

class RadioButton extends Component {
  render() {
    const { isActive, onSelectItem } = this.props;
    const className = "radio-button " + (isActive ? "active" : "");
    return <button
      className={className}
      onClick={() => { onSelectItem(this.props.value) } }>{this.props.children}</button>;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup defaultItem="pause" legend="Radio Group">
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
    );
  }
}

export default App;
