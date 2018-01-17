import React, {Component} from 'react';
import {connect} from "react-redux";

import Icon from "../Icon";
import {actions} from "../../Redux";

class ExitButton extends Component {
  render() {
    return <Icon onClick={this.props.exitDetailsView} type="fa-times-circle" size="large" className="exit-button"/>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    exitDetailsView: () => dispatch(actions.UI.DetailsView.exitDetailsView()),
  }
};

export default connect(null, mapDispatchToProps)(ExitButton);
