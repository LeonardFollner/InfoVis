import React, {Component} from 'react';
import classnames from "classnames";

import {mobileWarningMayBeIgnored} from "../settings";
import ExitButton from "./ExitButton";

class MobileWarning extends Component {
  render() {
    const className = classnames("mobile-warning");
    return (
      <div>
        {mobileWarningMayBeIgnored ? <ExitButton onClick={this.props.onExitButtonClick}/> : ''}
        <div className={className}>
          Diese Anwendung ist nicht für eine mobile Nutzung optimiert. Bitte benutz ein Gerät mit einem größeren
          Display.
        </div>
      </div>
    )
  }
}

export default MobileWarning;
