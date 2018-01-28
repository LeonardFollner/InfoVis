import React, {Component} from 'react';

import {selectors} from "../../Redux/index";
import {connect} from "react-redux";

import DetailSection from "./DetailSection";
import DetailMap from "./DetailMap";

class DetailMain extends Component {
  handleSectionOnClick = (index) => {
    return () => {
      this.setState({
        clickedSection: index
      });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      clickedSection: 0
    }
  };

  renderSections(term) {
    const details = term.details;
    const changes = details.changes;
    return changes.map((currentValue, index) => {
      return (
        <DetailSection name={term.name}
                       key={index}
                       section={index}
                       sectionsCount={changes.length}
                       content={currentValue}
                       isExpanded={this.state.clickedSection === index}
                       isCollapsed={this.state.clickedSection !== index && this.state.clickedSection !== null}
                       onClick={this.handleSectionOnClick}/>
      );
    });
  }

  renderMap(term) {
    const details = term.details;
    return <DetailMap changes={details.changes}/>
  }

  render() {
    const term = this.props.termInDetailsView;
    const details = term.details;

    return (
      <div className="detail-main">
        {details.type === 'sections' ? this.renderSections(term) : this.renderMap(term)}
      </div>
    )
  }
}

const mapStateToProps = () => {
  return state => {
    return {
      termInDetailsView: selectors.UI.DetailsView.termInDetailsView(state)
    }
  }

};

export default connect(mapStateToProps, null)(DetailMain);
