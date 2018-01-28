/* eslint-disable */
import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

import {actions, selectors} from "../../Redux/index";
import {connect} from "react-redux";
import {mapOverlayColorArab, mapOverlayColorEurope, mapOverlayTransparency} from "../../settings";
import {TargetRegions} from "../../constants";
import L from "leaflet";
import "leaflet/dist/leaflet.css"

import CustomTermMarker from "./CustomTermMarker";

class Map extends Component {
  allowDrop = event => {
    const mouseX = event.screenX;
    const mouseY = event.screenY;
    if (document.elementFromPoint(mouseX, mouseY).classList[0] === this.props.targetRegionOfDraggedCard) {
      event.preventDefault();
    }
  };
  drop = event => {
    const mouseX = event.screenX;
    const mouseY = event.screenY;
    const {x, y} = this.mapContainer.getBoundingClientRect();
    const mouseRelativeX = mouseX - x;
    const mouseRelativeY = mouseY - y;

    const id = event.dataTransfer.getData("text/plain");
    const lngLat = this.map.layerPointToLatLng([mouseRelativeX, mouseRelativeY]);

    this.props.cardDroppedRight(id, lngLat);
  };

  dragEnterHandler = e => {
    e.preventDefault();
  };

  componentDidUpdate() {
    // remove all old markers
    Object.values(this.markers).forEach((marker) => {
      marker.remove();
    });
    this.markers = {};

    // add markers for terms on map
    this.props.cardsOnMap.forEach(term => {
      const iconHTML = ReactDOMServer.renderToStaticMarkup(<CustomTermMarker term={term}/>);
      const markerIcon = L.divIcon({
        html: iconHTML,
        className: 'classname-to-prevent-default-leaflet-rendering',
        iconAnchor: [135 / 2, 135 / 2] //make marker drop directly under cursor, half of css-width
      });

      this.markers[term.id] = (L.marker(term.coordinatesOnMap, {icon: markerIcon}));
    });

    Object.keys(this.markers).forEach(termId => {
      const marker = this.markers[termId];
      marker.on('click', this.props.handleMarkerOnClick(termId));
      marker.addTo(this.map);
    });

    // render region highlights
    this.polygons.map(polygon => {
      polygon.setStyle({fill: this.props.isCardBeingDragged});
      return polygon;
    });
    this.polygons.forEach(polygon => {
      polygon.bringToFront().redraw();
      polygon.addTo(this.map);
    });
  }

  componentDidMount() {
    this.markers = {};
    this.polygons = [];

    this.map = createMap(this.mapContainer);

    const containerWidth = this.mapContainer.offsetWidth;
    const containerHeight = this.mapContainer.offsetHeight;

    const topLeftCorner = this.map.layerPointToLatLng([0, 0]);
    const topRightCorner = this.map.layerPointToLatLng([containerWidth, 0]);
    const bottomLeftCorner = this.map.layerPointToLatLng([0, containerHeight]);
    const bottomRightCorner = this.map.layerPointToLatLng([containerWidth, containerHeight]);

    this.polygons.push(L.polygon([
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner
      ],
      {
        className: TargetRegions.EUROPE,
        fillColor: mapOverlayColorEurope,
        fillOpacity: mapOverlayTransparency,
        fill: false,
        stroke: false
      }));
    this.polygons.push(L.polygon([
        topRightCorner,
        bottomRightCorner,
        bottomLeftCorner
      ],
      {
        className: TargetRegions.ARAB,
        fillColor: mapOverlayColorArab,
        fillOpacity: mapOverlayTransparency,
        fill: false,
        stroke: false
      }
    ));

    this.polygons.forEach(polygon => {
      polygon.addTo(this.map);
    });

    this.forceUpdate();
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className='map' onDragOver={this.allowDrop}
           onDragEnter={this.dragEnterHandler}
           onDrop={this.drop}/>
    );
  }
}

const mapStateToProps = () => {
  return (state) => {
    return {
      cardsOnMap: selectors.Data.terms.cardsOnMap(state),
      isCardBeingDragged: selectors.UI.Cards.isCardBeingDragged(state),
      targetRegionOfDraggedCard: selectors.UI.Cards.targetRegionOfDraggedCard(state)
    }
  }
};

export const createMap = (mapContainer) => {
  const map = L.map(
    mapContainer,
    {
      center: [41, 28],
      zoom: 4.0,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      closePopupOnClick: false,
      zoomControl: false
    }
  );

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/leonard-follner/cjcvwqre20vl02smsgkep9l51/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
      accessToken: 'pk.eyJ1IjoibGVvbmFyZC1mb2xsbmVyIiwiYSI6ImNqOXp5cnNwODh1MTkycWxnZHJnbnk2Z2IifQ.qFUBQPX9proV_Bj0mvdk2A'
    }).addTo(map);

  return map
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCardIsBeingDragged: () => dispatch(actions.UI.Cards.toggleCardIsBeingDragged()),
    cardDroppedRight: (id, lngLat) => {
      dispatch(actions.Data.terms.cardDroppedRight(id, lngLat));
    },
    handleMarkerOnClick: id => {
      return () => dispatch(actions.UI.DetailsView.markerClicked(id));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
