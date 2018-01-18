import React, {Component} from 'react';

import DetailSidebar from "./DetailView/DetailSidebar";
import CardContainer from "./Cards/CardContainer";
import {connect} from "react-redux";
import {selectors} from "../Redux";

class SideBar extends Component {
  render() {
    const term = this.props.termInDetailsView;

    return (
      <div className="side-bar">
        {this.props.detailsView ? <DetailSidebar/> : <CardContainer/>}
      </div>
    );
  }
}


export default SideBar;
