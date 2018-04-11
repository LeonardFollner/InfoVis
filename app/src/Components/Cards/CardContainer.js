import React, {Component} from 'react';
import Card from "./Card";
import {selectors} from "../../Redux/index";
import {connect} from "react-redux";

class CardContainer extends Component {
  render() {
    return (
      <div className="card-container">
        {this.props.cardsInSidebar.map((term) => {
          return <Card term={term} key={term.name}/>
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
