import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl'

import CustomMarker from "./CustomMarker";
import {actions, selectors} from "../Redux";
import {connect} from "react-redux";
import {mapOverlayColorArab, mapOverlayColorEurope, mapOverlayTransparency} from "../settings";
import {TargetRegions} from "../constants";

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
    const mouseX = event.screenX;
    const mouseY = event.screenY;
    const layersUnderCursor = this.map.queryRenderedFeatures([mouseX, mouseY]);

    layersUnderCursor.forEach(feature => {
      if (feature.layer.id === this.props.targetRegionOfDraggedCard) {
        event.preventDefault();
      }
    });
  };

  drop = event => {
    const mouseX = event.screenX;
    const mouseY = event.screenY;
    const {x, y} = this.mapContainer.getBoundingClientRect();
    const mouseRelativeX = mouseX - x;
    const mouseRelativeY = mouseY - y;

    const id = event.dataTransfer.getData("text/plain");
    const lngLat = this.map.unproject([mouseRelativeX, mouseRelativeY]);

    this.props.cardDroppedRight(id, lngLat);
  };

  componentDidMount() {
    this.markers = [];

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

    this.map.on('load', () => {
      const containerWidth = this.mapContainer.offsetWidth;
      const containerHeight = this.mapContainer.offsetHeight;

      const topLeftCorner = this.map.unproject([0, 0]);
      const topRightCorner = this.map.unproject([containerWidth, 0]);
      const bottomLeftCorner = this.map.unproject([0, containerHeight]);
      const bottomRightCorner = this.map.unproject([containerWidth, containerHeight]);

      this.map.addLayer({
        'id': TargetRegions.EUROPE,
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[
                [topLeftCorner.lng, topLeftCorner.lat],
                [topRightCorner.lng, topRightCorner.lat],
                [bottomLeftCorner.lng, bottomLeftCorner.lat],
                [topLeftCorner.lng, topLeftCorner.lat]
              ]]
            }
          }
        },
        'layout': {},
        'paint': {
          'fill-color': mapOverlayColorEurope,
          'fill-opacity': mapOverlayTransparency
        }
      });
      this.map.addLayer({
        'id': TargetRegions.ARAB,
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[
                [topRightCorner.lng, topRightCorner.lat],
                [bottomRightCorner.lng, bottomRightCorner.lat],
                [bottomLeftCorner.lng, bottomLeftCorner.lat],
                [topRightCorner.lng, topRightCorner.lat]
              ]]
            }
          }
        },
        'layout': {},
        'paint': {
          'fill-color': mapOverlayColorArab,
          'fill-opacity': mapOverlayTransparency
        }
      });

      this.map.setLayoutProperty(TargetRegions.EUROPE, 'visibility', 'none');
      this.map.setLayoutProperty(TargetRegions.ARAB, 'visibility', 'none');
    });
  }

  generateCustomMarker(term, tooltipContainer) {
    ReactDOM.render(
      React.createElement(
        CustomMarker, {
          term: term
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

      this.generateCustomMarker(term, tooltipContainer);

      this.markers.push(new mapboxgl.Marker(tooltipContainer)
        .setLngLat([
          term.coordinatesOnMap.lng,
          term.coordinatesOnMap.lat
        ])
        .addTo(this.map));
    });

    // render region highlights
    this.map.setLayoutProperty(TargetRegions.EUROPE, 'visibility', this.props.isCardBeingDragged ? 'visible' : 'none');
    this.map.setLayoutProperty(TargetRegions.ARAB, 'visibility', this.props.isCardBeingDragged ? 'visible' : 'none');
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
