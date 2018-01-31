import React, {PureComponent} from 'react';
import {connect} from "react-redux";

import {actions, selectors} from "../Redux";
import SideBar from "./SideBar";
import MainContainer from "./MainContainer";
import ExitButton from "./ExitButton";
import MobileWarning from "./MobileWarning";
import {minimumDeviceWidthNeeded, mobileWarningMayBeIgnored} from "../settings";

class Prototyp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ignoreMobileWarning: false
    }
  }

  handleExitWarning() {
    return () => {
      if (mobileWarningMayBeIgnored) {
        this.setState({
          ignoreMobileWarning: true
        });
      }
    };
  }

  render() {
    return (
      <div className="prototyp">
        {window.innerWidth < minimumDeviceWidthNeeded && !this.state.ignoreMobileWarning ?
          <MobileWarning onExitButtonClick={this.handleExitWarning()}/> : ''}
        {this.props.isDetailsViewVisible ? <ExitButton onClick={this.props.exitDetailsView}/> : ''}
        <MainContainer detailsView={this.props.isDetailsViewVisible}/>
        <SideBar detailsView={this.props.isDetailsViewVisible}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDetailsViewVisible: selectors.UI.DetailsView.isDetailsViewVisible(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    exitDetailsView: () => dispatch(actions.UI.DetailsView.exitDetailsView()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Prototyp);
