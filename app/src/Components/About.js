import React, {Component} from 'react';
import classnames from "classnames";
import {actions} from "../Redux";
import {connect} from "react-redux";

import ExitButton from "./ExitButton";

class About extends Component {
  render() {
    const className = classnames("about");

    const handleOnBackgroundClick = event => {
      event.stopPropagation();
      this.props.toggleAboutPage();
    };

    return (
      <div className={className} onClick={handleOnBackgroundClick}>
        <div className="about__inner" onClick={event => event.stopPropagation()}>
          <ExitButton onClick={this.props.toggleAboutPage}/>
          <h1>Über dieses Projekt</h1>
          <p>Entwickelt von Anselm Bunsen & Leonard Follner für die SKD im Rahmen des Komplexpraktikum Informationsvisualisierung an der TU Dresden.</p>
          <a href='https://github.com/LeonardFollner/InfoVis/issues/new' target='_blank' rel="noopener noreferrer">Einen
            Fehler melden</a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAboutPage: () => dispatch(actions.UI.About.toggleAboutPage())
  }
};

export default connect(null, mapDispatchToProps)(About);
