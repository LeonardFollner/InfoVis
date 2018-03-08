import React, {Component} from 'react';
import classnames from "classnames";

class CustomLocationMarker extends Component {
  render() {
    const className = classnames("custom-location-marker", {'custom-location-marker--active': this.props.isActive});

    return (
      <div className={className}>
        <h2>{this.props.location.location}</h2>
        <p>{this.props.location.description}</p>
      </div>
    );
  }
}

export default CustomLocationMarker;
