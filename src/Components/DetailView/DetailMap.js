/* eslint-disable */
import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

import CustomLocationMarker from "./CustomLocationMarker";
import {selectors} from "../../Redux";
import {connect} from "react-redux";
import {createMap} from "../Map/Map";

class DetailMap extends Component {
  componentDidMount() {
    this.map = createMap(this.mapContainer);

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
