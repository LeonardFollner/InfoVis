import React, {Component} from 'react';


import Map from "./Map/Map";
import TaskBar from "./Map/TaskBar";

class MapMain extends Component {
  render() {
    return (
      <div className="map-main">
        <TaskBar/>
        <Map/>
      </div>
    );

  }
}

export default  MapMain;
