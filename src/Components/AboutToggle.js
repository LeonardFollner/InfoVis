import React, {Component} from 'react';
import classnames from "classnames";
import {actions} from "../Redux";
import {connect} from "react-redux";

class AboutToggle extends Component {
  render() {
    const className = classnames("about-toggle");
    return (
      <div className={className} onClick={this.props.toggleAboutPage}>
        Über dieses Projekt
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAboutPage: () => dispatch(actions.UI.About.toggleAboutPage())
  }
};

export default connect(null, mapDispatchToProps)(AboutToggle);
