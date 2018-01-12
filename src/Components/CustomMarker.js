import React, {Component} from 'react';
import classnames from "classnames";

class CustomMarker extends Component {
  handleOnClick = () => {
    this.props.handleOnClick(this.props.term.id);
  };

  render() {
    const className = classnames("custom-marker");

    return (
      <div className={className} onClick={this.handleOnClick}>
        Drag me to {this.props.term.targetRegion}
      </div>
    );
  }
}

export default CustomMarker;
