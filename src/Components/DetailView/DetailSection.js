import React, {Component} from 'react';
import classnames from "classnames";

//import  from "./";


class DetailSection extends Component {
  render() {

    const className = classnames("details-section-" + this.props.sectionsCount, "details-section");
      return(
        <div className={className} >
          <article>
            <h1>{this.props.name} Hey!</h1>
            <p>Text text text</p>
            <p>We are  {this.props.sectionsCount}</p>
          </article>
        </div>
      );

  }
}

export default DetailSection;
