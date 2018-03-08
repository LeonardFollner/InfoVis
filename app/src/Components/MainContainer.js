import React, {Component} from 'react';

import DetailMain from "./DetailView/DetailMain";
import MapMain from "./MapMain";
import AboutToggle from "./AboutToggle";


class MainContainer extends Component {
  render() {
    const className = "main-container";

    if (this.props.detailsView) {
      return (
        <div className={className}>
          <DetailMain/>
        </div>
      );
    } else {
      return (
        <div className={className}>
          <AboutToggle/>
          <MapMain/>
        </div>
      )
    }
  }
}

export default MainContainer;
