import React, {Component} from 'react';
import classnames from "classnames";

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    return {
      id: props.id,
      targetRegion: props.targetRegion
    };
  },

  endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      console.log("did Drop");

    }
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    didDrop: monitor.didDrop()
  };
}

class Card extends Component {
  render() {
    const className = classnames("card", {"card--isBeingDragged": this.props.isDragging}, {"card--isIddle": !this.props.isDragging && !this.props.didDrop});

    return (
      <div className={className} draggable={true}>
        Drag me to {this.props.targetRegion}
      </div>
    );
  }
}

// Export the wrapped version
export default Card;
