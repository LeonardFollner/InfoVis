import React, {Component} from 'react';
import classnames from "classnames";
import {TargetRegions} from "../../constants";

class CustomMarker extends Component {
  handleOnClick = () => {
    this.props.term.targetRegion === TargetRegions.ARAB ? this.props.handleOnClick(this.props.term.id)  : null
    //this.props.handleOnClick(this.props.term.id);
  };

  render() {
    const className = classnames("custom-marker");

    return (
      <div className={className} onClick={this.handleOnClick}>
        Drag me to {this.props.term.targetRegion} <br />
        {this.props.term.name}
      </div>
    );
  }
}

export default CustomMarker;
