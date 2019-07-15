import React, { Component } from 'react';

import { TiCameraOutline } from "react-icons/ti";
import { TiVideoOutline } from "react-icons/ti";

class CameraDataCard extends Component {

  sendFile = () => {
    this.props.switchFile(this.props.filepath, this.props.type, this.props.filename)
  }

  render() {
    return (
      <div className={this.props.style} onClick={this.sendFile}>
        <div className="camera-card-left">
          <div className="type-indicator">
            {
              this.props.type == "mp4" ?
              <TiVideoOutline />
              : <TiCameraOutline />
            }
          </div>
          <div className="camera-card-info">
            <p className="camera-timestamp">{this.props.timestamp}</p>
            <p className="camera-filename">{this.props.filepath}</p>
          </div>
        </div>
        <div className="camera-card-right">
          {this.props.duration}
        </div>
      </div>

    );
  }
}

export default CameraDataCard;
