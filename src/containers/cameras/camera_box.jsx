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
      filepath: '',
      filename: '',
      file_type: '',
      file_list: [],
      selectedIndex: 0
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

  switchFile = (filepath, file_type, filename) => {
    this.setState({
      mode: 'Playback',
      filepath: filepath,
      filename: filename,
      file_type: file_type
    })

  }

  setFiles = (file_list) => {
    this.setState({file_list: file_list}, () => {
      console.log("in camera box")
      console.log(this.state.file_list)

    } )
  }


  pickComponent = () => {
    if (this.state.mode == 'Feed') {
      return <CameraFeed id = {this.props.id} livevideo = {this.props.livevideo}/>
    } else if (this.state.mode == 'Index') {
      return <CameraIndex switchFile={this.switchFile} id = {this.props.id} setFiles={this.setFiles}/>
    } else if (this.state.mode == 'Playback') {
      return <CameraPlayback filetype={this.state.file_type} file={this.state.filepath}/>
    }
  }

  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 10).replace(/-/g, '/');
  }




  imagePrev = () => {
    const index = this.state.file_list.indexOf(this.state.filename)

    if (index < this.state.file_list.length - 1) {
      const filepath_array = this.state.filepath.split("&")
      filepath_array.pop()
      const new_image = this.state.file_list[index+1]
      filepath_array.push('image='+new_image)
      const filepath = filepath_array.join('&')
      const filetype = new_image.split(".").slice(-1)[0]

      this.switchFile(filepath, filetype, new_image)
    }


  }

  imageNext = () => {
    console.log("next image")


    const index = this.state.file_list.indexOf(this.state.filename)

    if (index > 0) {
      const filepath_array = this.state.filepath.split("&")
      filepath_array.pop()
      const new_image = this.state.file_list[index-1]
      filepath_array.push('image=' + new_image)
      const filepath = filepath_array.join('&')
      const filetype = new_image.split(".").slice(-1)[0]
      this.switchFile(filepath, filetype, new_image)
    }
  }

  disabledNext = () => {
    let arrow_style = "camera-btn"
    const index = this.state.file_list.indexOf(this.state.filename)
    if ((!(this.state.mode == "Playback")) || (index == this.state.file_list.length - 1)) {
      arrow_style += " arrow-button-disabled"
    }
    return arrow_style
  }

  disabledPrev = () => {
    let arrow_style = "camera-btn"
    const index = this.state.file_list.indexOf(this.state.filename)
    if ((!(this.state.mode == "Playback")) || (index == 0)) {
      arrow_style += " arrow-button-disabled"
    }
    return arrow_style
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

            <TiChevronLeft className={this.disabledPrev()} onClick={this.imageNext}/>
            <TiChevronRight className={this.disabledNext()} onClick={this.imagePrev}/>
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
