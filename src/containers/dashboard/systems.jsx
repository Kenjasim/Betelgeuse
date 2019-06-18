import React, { Component } from 'react';

import SystemBox from './system_box'
import RadarImagesStatus from './radar_images_status'
import CameraStatus from './camera_status'

const systems = [
  <SystemBox name="AIS" endpoint='http://217.138.134.182:3002'/>,
  <SystemBox name="GPS" endpoint='http://217.138.134.182:3003'/>,
  <SystemBox name="Radar Data" disabled={true}/>,
  <RadarImagesStatus name="Radar Images"/>,
  <SystemBox name="WiFi Pinger"disabled={true}/>,
  <SystemBox name="Direction Finder"disabled={true}/>,
  <CameraStatus name="Camera 1"/>,
  <CameraStatus name="Camera 2"/>,
  <CameraStatus name="Camera 3"/>,
  <CameraStatus name="Camera 4"/>,
  <SystemBox name="Power" endpoint='http://217.138.134.182:3001'/>,
  <SystemBox name="MRU" endpoint='http://217.138.134.182:3004'/>,
  <SystemBox name="Weather" endpoint='http://217.138.134.182:3000'/>
]

class Systems extends Component {

  render() {
    return (

      <div className="systems">
        <div className="systems-title">
          Systems:
        </div>
        <div className="system-boxes-container">
          <div className="row">
            {systems.map((system) => {
              return <div className="col-xs-6 systems-columns">{system}</div>
            })}
          </div>
        </div>
        <div className="notifications-title">
          Notifications:
        </div>
        <div className="notifications-box">
        </div>
      </div>

    );
  }
}

export default Systems;
