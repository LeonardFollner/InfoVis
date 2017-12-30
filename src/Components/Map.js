import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl'

import CustomMarker from "./CustomMarker";
import {actions, selectors} from "../Redux";
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

  allowDrop = event => {
    event.preventDefault();
  };
  drop = event => {
    const mouseX = event.screenX;
    const mouseY = event.screenY;
    const {x, y} = this.mapContainer.getBoundingClientRect();
    const mouseRelativeX = mouseX - x;
    const mouseRelativeY = mouseY - y;

    const id = event.dataTransfer.getData("text");
    const lngLat = this.map.unproject([mouseRelativeX, mouseRelativeY]);

    this.props.cardDropped(id, lngLat);
  };

  componentDidMount() {
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

    this.markers = [];
  }

  generateCustomMarker(tooltipContainer) {
    ReactDOM.render(
      React.createElement(
        CustomMarker, {
          targetRegion: 'test'
        }
      ),
      tooltipContainer
    );
  }

  componentDidUpdate() {
    // remove all old markers
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.markers = [];

    // add markers for terms on map
    this.props.cardsOnMap.forEach(term => {
      // Container to put React generated content in, not added to DOM
      const tooltipContainer = document.createElement('div');

      this.generateCustomMarker(tooltipContainer);

      this.markers.push(new mapboxgl.Marker(tooltipContainer)
        .setLngLat([
          term.coordinatesOnMap.lng,
          term.coordinatesOnMap.lat
        ])
        .addTo(this.map));
    });
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className='map absolute top right left bottom' onDragOver={this.allowDrop}
           onDrop={this.drop}/>
    );
  }
}

const mapStateToProps = () => {
  return (state) => {
    return {
      cardsOnMap: selectors.Data.terms.cardsOnMap(state)
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    cardDropped: (id, lngLat) => {
      dispatch(actions.Data.terms.cardDropped(id, lngLat));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
