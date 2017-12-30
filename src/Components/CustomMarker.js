import React, {Component} from 'react';
import classnames from "classnames";

class CustomMarker extends Component {
  render() {
    const className = classnames("card", {"card--isBeingDragged": this.props.isDragging}, {"card--isIddle": !this.props.isDragging && !this.props.didDrop});

    return (
      <div className={className}>
        Drag me to {this.props.targetRegion}
      </div>
    );
  }
}

export default CustomMarker;
