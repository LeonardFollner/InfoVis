import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import classnames from "classnames";

import {CardTypes} from "../constants";
import {actions, selectors} from "../Redux";
import {connect} from "react-redux";
import Card from "./Card";


const target = {
  canDrop(props, monitor) {
    return (monitor.getItem().targetRegion === props.label);
  },

  drop(props, monitor) {
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
        {this.props.cardsInRegion.map((term, index) => <Card targetRegion={term.targetRegion} id={term.id}
                                                             key={index}/>)}
      </div>
    );
  }
}

const mapStateToProps = () => {
  const cardsInRegion = selectors.Data.terms.cardsOnMap();
  return (state, props) => {
    return {
      cardsInRegion: cardsInRegion(state, props.label)
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    cardDropped: id => {
      dispatch(actions.Data.terms.cardDropped(id));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(CardTypes.CARD, target, collect)(Region));
