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
        {this.props.detailsView ? <DetailSidebar name={term.name} description={term.description}/> : <CardContainer/>}
      </div>
    );
  }
}


const mapStateToProps = () => {
  return state => {
    return {
      termInDetailsView: selectors.UI.DetailsView.termInDetailsView(state)
    }
  }

};

export default connect(mapStateToProps, null)(SideBar);

