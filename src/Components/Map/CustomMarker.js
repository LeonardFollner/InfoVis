import React, {Component} from 'react';
import classnames from "classnames";
import {TargetRegions} from "../../constants";

class CustomMarker extends Component {
  handleOnClick = () => {
    this.props.term.targetRegion === TargetRegions.ARAB ? this.props.handleOnClick(this.props.term.id)  : null
  };

  render() {
    const className = classnames("custom-marker");

    const imgURL = "images/" + this.props.term.name.toLowerCase() + "/" + this.props.term.name.toLowerCase() + ".jpg";

    const style = {
      backgroundImage: 'url(' + imgURL + ')'
    };

    return (
      <div className={className} onClick={this.handleOnClick} style={style}/>
    );
  }
}

export default CustomMarker;
