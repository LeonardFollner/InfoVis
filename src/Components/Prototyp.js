import React, {PureComponent} from 'react';
import {DragDropContext} from 'react-dnd';
import {connect} from "react-redux";
import HTML5Backend from 'react-dnd-html5-backend';

import SideBar from "./SideBar";
import Map from "./Map";
import {selectors} from "../Redux";


const mapStateToProps = state => {
  return {
    isDetailsViewVisible: selectors.UI.DetailsView.isDetailsViewVisible(state)
  }
};

class Prototyp extends PureComponent {
  render() {
    return (
      <div className="prototyp">
        <Map/>
        <SideBar detailsView={this.props.isDetailsViewVisible}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(DragDropContext(HTML5Backend)(Prototyp));
