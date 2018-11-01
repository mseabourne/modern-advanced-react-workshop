import React, { Component } from "react";

class DocumentTitle extends Component {

  render() {
    document.title = `Todos (${this.props.incompleteCount})`;
    return null;
  }
}

export default DocumentTitle;