import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class CameraFeed extends Component {
  render () {
    return (
      <div className="camera-feed">
        <ReactPlayer
                className='react-player '
                url={"rtsp://admin:yeetyeet@camelabobeyera.ddns.net:554//h264Preview_01_main"}
                height="80%"
                width="100%"
                controls = "true"
              />
      </div>
    )
  }
}

export default CameraFeed;
