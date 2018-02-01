import React, {Component} from 'react';
import {connect} from "react-redux";
import {selectors} from "../../Redux";

class DetailSidebar extends Component {
  render() {
    const term = this.props.termInDetailsView;

    const imgURL = "images/" + term.name.toLowerCase() + "/" + term.name.toLowerCase() + ".jpg";

    const style = {
      backgroundImage: "url(" + imgURL + ")"
    };

    return (
      <div className="detail-side-bar">
        <div className="detail-side-bar__image" style={style}/>
        <div className="detail-side-bar__content">
          <h2>{term.name}</h2>
          <p>{term.description}</p>
        </div>
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
