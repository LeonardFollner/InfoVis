import React, {Component} from 'react';

import DetailSidebar from "./DetailSidebar";
import CardContainer from "./CardContainer";

class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        {this.props.detailsView ? <DetailSidebar/> : <CardContainer/>}
      </div>
    );
  }
}

export default SideBar;

