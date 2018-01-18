import React, {Component} from 'react';

import {selectors} from "../../Redux/index";
import {connect} from "react-redux";

import DetailSection from "./DetailSection";
import ExitButton from "./ExitButton";

class DetailMain extends Component {
  render() {

    const term = this.props.termInDetailsView;

    const changes = ["change1", "change2", "change3", "change4"];
    return(
      <div className="detail-main">
        <ExitButton/>
        {changes.map((currentValue, index) => {
          return (
            <DetailSection name={currentValue} id={currentValue.index} sectionsCount={changes.length} key={index}/>
          );
        })}
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

export default connect(mapStateToProps, null)(DetailMain);
