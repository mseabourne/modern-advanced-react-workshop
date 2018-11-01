import React from "react";

class RenderPropsTemplate extends React.Component {
  state = {

  };

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  componentWillUnmount() {

  }

  render() {
    return this.props.children(this.state);
  }
}

export default RenderPropsTemplate;


// wrap render props as a HOC
let withMedia = queries => Comp => props => (
  <Media query={queries}>
    { media => <Comp media={media} {...props}/> }
  </Media>
)