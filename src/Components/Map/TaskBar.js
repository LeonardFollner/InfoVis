import React, {Component} from 'react';
import classnames from "classnames";

class TaskBar extends Component {
  render() {
    const className = classnames("taskbar");

    return (
      <div className={className}>
        Ordne die Begriffe nach ihrem Ursprung in den europäischen oder arabischen Sprachraum ein.
      </div>
    );
  }
}

export default TaskBar;
