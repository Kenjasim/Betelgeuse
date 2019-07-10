import React, { Component } from 'react';
import JSMpeg from 'jsmpeg-player';
import Iframe from 'react-iframe'

class CameraFeed extends Component {
  componentDidMount() {
    //this.InitialiseVideo()
  }

  // InitialiseVideo(){

  //   var videoUrl = "https://217.138.134.182:3008";
  //   new JSMpeg.VideoElement('#' + this.props.id, videoUrl);
  // }

  render() {
    return (
      //Calls and Iframe and adds the url of the cameras
      <div className="camera-feed">
        <Iframe url="https://camelabobeyera.ddns.net:8000"
          width="100%"
          height="100%"
          id={this.props.id}
          className="camera-frame"
          display="initial"
          position="relative"/>
      </div>
    )
  }
}

export default CameraFeed;
