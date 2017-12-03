import React, {Component} from 'react';

import DetailsView from "./DetailsView";
import CardContainer from "./CardContainer";

class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        {this.props.detailsView ? <DetailsView/> : <CardContainer/>}
      </div>
    );
  }
}

export default SideBar;
