import React, {Component} from 'react';
import classnames from "classnames";
import {actions} from "../../Redux/index";
import {connect} from "react-redux";
import {polyfillActive} from "../../index";

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

    this.dragImage = document.body.appendChild(dragImage);

    return dragImage;
  };

  handleDragEnd = event => {
    this.setState({isBeingDragged: false});
    // event === undefined, if card dropped correctly
    // function is then called by componentWillUnmount with no event
    if (!polyfillActive && event !== undefined) {
      this.applyDragImageSnapback(this.elem, this.dragImage, event);
    }
    this.props.cardDropped();
  };

  translateDragImage(dragImage, pnt, event) {
    let x = pnt.x - event.clientX + 135 / 2;
    let y = pnt.y - event.clientY + 135 / 2;
    const translate = "translate3d(" + x + "px," + y + "px, 0)";
    dragImage.style.setProperty("top", event.clientY - 135 / 2 + "px");
    dragImage.style.setProperty("left", event.clientX - 135 / 2 + "px");
    dragImage.style.setProperty("z-index", 3785);
    dragImage.style.setProperty("transform", translate);
    const csDragImage = getComputedStyle(dragImage);
    const durationInS = parseFloat(csDragImage.transitionDuration);
    setTimeout(() => {
      this.dragImage.parentNode.removeChild(this.dragImage);
      dragImage.style.setProperty("display", "none");
    }, durationInS * 1000);
  }

  handleDragStart = event => {
    event.dataTransfer.setData("text/plain", this.props.term.id.toString());
    this.setState({isBeingDragged: true});
    event.dataTransfer.setDragImage(this.createDragImage(this.elem), 135 / 2, 135 / 2);
    this.props.toggleCardIsBeingDragged(this.props.term.targetRegion);
  };

  applyDragImageSnapback(sourceEl, dragImage, event) {
    const cs = getComputedStyle(sourceEl);
    dragImage.classList.add("dnd-poly-snapback");
    const rect = sourceEl.getBoundingClientRect();
    const pnt = {
      x: rect.left,
      y: rect.top
    };
    pnt.x += (document.body.scrollLeft || document.documentElement.scrollLeft);
    pnt.y += (document.body.scrollTop || document.documentElement.scrollTop);
    pnt.x -= parseInt(cs.marginLeft, 10);
    pnt.y -= parseInt(cs.marginTop, 10);
    this.translateDragImage(dragImage, pnt, event);
  }

  constructor(props) {
    super(props);
    this.state = {
      isBeingDragged: false
    };
  }

  // needed if dropped right
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
        // needed if dropped wrong
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
