import React, {Component} from 'react';
import classnames from "classnames";
import "font-awesome/css/font-awesome.css";

class Icon extends Component {
  render() {
    const classNameOuter = classnames("icon", "icon--" + this.props.size, this.props.className);
    const classNameInner = classnames("fa", this.props.type);
    return (
      <span className={classNameOuter} onClick={this.props.onClick}>
        <i className={classNameInner} aria-hidden="true"/>
      </span>
    )
  }
}


export default Icon;
