import { Component } from "react";

class DocumentTitle extends Component {
  componentDidMount() {
    document.title = this.props.title;
  }
  componentDidUpdate() {
    document.title = this.props.title;
  }

  render() {
    return null;
  }
}

export default DocumentTitle;

