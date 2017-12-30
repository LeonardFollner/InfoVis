import React, {Component} from 'react';
import classnames from "classnames";

class CustomMarker extends Component {
  render() {
    const className = classnames("custom-marker");

    return (
      <div className={className}>
        Drag me to {this.props.term.targetRegion}
      </div>
    );
  }
}

export default CustomMarker;
