import React, {Component} from 'react';

import DetailMain from "./DetailView/DetailMain";
import MapMain from "./MapMain";


class MainContainer extends Component {
  render() {
    return (
      <div className="main-container">
        {this.props.detailsView ? <DetailMain/> : <MapMain/>}
      </div>
    );
  }
}

export default MainContainer;
