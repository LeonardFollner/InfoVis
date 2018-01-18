import React, {Component} from 'react';

class DetailSidebar extends Component {
  render() {

    const term = this.props.termInDetailsView;
    return (

      <div className="detail-side-bar side-bar">
        <h1>{this.props.name} </h1>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default DetailSidebar;
