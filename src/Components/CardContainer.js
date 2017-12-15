import React, {Component} from 'react';
import Card from "./Card";
import {selectors} from "../Redux";
import {connect} from "react-redux";

class CardContainer extends Component {
  render() {
    return (
      <div className="card-container">
        {this.props.cardsInSidebar.map((term, index) => {
          return <Card targetRegion={term.targetRegion} key={index}/>
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cardsInSidebar: selectors.Data.terms.cardsInSidebar(state)
  }
};

export default connect(mapStateToProps, null)(CardContainer);
