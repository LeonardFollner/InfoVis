import React, {Component} from 'react';
import classnames from "classnames";

class CustomLocationMarker extends Component {
  render() {
    const className = classnames("custom-location-marker");

    return (
      <div className={className}>
        <h2>{this.props.location.location}</h2>
        {this.props.location.description}
      </div>
    );
  }
}

export default CustomLocationMarker;
