import React, {Component} from 'react';
import classnames from "classnames";
import {actions} from "../../Redux/index";
import {connect} from "react-redux";

class Card extends Component {
  // copied and modified from mobile-drag-drop
  prepareNodeCopyAsDragImage = (srcNode, dstNode) => {

    // Is this node an element?
    if (srcNode.nodeType === 1) {

      // Clone the style
      const cs = getComputedStyle(srcNode);
      for (let i = 0; i < cs.length; i++) {
        const csName = cs[i];
        switch (csName) {
          case "width":
          case "height":
            dstNode.style.setProperty(csName, "135px", cs.getPropertyPriority(csName));
            break;
          case "left":
          case "right":
          case "top":
          case "bottom":
            dstNode.style.setProperty(csName, "235px", cs.getPropertyPriority(csName));
            break;
          default:
            dstNode.style.setProperty(csName, cs.getPropertyValue(csName), cs.getPropertyPriority(csName));
        }
      }
      dstNode.style.setProperty("border-radius", "50%");

      // no interaction with the drag image, pls! this is also important to make the drag image transparent for hit-testing
      // hit testing is done in the drag and drop iteration to find the element the user currently is hovering over while dragging.
      // if pointer-events is not none or a browser does behave in an unexpected way than the hit test transparency on the drag image
      // will break
      dstNode.style.pointerEvents = "none";

      // Remove any potential conflict attributes
      dstNode.removeAttribute("id");
      dstNode.removeAttribute("class");
      dstNode.removeAttribute("draggable");
    }

    // Remove all children
    if (srcNode.hasChildNodes()) {
      dstNode.innerHTML = '';
    }
  };

  createDragImage = (sourceNode) => {

    const dragImage = sourceNode.cloneNode(true);

    // this removes any id's and stuff that could interfere with drag and drop
    this.prepareNodeCopyAsDragImage(sourceNode, dragImage);

    document.body.appendChild(dragImage);

    return dragImage;
  };

  handleDragStart = event => {
    event.dataTransfer.setData("text/plain", this.props.term.id.toString());
    this.setState({isBeingDragged: true});
    event.dataTransfer.setDragImage(this.createDragImage(this.elem), 135 / 2, 135 / 2);
    this.props.toggleCardIsBeingDragged(this.props.term.targetRegion);
  };
  handleDragEnd = () => {
    this.setState({isBeingDragged: false});
    this.props.cardDropped();
  };

  constructor(props) {
    super(props);
    this.state = {
      isBeingDragged: false
    };
  }

  // dirty workaround: dragEnd-Handler is not called on successful unmount because component is unmounted too early (?)
  componentWillUnmount() {
    if (this.state.isBeingDragged) {
      this.handleDragEnd();
    }
  }

  render() {
    const className = classnames(
      "card",
      {"card--isBeingDragged": this.state.isBeingDragged},
      {"card--isIdle": !this.state.isBeingDragged}
    );

    const imgURL = "images/" + this.props.term.name.toLowerCase() + "/" + this.props.term.name.toLowerCase() + ".jpg";

    const style = {
      backgroundImage: 'url(' + imgURL + ')'
    };

    return (
      <div className={className} ref={elem => this.elem = elem} draggable={true} onDragStart={this.handleDragStart}
           onDragEnd={this.handleDragEnd}
           style={style}>
        <h2>{this.props.term.name}</h2>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleCardIsBeingDragged: targetRegion => dispatch(actions.UI.Cards.cardIsBeingDragged(targetRegion)),
    cardDropped: () => dispatch(actions.UI.Cards.cardDropped())
  }
};

// Export the wrapped version
export default connect(null, mapDispatchToProps)(Card);
