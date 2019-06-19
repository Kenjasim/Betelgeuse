import React, { Component } from 'react';

import CameraBox from './camera_box'

class Cameras extends Component {

  render() {
    return (
      <div className="camera-section">

        <div className="row">
          <div className="col-xs-12 col-md-6 camera-split">
            <CameraBox name={"Camera 1"} id={"Camera1"}/>
          </div>
          <div className="col-xs-12 col-md-6 camera-split">
            <CameraBox name={"Camera 2"} id={"Camera2"}/>
          </div>
          <div className="col-xs-12 col-md-6 camera-split">
            <CameraBox name={"Camera 3"} id={"Camera3"}/>
          </div>
          <div className="col-xs-12 col-md-6 camera-split">
            <CameraBox name={"Camera 4"} id={"Camera4"}/>
          </div>
        </div>
      </div>

    );
  }
}

export default Cameras;
