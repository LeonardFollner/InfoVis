import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import SideBar from "./SideBar";
import MapContainer from "./MapContainer";


class Prototyp extends Component {
  render() {
    return (
      <div className="prototyp">
        <MapContainer/>
        <SideBar detailsView={false}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Prototyp);
