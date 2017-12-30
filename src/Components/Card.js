import React, {Component} from 'react';
import classnames from "classnames";
import {actions} from "../Redux";
import {connect} from "react-redux";

class Card extends Component {
  handleDragStart = event => {
    event.dataTransfer.setData("text/plain", this.props.term.id);
    this.props.toggleCardIsBeingDragged(this.props.term.targetRegion);
  };

  handleDragEnd = () => {
    this.props.cardDropped();
  };

  render() {
    const className = classnames("card", {"card--isBeingDragged": this.props.isDragging}, {"card--isIddle": !this.props.isDragging && !this.props.didDrop});

    return (
      <div className={className} draggable={true} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
        Drag me to {this.props.term.targetRegion}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleCardIsBeingDragged: targetRegion => dispatch(actions.UI.Cards.cardIsBeingDragged(targetRegion)),
    cardDropped: () => dispatch(actions.UI.Cards.cardDropped())
  }
};

// Export the wrapped version
export default connect(null, mapDispatchToProps)(Card);
