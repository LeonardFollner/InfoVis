import React, {Component} from 'react';
import classnames from "classnames";
import {actions} from "../Redux";
import {connect} from "react-redux";

class Card extends Component {
  handleDragStart = event => {
    event.dataTransfer.setData("text", this.props.term.id);
    this.props.toggleCardIsBeingDragged();
  };

  render() {
    const className = classnames("card", {"card--isBeingDragged": this.props.isDragging}, {"card--isIddle": !this.props.isDragging && !this.props.didDrop});

    return (
      <div className={className} draggable={true} onDragStart={this.handleDragStart}>
        Drag me to {this.props.term.targetRegion}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleCardIsBeingDragged: () => dispatch(actions.UI.Cards.toggleCardIsBeingDragged())
  }
};

// Export the wrapped version
export default connect(null, mapDispatchToProps)(Card);
