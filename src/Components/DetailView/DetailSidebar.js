import React, {Component} from 'react';
import {connect} from "react-redux";
import {selectors} from "../../Redux";

class DetailSidebar extends Component {
  render() {

    const term = this.props.termInDetailsView;
    return (

      <div className="detail-side-bar">
        <img className="detail-side-bar__image"
             src={"images/" + term.name.toLowerCase() + "/" + term.name.toLowerCase() + ".jpg"} alt={term.name}/>

        <h2>{term.name}</h2>
        <p>{term.description}</p>
      </div>
    );
  }
}


const mapStateToProps = () => {
  return state => {
    return {
      termInDetailsView: selectors.UI.DetailsView.termInDetailsView(state)
    }
  }

};

export default connect(mapStateToProps, null)(DetailSidebar);
