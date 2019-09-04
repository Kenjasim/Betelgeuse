import React, { Component } from 'react';
import JSMpeg from 'jsmpeg-player';
import Iframe from 'react-iframe'
import ReactPlayer from 'react-player'

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
      <div className="video-playback">
        <ReactPlayer
          className='react-player '
          url={this.props.livevideo}
          controls = "true"
          height="80%"
          width="100%"
          playing
        />
      </div>
    )
  }
}

export default CameraFeed;
