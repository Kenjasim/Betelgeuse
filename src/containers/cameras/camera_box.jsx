import React, { Component } from 'react';

import { TiRefresh } from "react-icons/ti";
import { TiVideo } from "react-icons/ti";
import { TiCamera } from "react-icons/ti";
import { TiThList } from "react-icons/ti";
import { TiChevronLeft } from "react-icons/ti";
import { TiChevronRight } from "react-icons/ti";

import CameraFeed from './camera_feed'
import CameraIndex from './camera_index'
import CameraPlayback from './camera_playback'

class CameraBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'Feed',
      file: '',
      file_type: ''
    };

  }

  switchToIndex = () => {
    this.setState({
      mode: 'Index'
    })
  }

  switchToFeed = () => {
    this.setState({
      mode: 'Feed'
    })
  }

  switchFile = (file, file_type) => {
    this.setState({
      mode: 'Playback',
      file: file,
      file_type: file_type
    })
  }

  pickComponent = () => {
    if (this.state.mode == 'Feed') {
      return <CameraFeed />
    } else if (this.state.mode == 'Index') {
      return <CameraIndex switchFile={this.switchFile} id = {this.props.id}/>
    } else if (this.state.mode == 'Playback') {
      return <CameraPlayback filetype={this.state.file_type} file={this.state.file}/>
    }
  }

  render() {



    return (

      <div className="camera-box">
        <div className="camera-box-header">
          <div className="camera-header-text">
            <p className="camera-name">{this.props.name}</p>
          </div>
          <div className="camera-header-buttons">
            <TiRefresh className="camera-btn"/>
            { this.state.mode == 'Feed' ? <TiVideo className="camera-btn camera-btn-selected" onClick={this.switchToFeed}/> : <TiVideo className="camera-btn" onClick={this.switchToFeed}/>}
            { this.state.mode == 'Index' || this.state.mode == 'Playback' ? <TiThList className="camera-btn camera-btn-selected" onClick={this.switchToIndex}/> : <TiThList className="camera-btn" onClick={this.switchToIndex}/>}

            <TiChevronLeft className="camera-btn"/>
            <TiChevronRight className="camera-btn"/>
          </div>
        </div>
        <div className="camera-container">
          { this.pickComponent() }
        </div>
      </div>

    );
  }
}

export default CameraBox;
