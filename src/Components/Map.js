import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl'

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
    const {lng, lat, zoom} = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.scrollZoom.disable();
    map.dragPan.disable();
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className="map absolute top right left bottom"/>
    );
  }
}

export default Map;
