/* eslint-disable */
import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

import CustomLocationMarker from "./CustomLocationMarker";
import {actions, selectors} from "../../Redux";
import {connect} from "react-redux";
import {createMap} from "../Map/Map";
import {locationMarkerSize} from "../../settings";

class DetailMap extends Component {
  componentDidMount() {
    this.map = createMap(this.mapContainer);
    this.locationMarkers = [];

    this.forceUpdate();
  }

  componentDidUpdate() {
    const linePoints = [];

    this.locationMarkers.forEach(marker => {
      marker.remove();
    });
    this.locationMarkers = [];

    this.props.changes.forEach(step => {
      const iconHTML = ReactDOMServer.renderToStaticMarkup(<CustomLocationMarker location={step}
                                                                                 isActive={this.props.activeLocationMarker === step.location}/>);
      const markerIcon = L.divIcon({
        html: iconHTML,
        className: 'classname-to-prevent-default-leaflet-rendering',
        iconAnchor: [locationMarkerSize / 2, locationMarkerSize / 2]
      });

      let locationObject;
      this.props.locations.forEach(location => {
        if (location.name.toLowerCase() === step.location.toLowerCase()) {
          locationObject = location;
        }
      });

      if (locationObject) {
        linePoints.push(locationObject.coordinates);
        const marker = L.marker(locationObject.coordinates, {icon: markerIcon})
          .on('click', this.props.handleLocationMarkerOnClick(step.location))
          .on('mouseover', this.props.handleLocationMarkerOnClick(step.location))
          .addTo(this.map);
        this.locationMarkers.push(marker);
      }
    });

    if (this.polyline) {
      this.polyline.remove();
    }
    this.polyline = L.polyline(linePoints, {
      interactive: false,
      className: "map-line"
    }).addTo(this.map);
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el}
           className='map absolute top right left bottom'
           onClick={this.props.handleLocationMarkerOnClick(undefined)}
      />
    );
  }
}

const mapStateToProps = () => {
  return (state) => {
    return {
      locations: selectors.Data.locations.allLocations(state),
      activeLocationMarker: selectors.UI.DetailsView.activeLocationMarker(state)
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleLocationMarkerOnClick: location => {
      return () => dispatch(actions.UI.DetailsView.locationMarkerClicked(location));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMap);
