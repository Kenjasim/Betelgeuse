import React, { Component } from 'react';
import cogoToast from 'cogo-toast';

import SystemBox from './system_box'
import RadarImagesStatus from './radar_images_status'
import CameraStatus from './camera_status'

const systems = [
  <SystemBox name="AIS" endpoint='//217.138.134.182:3002' link='/ais' />,
  <SystemBox name="GPS" endpoint='//217.138.134.182:3003' link='/' />,
  <SystemBox name="Radar Data" link='/radar' disabled={true}/>,
  <RadarImagesStatus name="Radar Images" link='/radar'/>,
  <SystemBox name="WiFi Pinger" link='/wifi_pinger' disabled={true}/>,
  <SystemBox name="Direction Finder" link='direction_finder' disabled={true}/>,
  // <CameraStatus name="Camera 1" link='/cameras'/>,
  // <CameraStatus name="Camera 2" link='/cameras'/>,
  // <CameraStatus name="Camera 3" link='/cameras'/>,
  // <CameraStatus name="Camera 4" link='/cameras' />,
  <SystemBox name="Power" endpoint='//217.138.134.182:3001' link='/power' />,
  <SystemBox name="MRU" endpoint='//217.138.134.182:3004' link='/mru' />,
  <SystemBox name="Weather" endpoint='//217.138.134.182:3000'link='/weather' />
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
              return <div className="col-xs-6 systems-columns" key={system.name}>{system}</div>
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
