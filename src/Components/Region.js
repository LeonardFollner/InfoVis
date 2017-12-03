import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import classnames from "classnames";

import {CardTypes} from "../constants";


const target = {
  canDrop(props, monitor) {
    return (monitor.getItem().targetRegion === props.label);
  },

  drop(props, monitor) {
    console.log("dropped");
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

export default DropTarget(CardTypes.CARD, target, collect)(Region);
