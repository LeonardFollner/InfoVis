import React, {Component} from 'react';

class DetailSidebar extends Component {
  render() {

    const term = this.props.termInDetailsView;
    return (

      <div>
        <p>{this.props.name} </p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default DetailSidebar;
