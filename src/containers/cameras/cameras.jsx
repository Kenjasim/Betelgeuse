import React, { Component } from 'react';

import CameraBox from './camera_box'

class Cameras extends Component {

  render() {
    return (
      <div className="camera-section">

        <div className="">
          <div className="col-12 col-sm-12 col-md-6 camera-split">
            <CameraBox name={"Camera 1"} id={"Camera1"} livevideo ={"https://pulsar.siriusinsight.io:3333/camera?camera=Camera1&date=2019/06/19&image=Camera%201_01_20190619120122.mp4"}/>
          </div>
          <div className="col-12 col-sm-12 col-md-6 camera-split">
            <CameraBox name={"Camera 2"} id={"Camera2"} livevideo={"https://pulsar.siriusinsight.io:3333/camera?camera=Camera2&date=2019/06/19&image=Camera2_01_20190619150923.mp4"}/>
          </div>
          <div className="col-12 col-sm-12 col-md-6 camera-split">
            <CameraBox name={"Camera 3"} id={"Camera3"} livevideo={"https://pulsar.siriusinsight.io:3333/camera?camera=Camera3&date=2019/06/19&image=Camera1_01_20190619150611.mp4"}/>
          </div>
          <div className="col-12 col-sm-12 col-md-6 camera-split">
            <CameraBox name={"Camera 4"} id={"Camera4"} livevideo={"https://pulsar.siriusinsight.io:3333/camera?camera=Camera4&date=2019/06/19&image=Camera1_01_20190619150813.mp4"}/>
          </div>
        </div>
      </div>

    );
  }
}

export default Cameras;
