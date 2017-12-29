import React, {Component} from 'react';

import Region from "./Region";
import Map from "./Map";
import {TargetRegions} from "../constants";

class MapContainer extends Component {
  render() {
    return (
      <div className="map-container">
        <Map/>
        <Region label={TargetRegions.EUROPE}/>
        <Region label={TargetRegions.ARAB}/>
      </div>
    );
  }
}

export default MapContainer;
