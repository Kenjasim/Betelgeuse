import React, { Component } from 'react';
import cogoToast from 'cogo-toast';

import SystemBox from './system_box'
import RadarImagesStatus from './radar_images_status'
import CameraStatus from './camera_status'

const systems = [

  <SystemBox name="AIS" key="AIS" endpoint='https://pulsar.siriusinsight.io:5555/ais' link='/ais' />,
  <SystemBox name="GPS" key="GPS" endpoint='https://pulsar.siriusinsight.io:5555/gps' link='/' />,
  <SystemBox name="Radar Data" key="Radar Data" link='/radar' disabled={true}/>,
  <RadarImagesStatus name="Radar Images" key="Radar Images" link='/radar'/>,
  <SystemBox name="WiFi Pinger" key="WiFi Pinger" endpoint='https://pulsar.siriusinsight.io:5555/wifi' link='/wifi_pinger' />,
  <SystemBox name="Direction Finder" key="Direction Finder" link='direction_finder' disabled={true}/>,

  // <CameraStatus name="Camera 1" link='/cameras'/>,
  // <CameraStatus name="Camera 2" link='/cameras'/>,
  // <CameraStatus name="Camera 3" link='/cameras'/>,
  // <CameraStatus name="Camera 4" link='/cameras' />,

  <SystemBox name="Power" key="Power" endpoint='https://pulsar.siriusinsight.io:5555/power' link='/power' />,
  <SystemBox name="MRU" key="MRU" endpoint='https://pulsar.siriusinsight.io:5555/mru' link='/mru' />,
  <SystemBox name="Weather" key="Weather" endpoint='https://pulsar.siriusinsight.io:5555/weather'link='/weather' />
];

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
