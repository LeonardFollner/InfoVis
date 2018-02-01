import React, {Component} from 'react';
import classnames from "classnames";
import {connect} from "react-redux";
import {selectors} from "../../Redux";

class TaskBar extends Component {
  render() {
    const className = classnames("taskbar", {"taskbar--hidden": this.props.cardsOnMap.length !== 0});

    return (
      <div className={className}>
        Ordne die Begriffe nach ihrem Ursprung in den europäischen oder arabischen Sprachraum ein.
      </div>
    );
  }
}

const mapStateToProps = () => {
  return (state) => {
    return {
      cardsOnMap: selectors.Data.terms.cardsOnMap(state)
    }
  }
};

export default connect(mapStateToProps)(TaskBar);
