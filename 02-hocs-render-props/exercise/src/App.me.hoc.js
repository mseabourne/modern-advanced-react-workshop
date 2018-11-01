import React from "react";
import createMediaListener from "./lib/createMediaListener";
import { Galaxy, Trees, Earth } from "./lib/screens";
import { CSSTransition } from "react-transition-group";

// const media = createMediaListener({
//   big: "(min-width : 1000px)",
//   tiny: "(max-width: 600px)"
// });

const queries =  {
  big: "(min-width : 1000px)",
  tiny: "(max-width: 600px)"
};

let withMedia = (queries) => (Comp) => {
  const media = createMediaListener(queries);

  return class withMedia extends React.Component {
    state = {
      media: media.getState()
    };
    componentDidMount() {
      media.listen(media => this.setState({ media }));
    }

    componentWillUnmount() {
      media.dispose();
    }

    render() {
      return <Comp {...this.props} media={this.state.media} />
    }
  }
};

class App extends React.Component {
  render() {
    const { media } = this.props;

    return (
      <CSSTransition classNames="fade" timeout={300}>
        {media.big ? (
          <Galaxy key="galaxy" />
        ) : media.tiny ? (
          <Trees key="trees" />
        ) : (
          <Earth key="earth" />
        )}
      </CSSTransition>
    );
  }
}

export default withMedia(queries)(App);
