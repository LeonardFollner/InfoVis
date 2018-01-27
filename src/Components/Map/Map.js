/* eslint-disable */
import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

import CustomMarker from "./CustomMarker";
import {actions, selectors} from "../../Redux/index";
import {connect} from "react-redux";
import {mapOverlayColorArab, mapOverlayColorEurope, mapOverlayTransparency} from "../../settings";
import {TargetRegions} from "../../constants";

L.mapbox.accessToken = 'pk.eyJ1IjoibGVvbmFyZC1mb2xsbmVyIiwiYSI6ImNqOXp5cnNwODh1MTkycWxnZHJnbnk2Z2IifQ.qFUBQPX9proV_Bj0mvdk2A';

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

  constructor(props) {
    super(props);
    this.state = {
      lng: 28,
      lat: 41,
      zoom: 4.5
    };
  }

  dragEnterHandler = e => {
    e.preventDefault();
  };

  componentDidUpdate() {
    // remove all old markers
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.markers = [];

    // add markers for terms on map
    this.props.cardsOnMap.forEach(term => {
      const iconHTML = ReactDOMServer.renderToStaticMarkup(<CustomMarker term={term}
                                                                         handleOnClick={this.props.handleMarkerOnClick}/>);
      const markerIcon = L.divIcon({html: iconHTML});

      this.markers.push(L.marker(term.coordinatesOnMap, {icon: markerIcon}));
    });

    this.markers.forEach(marker => {
      marker.on('click', this.props.handleMarkerOnClick);
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
    this.markers = [];
    this.polygons = [];

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

    L.polyline([[0.0, 0.0], [53.0, 13.0]], {color: 'red'}).addTo(this.map);
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className='map absolute top right left bottom' onDragOver={this.allowDrop}
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

const mapDispatchToProps = dispatch => {
  return {
    toggleCardIsBeingDragged: () => dispatch(actions.UI.Cards.toggleCardIsBeingDragged()),
    cardDroppedRight: (id, lngLat) => {
      dispatch(actions.Data.terms.cardDroppedRight(id, lngLat));
    },
    handleMarkerOnClick: id => dispatch(actions.UI.DetailsView.markerClicked(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
