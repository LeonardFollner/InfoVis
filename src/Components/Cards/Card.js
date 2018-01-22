import React, {Component} from 'react';
import classnames from "classnames";
import {actions} from "../../Redux/index";
import {connect} from "react-redux";

class Card extends Component {
  handleDragStart = event => {
    event.dataTransfer.setData("text/plain", this.props.term.id.toString());
    this.props.toggleCardIsBeingDragged(this.props.term.targetRegion);
  };

  handleDragEnd = () => {
    this.props.cardDropped();
  };

  render() {
    const className = classnames("card", {"card--isBeingDragged": this.props.isDragging}, {"card--isIdle": !this.props.isDragging && !this.props.didDrop});

    const imgURL = "images/" + this.props.term.name.toLowerCase() + "/" + this.props.term.name.toLowerCase() + ".jpg";

    const style = {
      backgroundImage: 'url(' + imgURL + ')'
    };

    return (
      <div className={className} draggable={true} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}
           style={style}>
        <h2><span>{this.props.term.name}</span></h2>
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
