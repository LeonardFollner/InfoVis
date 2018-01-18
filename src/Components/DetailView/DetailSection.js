import React, {Component} from 'react';
import classnames from "classnames";

//import  from "./";


class DetailSection extends Component {
  render() {

    const className = classnames("details-section-" + this.props.section, "details-section");
      return(
        <div className={className} >
          <article>

            <p>{this.props.content}</p>
          </article>
        </div>
      );

  }
}

export default DetailSection;
