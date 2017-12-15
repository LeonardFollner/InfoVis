import React, {Component} from 'react';

import DetailSection from "./DetailSection";

class DetailMain extends Component {
  render() {

    const changes = ["change1", "change2", "change3", "change4"];
    return(
    changes.map( currentValue => {
      return (
        <DetailSection name={currentValue} id={currentValue.index} sectionsCount={changes.length}/>
      );
      }

    ));

  }
}

export default DetailMain;
