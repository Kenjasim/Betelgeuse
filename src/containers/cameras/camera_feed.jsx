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

      <div className="camera-feed">
        <Iframe url="http://camelabobeyera.ddns.net:8001"
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
