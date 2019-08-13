import React, { Component } from 'react'


// [id, assetID (SID), Radar, AIS, WiFi, DF, timeSeen, Cameras, timeRowLastModified, Latitude, Longitude, Bearing]

class DataPoint extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sensorPointers: []
    }
  }

  fetchDataPoint() {
    const assetDBRow = [1, 1, null, null, null, null, null, '2019-08-08 15:00:04', '2019-08-08 15:00:04', 50.9861, 1.29239, null]
    const dataObj = {'radar': assetDBRow[2], 'ais': assetDBRow[3], 'wifi': assetDBRow[4], 'df': assetDBRow[5], 'cameras': assetDBRow[6]}
    this.setState({

      sensorPointers: dataObj
    })
  }

  componentDidMount() {
    this.fetchDataPoint()
  }


  render() {
    console.log(this.state.sensorPointers)

    return (
      <div className="asset-profile">

        <div className="datapoint-asset-section">
          <div className="disp-flex-justify">
            <div className="bold-underline lineh-15">Asset:</div>
            <div className="datapoint-date">2019-08-10 11:11:05</div>
          </div>
          <div className="disp-flex">
            <div className="flex-pair marg-right">
                <div className="bold">SID:</div>
                <div>{this.props.id}</div>
            </div>
            <div className="flex-pair marg-right">
                <div className="bold">MMSI:</div>
                <div>{9927568}</div>
            </div>
            <button className="asset-table-btn" >Profile</button>
          </div>
        </div>

        <div className="dp-sensors-wrapper">
          <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">AIS:</div>
            </div>
          </div>
          <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">Radar:</div>
            </div>
          </div>
          <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">Cameras:</div>
            </div>
          </div>
          <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">Direction Finder:</div>
            </div>
          </div>
          <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">WiFi Pinger:</div>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default DataPoint
