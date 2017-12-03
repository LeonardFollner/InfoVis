import React, {Component} from 'react';

import Region from "./Region";
import Map from "./Map";

class MapContainer extends Component {
  render() {
    return (
      <div className="map-container">
        <Map/>
        <Region label="Europe"/>
        <Region label="Arab"/>
      </div>
    );
  }
}

export default MapContainer;
