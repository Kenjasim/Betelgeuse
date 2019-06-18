import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class CameraStatus extends Component {
  render() {

    let box_classes = 'system-box'
    if (this.props.disabled) {
      box_classes += ' system-disabled'
    } else {
      box_classes += ' system-enabled'
    }

    return(

      <Link to="/ais">
        <div className={box_classes}>
          <div className="system-box-title">
            {this.props.name}:
          </div>
          <div className="system-box-message">
          </div>
        </div>
      </Link>

    )
  }
}

export default CameraStatus;
