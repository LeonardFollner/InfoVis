import React, {Component} from 'react';
import {connect} from "react-redux";
import {selectors} from "../../Redux";
import SideBar from "../SideBar";

class DetailSidebar extends Component {
  render() {

    const term = this.props.termInDetailsView;
    return (

      <div className="detail-side-bar side-bar">
        <img class="detail-side-bar__image" src={"images/" + term.name.toLowerCase() + "/" + term.name.toLowerCase() + ".jpg" }  />

        <h2><span>{term.name}</span></h2>
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
