import React, { Component } from 'react'
import { TiEyeOutline } from "react-icons/ti";
import { TiArrowForwardOutline } from "react-icons/ti";
import { TiWorldOutline } from "react-icons/ti";
import { TiCameraOutline } from "react-icons/ti";
import { Table } from 'reactstrap';



// [id, assetID (SID), Radar, AIS, WiFi, DF, timeSeen, Cameras, timeRowLastModified, Latitude, Longitude, Bearing]


class DataPoint extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sensorPointers: [],
      ais: []
    }
  }

  fetchDataPoint() {
    const assetDBRow = [1, 1, 34, 123, 345, 341, 785, '2019-08-08 15:00:04', '2019-08-08 15:00:04', 50.9861, 1.29239, null]
    const dataObj = {'radar': assetDBRow[2], 'ais': assetDBRow[3], 'wifi': assetDBRow[4], 'df': assetDBRow[5], 'cameras': assetDBRow[6]}
    this.setState({

      sensorPointers: dataObj
    })
  }

  getAIS() {
    const ais_packet = ['2019-08-13 07:11:27', 351400000, "COTE DES FLANDRES", 0, 51.0213, 1.61939, 7.2, 38.2, "CALAIS DOVER", 0, 0, 1]
    const aisObj = {'timeLocal': ais_packet[0], 'mmsi': ais_packet[1], 'name': ais_packet[2], 'type': ais_packet[3], 'lat': ais_packet[4], 'lng': ais_packet[5], 'sog': ais_packet[6], 'cog': ais_packet[7], 'destination': ais_packet[8], 'length': ais_packet[9], 'beam': ais_packet[10], 'msg_type': ais_packet[11],}
    this.setState({
      ais: aisObj
    })
  }

  componentDidMount() {
    this.fetchDataPoint()
    this.getAIS()
  }


  render() {
    console.log(this.state.sensorPointers.ais)

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
              {this.state.sensorPointers.ais ?
                <div className="icon-flex">
                  <TiEyeOutline className="dp-icon"/>
                  <TiArrowForwardOutline className="dp-icon"/>
                  <TiWorldOutline className="dp-icon"/>
                </div> :
                <div className="">N/A</div>
              }
            </div>
            {this.state.sensorPointers.ais ? (
              <div className="sensor-content">
                <Table className="sensor-dp-table">
                  <thead>
                    <tr>
                      <td className="tbl-title">Time Local</td>
                      <td className="tbl-title">MMSI</td>
                      <td className="tbl-title">Vessel Name</td>
                      {/*<td className="tbl-title">Ship Type</td>*/}
                      <td className="tbl-title">Latitude</td>
                      <td className="tbl-title">Longitude</td>
                      <td className="tbl-title">SOG</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.ais.timeLocal}</td>
                      <td>{this.state.ais.mmsi}</td>
                      <td>{this.state.ais.name}</td>
                      {/*<td>{this.state.ais.type}</td>*/}
                      <td>{this.state.ais.lat}</td>
                      <td>{this.state.ais.lng}</td>
                      <td>{this.state.ais.sog}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>

                      <td className="tbl-title">COG</td>
                      <td className="tbl-title">Destination</td>
                      <td className="tbl-title">Length</td>
                      <td className="tbl-title">Beam</td>
                      <td className="tbl-title">Type</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td>{this.state.ais.cog}</td>
                      <td>{this.state.ais.destination}</td>
                      <td>{this.state.ais.length}</td>
                      <td>{this.state.ais.beam}</td>
                      <td>{this.state.ais.msg_type}</td>
                    </tr>
                  </tbody>

                </Table>
              </div>
            ) : null}
          </div>

          <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">Radar:</div>
              {this.state.sensorPointers.radar ?
                <div className="icon-flex">
                  <TiEyeOutline className="dp-icon"/>
                  <TiCameraOutline className="dp-icon"/>
                  <TiArrowForwardOutline className="dp-icon"/>
                </div> :
                <div className="">N/A</div>
              }
            </div>

          </div>

          <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">Cameras:</div>
              {this.state.sensorPointers.radar ?
                <div className="icon-flex">
                  <TiEyeOutline className="dp-icon"/>
                  <TiCameraOutline className="dp-icon"/>
                  <TiArrowForwardOutline className="dp-icon"/>
                </div> :
                <div className="">N/A</div>
              }
            </div>
          </div>

          <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">Direction Finder:</div>
              {this.state.sensorPointers.radar ?
                <div className="icon-flex">
                  <TiEyeOutline className="dp-icon"/>
                  <TiArrowForwardOutline className="dp-icon"/>
                </div> :
                <div className="">N/A</div>
              }
            </div>
          </div>

          <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">WiFi Pinger:</div>
              {this.state.sensorPointers.radar ?
                <div className="icon-flex">
                  <TiEyeOutline className="dp-icon"/>
                  <TiArrowForwardOutline className="dp-icon"/>
                </div> :
                <div className="">N/A</div>
              }
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default DataPoint
