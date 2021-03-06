import React, {Component} from 'react';
import classnames from "classnames";
import * as Hammer from 'hammerjs';
import {swipeGestures} from "../../settings";

class DetailSection extends Component {
  componentDidUpdate() {
    if (this.props.isExpanded) {
      this.elem.className += " details-section--expanded";
      if (swipeGestures) {
        const hammer = Hammer(this.elem);
        hammer.on('pan', function (event) {
          if (event.direction === 2) { // left
            this.props.onClick(this.props.section + 1)();
          } else if (event.direction === 4) { // right
            this.props.onClick(this.props.section - 1)();
          }
        }.bind(this));
      }
    } else {
      this.elem.className = "details-section details-section-" + this.props.sectionsCount;
      if (this.props.isCollapsed) {
        this.elem.className += ' details-section--collapsed'
      }
    }
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {

    const imgURL = "images/" + this.props.name.toLowerCase() + "/" + this.props.name.toLowerCase() + "-" + this.props.section + ".jpg";

    const style = {
      backgroundImage: "url(" + imgURL + ")"
    };

    const className = classnames(
      "details-section",
      "details-section-" + this.props.sectionsCount,
      {'details-section--collapsed': this.props.isCollapsed}
    );

    return (
      <div className={className}
           ref={elem => this.elem = elem}
           style={style}
           onClick={this.props.onClick(this.props.section)}
           onMouseEnter={this.props.onClick(this.props.section)}
           onMouseOver={this.props.onClick(this.props.section)}
           onMouseLeave={this.props.onClick(null)}>
        <h2 className="details-section__teaser">{this.props.content.teaser}</h2>
        <p className="details-section__full-detail">{this.props.content.fullDetail}</p>
      </div>
    );

  }
}

export default DetailSection;
