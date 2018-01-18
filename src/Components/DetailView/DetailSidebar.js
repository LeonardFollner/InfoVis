import React, {Component} from 'react';
import {connect} from "react-redux";
import {selectors} from "../../Redux";
import SideBar from "../SideBar";

class DetailSidebar extends Component {
  render() {

    const term = this.props.termInDetailsView;
    return (

      <div className="detail-side-bar side-bar">
        <h1>{term.name} </h1>
        <p>{term.description}</p>
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

export default connect(mapStateToProps, null)(DetailSidebar);
