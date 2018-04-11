import React, {Component} from 'react';

import Icon from "./Icon";

class ExitButton extends Component {
  render() {
    return <Icon onClick={this.props.onClick} type="fa-times-circle" size="large" className="exit-button"/>
  }
}

export default ExitButton;
