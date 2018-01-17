import React, {Component} from 'react';

import DetailMain from "./DetailView/DetailMain";
import Map from "./Map/Map";

class MainContainer extends Component {
  render() {
    return (
      <div className="main-container">
        {this.props.detailsView ? <DetailMain/> : <Map/>}
      </div>
    );
  }
}

export default MainContainer;
