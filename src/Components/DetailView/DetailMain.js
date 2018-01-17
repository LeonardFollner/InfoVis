import React, {Component} from 'react';

import DetailSection from "./DetailSection";
import {selectors} from "../../Redux/index";
import {connect} from "react-redux";

class DetailMain extends Component {
  render() {

    const term = this.props.termInDetailsView;

    const changes = ["change1", "change2", "change3", "change4"];
    return(
      changes.map((currentValue, index) => {
      return (
        <DetailSection name={currentValue} id={currentValue.index} sectionsCount={changes.length} key={index}/>
      );
      }

    ));

  }
}

const mapStateToProps = () => {
  return state => {
    return {
      termInDetailsView: selectors.UI.DetailsView.termInDetailsView(state)
    }
  }

};

export default connect(mapStateToProps, null)(DetailMain);
