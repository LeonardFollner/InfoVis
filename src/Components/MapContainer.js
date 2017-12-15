import React, {Component} from 'react';

import Region from "./Region";
import Map from "./Map";

class MapContainer extends Component {
  render() {
    return (
      <div className="map-container">
        <Map/>
        <Region label="EUROPE"/>
        <Region label="ARAB"/>
      </div>
    );
  }
}

export default MapContainer;
