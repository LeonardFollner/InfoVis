import React, {Component} from 'react';
import classnames from "classnames";

class Card extends Component {
  handleDragStart = event => {
    event.dataTransfer.setData("text", this.props.id);
  };

  render() {
    const className = classnames("card", {"card--isBeingDragged": this.props.isDragging}, {"card--isIddle": !this.props.isDragging && !this.props.didDrop});

    return (
      <div className={className} draggable={true} onDragStart={this.handleDragStart}>
        Drag me to {this.props.targetRegion}
      </div>
    );
  }
}

// Export the wrapped version
export default Card;
