import React, {Component} from 'react';

class DetailMain extends Component {
  render() {

    const term = this.props.termInDetailsView;
    const changes = term.changes;

    return(
      changes.map((currentValue, index) => {
      return (
        <DetailSection name={currentValue} id={currentValue.index} sectionsCount={changes.length} key={index}/>
      );
      }

    ));


  }
}

export default DetailMain;
