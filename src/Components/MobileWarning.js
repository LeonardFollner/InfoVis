import React, {Component} from 'react';
import classnames from "classnames";

class MobileWarning extends Component {
  render() {
    const className = classnames("mobile-warning");
    return <div className={className}>Diese Anwendung ist nicht für eine mobile Nutzung optimiert. Bitte benutz ein
      Gerät mit einem größeren Display.</div>
  }
}

export default MobileWarning;
