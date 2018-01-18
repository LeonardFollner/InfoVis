import React, {Component} from 'react';
import classnames from "classnames";

//import  from "./";


class DetailSection extends Component {
  render() {

    const className = classnames("details-section-" + this.props.sectionsCount, "details-section");
      return(
        <div className={className} >
          <article>
            <img className="detail-section__image" src={"images/" + this.props.name.toLowerCase() + "/" + this.props.name.toLowerCase() + "-" + this.props.section + ".jpg"} />
            <p><span>{this.props.content}</span></p>
          </article>
        </div>
      );

  }
}

export default DetailSection;
