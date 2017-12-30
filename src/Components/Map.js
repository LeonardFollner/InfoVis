import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl'

import CustomMarker from "./CustomMarker";
import {selectors} from "../Redux";
import {connect} from "react-redux";

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbmFyZC1mb2xsbmVyIiwiYSI6ImNqOXp5cnNwODh1MTkycWxnZHJnbnk2Z2IifQ.qFUBQPX9proV_Bj0mvdk2A';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 27.8770,
      lat: 41.7667,
      zoom: 3.25
    };
  }

  componentDidMount() {
    // Container to put React generated content in, not added to DOM
    this.tooltipContainer = document.createElement('div');

    const {lng, lat, zoom} = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    this.map.scrollZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.dragPan.disable();
  }

  generateCustomMarker() {
    ReactDOM.render(
      React.createElement(
        CustomMarker, {
          targetRegion: 'test'
        }
      ),
      this.tooltipContainer
    );
  }

  render() {
    const allowDrop = event => {
      event.preventDefault();
    };

    const drop = event => {
      const mouseX = event.screenX;
      const mouseY = event.screenY;
      const {x, y} = this.mapContainer.getBoundingClientRect();
      const mouseRelativeX = mouseX - x;
      const mouseRelativeY = mouseY - y;

      const coordinates = this.map.unproject([mouseRelativeX, mouseRelativeY]);

      this.generateCustomMarker();

      new mapboxgl.Marker(this.tooltipContainer)
        .setLngLat([
          coordinates.lng,
          coordinates.lat
        ])
        .addTo(this.map);
    };

    return (
      <div ref={el => this.mapContainer = el} className='map absolute top right left bottom' onDragOver={allowDrop}
           onDrop={drop}/>
    );
  }
}

const mapStateToProps = () => {
  return (state,) => {
    return {
      cardsInRegion: selectors.Data.terms.cardsOnMap(state)
    }
  }
};

export default connect(mapStateToProps)(Map);
