import React, { Component } from 'react';

import { TiRefresh } from "react-icons/ti";
import { TiVideo } from "react-icons/ti";
import { TiCamera } from "react-icons/ti";
import { TiChevronLeft } from "react-icons/ti";
import { TiChevronRight } from "react-icons/ti";

class Cameras extends Component {

  render() {
    return (
      <div className="camera-section">
        <div className="row">
          <div className="col-xs-12 col-md-6 camera-split">
            <div className="camera-box">
              <div className="camera-box-header">
                <div className="camera-header-text">
                  <p className="camera-name">Camera 1</p>
                </div>
                <div className="camera-header-buttons">
                  <TiRefresh className="camera-btn"/>
                  <TiVideo className="camera-btn"/>
                  <TiCamera className="camera-btn"/>
                  <TiChevronLeft className="camera-btn"/>
                  <TiChevronRight className="camera-btn"/>
                </div>
              </div>
              <div className="camera-feed">
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 camera-split">
            <div className="camera-box">
              <div className="camera-box-header">
                <div className="camera-header-text">
                  <p className="camera-name">Camera 2</p>
                </div>
                <div className="camera-header-buttons">
                  <TiRefresh className="camera-btn"/>
                  <TiVideo className="camera-btn"/>
                  <TiCamera className="camera-btn"/>
                  <TiChevronLeft className="camera-btn"/>
                  <TiChevronRight className="camera-btn"/>
                </div>
              </div>
              <div className="camera-feed">
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 camera-split">
            <div className="camera-box">
              <div className="camera-box-header">
                <div className="camera-header-text">
                  <p className="camera-name">Camera 3</p>
                </div>
                <div className="camera-header-buttons">
                  <TiRefresh className="camera-btn"/>
                  <TiVideo className="camera-btn"/>
                  <TiCamera className="camera-btn"/>
                  <TiChevronLeft className="camera-btn"/>
                  <TiChevronRight className="camera-btn"/>
                </div>
              </div>
              <div className="camera-feed">
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 camera-split">
            <div className="camera-box">
              <div className="camera-box-header">
                <div className="camera-header-text">
                  <p className="camera-name">Camera 4</p>
                </div>
                <div className="camera-header-buttons">
                  <TiRefresh className="camera-btn"/>
                  <TiVideo className="camera-btn"/>
                  <TiCamera className="camera-btn"/>
                  <TiChevronLeft className="camera-btn"/>
                  <TiChevronRight className="camera-btn"/>
                </div>
              </div>
              <div className="camera-feed">
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Cameras;
