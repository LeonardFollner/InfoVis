import React, {Component} from 'react';
import classnames from "classnames";

//import  from "./";


class DetailSection extends Component {
  render() {

    const className = classnames("details-section-" + this.props.sectionsCount, "details-section");
      return(
        <div className={className} >
          <article>
            <p>{this.props.terms.name}</p>
            <p>We are  {this.props.sectionsCount}</p>
          </article>
        </div>
      );

  }
}

export default DetailSection;
