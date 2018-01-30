import React, {Component} from 'react';
import classnames from "classnames";
import {actions} from "../../Redux/index";
import {connect} from "react-redux";

class Card extends Component {
  handleDragStart = event => {
    event.dataTransfer.setData("text/plain", this.props.term.id.toString());
    this.setState({isBeingDragged: true});
    this.props.toggleCardIsBeingDragged(this.props.term.targetRegion);
  };
  handleDragEnd = () => {
    this.setState({isBeingDragged: false});
    this.props.cardDropped();
  };

  constructor(props) {
    super(props);
    this.state = {
      isBeingDragged: false
    };
  }

  // dirty workaround: dragEnd-Handler is not called on successful unmount because component is unmounted too early (?)
  componentWillUnmount() {
    if (this.state.isBeingDragged) {
      this.handleDragEnd();
    }
  }

  render() {
    const className = classnames(
      "card",
      {"card--isBeingDragged": this.state.isBeingDragged},
      {"card--isIdle": !this.state.isBeingDragged}
    );

    const imgURL = "images/" + this.props.term.name.toLowerCase() + "/" + this.props.term.name.toLowerCase() + ".jpg";

    const style = {
      backgroundImage: 'url(' + imgURL + ')'
    };

    return (
      <div className={className} draggable={true} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}
           style={style}>
        <h2>{this.props.term.name}</h2>
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
