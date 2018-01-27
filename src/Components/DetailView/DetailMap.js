/* eslint-disable */
import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

import CustomLocationMarker from "./CustomLocationMarker";
import {selectors} from "../../Redux";
import {connect} from "react-redux";

L.mapbox.accessToken = 'pk.eyJ1IjoibGVvbmFyZC1mb2xsbmVyIiwiYSI6ImNqOXp5cnNwODh1MTkycWxnZHJnbnk2Z2IifQ.qFUBQPX9proV_Bj0mvdk2A';

class DetailMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 28,
      lat: 41,
      zoom: 4
    };
  }

  componentDidMount() {
    const {lng, lat, zoom} = this.state;

    this.map = L.mapbox.map(
      this.mapContainer,
      'mapbox.streets',
      {
        center: [lat, lng],
        zoom: zoom,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        closePopupOnClick: false
      }
    );

    const linePoints = [];

    this.props.changes.forEach(step => {
      const iconHTML = ReactDOMServer.renderToStaticMarkup(<CustomLocationMarker location={step}/>);
      const markerIcon = L.divIcon({
        html: iconHTML,
        className: 'classname-to-prevent-default-leaflet-rendering',
        iconAnchor: [-20, 20]
      });

      let locationObject;
      this.props.locations.forEach(location => {
        if (location.name.toLowerCase() === step.location.toLowerCase()) {
          locationObject = location;
        }
      });

      if (locationObject) {
        linePoints.push(locationObject.coordinates);
        L.marker(locationObject.coordinates, {icon: markerIcon}).addTo(this.map);
      }
    });

    L.polyline(linePoints, {
      interactive: false,
      className: "map-line"
    }).addTo(this.map);
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className='map absolute top right left bottom'/>
    );
  }
}

const mapStateToProps = () => {
  return (state) => {
    return {
      locations: selectors.Data.locations.allLocations(state),
    }
  }
};

export default connect(mapStateToProps)(DetailMap);
