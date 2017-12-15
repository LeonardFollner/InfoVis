import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import classnames from "classnames";

import {CardTypes} from "../constants";
import {actions} from "../Redux";
import {connect} from "react-redux";


const target = {
  canDrop(props, monitor) {
    return (monitor.getItem().targetRegion === props.label);
  },

  drop(props, monitor) {
    console.log("dropped");
    props.cardDropped(monitor.getItem().id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Region extends Component {
  render() {
    const className = classnames("region", {"region--isHovered": this.props.isOver});

    return this.props.connectDropTarget(
      <div className={className}>
        &lt;{this.props.label}&gt;
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cardDropped: id => {
      dispatch(actions.Data.terms.cardDropped(id));
    }
  }
};

export default connect(null, mapDispatchToProps)(DropTarget(CardTypes.CARD, target, collect)(Region));
