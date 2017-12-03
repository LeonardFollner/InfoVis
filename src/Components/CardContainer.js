import React, {Component} from 'react';

import {TargetRegions} from "../constants";
import Card from "./Card";

class CardContainer extends Component {
  render() {
    return (
      <div className="card-container">
        <Card targetRegion={TargetRegions.EUROPE}/>
        <Card targetRegion={TargetRegions.ARAB}/>
        <Card targetRegion={TargetRegions.EUROPE}/>
        <Card targetRegion={TargetRegions.ARAB}/>
        <Card targetRegion={TargetRegions.EUROPE}/>
      </div>
    );
  }
}

export default CardContainer;
