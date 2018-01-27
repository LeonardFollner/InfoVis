import React, {Component} from 'react';
import classnames from "classnames";

class CustomMarker extends Component {
  render() {
    const className = classnames("custom-marker");

    const imgURL = "images/" + this.props.term.name.toLowerCase() + "/" + this.props.term.name.toLowerCase() + ".jpg";

    const style = {
      backgroundImage: 'url(' + imgURL + ')'
    };

    return (
      <div className={className} style={style}/>
    );
  }
}

export default CustomMarker;
