import React, {PureComponent} from 'react';
import {DragDropContext} from 'react-dnd';
import {connect} from "react-redux";
import HTML5Backend from 'react-dnd-html5-backend';

import {selectors} from "../Redux";
import SideBar from "./SideBar";
import MainContainer from "./MainContainer";
import ExitButton from "./DetailView/ExitButton";

class Prototyp extends PureComponent {
  render() {
    return (
      <div className="prototyp">
        {this.props.isDetailsViewVisible ? <ExitButton/> : ''}
        <MainContainer detailsView={this.props.isDetailsViewVisible}/>
        <SideBar detailsView={this.props.isDetailsViewVisible}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDetailsViewVisible: selectors.UI.DetailsView.isDetailsViewVisible(state)
  }
};

export default connect(mapStateToProps, null)(DragDropContext(HTML5Backend)(Prototyp));
