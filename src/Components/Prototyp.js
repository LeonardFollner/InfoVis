import React, {PureComponent} from 'react';
import {connect} from "react-redux";

import {selectors} from "../Redux";
import SideBar from "./SideBar";
import MainContainer from "./MainContainer";
import ExitButton from "./DetailView/ExitButton";
import MobileWarning from "./MobileWarning";

class Prototyp extends PureComponent {
  render() {
    return (
      <div className="prototyp">
        {window.innerWidth < 750 ? <MobileWarning/> : ''}
        {this.props.isDetailsViewVisible ? <ExitButton/> : ''}
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

export default connect(mapStateToProps)(Prototyp);
