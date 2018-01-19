import React, {Component} from 'react';
import classnames from "classnames";

class DetailSection extends Component {
  render() {

    const imgURL = "images/" + this.props.name.toLowerCase() + "/" + this.props.name.toLowerCase() + "-" + this.props.section + ".jpg";

    const style = {
      backgroundImage: "url(" + imgURL + ")"
    };

    const className = classnames(
      "details-section",
      "details-section-" + this.props.sectionsCount,
      {'details-section--active': this.props.isActive}
    );

      return(
        <div className={className} style={style} onClick={this.props.onClick(this.props.section)}>
          <article>
            <p><span>{this.props.content}</span></p>
          </article>
        </div>
      );

  }
}

export default DetailSection;
