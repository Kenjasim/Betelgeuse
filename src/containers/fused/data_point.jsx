import React, { Component } from 'react'
import { TiEyeOutline } from "react-icons/ti";
import { TiArrowForwardOutline } from "react-icons/ti";
import { TiWorldOutline } from "react-icons/ti";
import { TiCameraOutline } from "react-icons/ti";
import { Table } from 'reactstrap';
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css';


// [id, assetID (SID), Radar, AIS, WiFi, DF, timeSeen, Cameras, timeRowLastModified, Latitude, Longitude, Bearing]
// https://35.178.66.206:9000/?mmsi= + mmsi + &start=yyyymmdd + &end=yyyymmdd


class DataPoint extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sensorPointers: [],
      isOpen: false,
      imgUrl: "x",
      id: null,
      mmsi: "N/A"
    }
  }

  fetchData() {
    const url = "https://pulsar.siriusinsight.io:3333/assetquery?"
    const query = `SELECT * FROM "Asset" WHERE "ID" = ${this.props.id}`
    const newQuery = `columnname=* &parameters= "ID" = ${this.props.id}`

    const dpRow = fetch(url + newQuery)
      .then(response => response.json())
        .then((data) => {
            // console.log(data)
            this.setState({
              sensorPointers: {'radar': data[0].Radar, 'ais': data[0].AIS, 'wifi': data[0].WIFI, 'df': data[0].DF, 'cameras': data[0].Camera}
            }, () => {
              // console.log(this.state.sensorPointers)
                this.getAIS()
                this.getRadar()
                this.getDF()
                this.getWifi()
                this.getCameras()
            })
        })

  }

  getAIS() {
    if (this.state.sensorPointers.ais) {
        const url = "https://pulsar.siriusinsight.io:3333/aisquery?"
        const query = `SELECT * FROM "Ais" WHERE "ID" = ${this.state.sensorPointers.ais}`
        const newQuery = `columnname=* &parameters= "ID" = ${this.state.sensorPointers.ais}`

        const output = fetch(url + newQuery)
          .then(response => response.json())
            .then((data) => {
              return data

            })

        Promise.resolve(output).then((result) => {

          this.setState({
              ais: {'timeLocal': result[0].TimeLocal, 'mmsi': result[0].MMSI, 'name': result[0].VesselName, 'type': result[0].ShipType, 'lat': result[0].Latitude, 'lng': result[0].Longitude, 'sog': result[0].Sog, 'cog': result[0].Cog, 'destination': result[0].Destination, 'length': result[0].Length, 'beam': result[0].Beam, 'msg_type': result[0].MessageType}
          })
        })
    }
    const ais_packet = ['2019-08-13 07:11:27', 351400000, "COTE DES FLANDRES", 0, 51.0213, 1.61939, 7.2, 38.2, "CALAIS DOVER", 0, 0, 1]
    const aisObj = {'timeLocal': ais_packet[0], 'mmsi': ais_packet[1], 'name': ais_packet[2], 'type': ais_packet[3], 'lat': ais_packet[4], 'lng': ais_packet[5], 'sog': ais_packet[6], 'cog': ais_packet[7], 'destination': ais_packet[8], 'length': ais_packet[9], 'beam': ais_packet[10], 'msg_type': ais_packet[11]}

  }

  getRadar() {
    const radar_packet = ['2019-08-13 07:11:27', 42069, 51.02, 1.619, 156, 260, 7.2, 38.2, 7.2, 68.2, 3]
    const radarObj = {'timeLocal': radar_packet[0], 'target_no': radar_packet[1], 'lat': radar_packet[2], 'lng': radar_packet[3], 'distance': radar_packet[4], 'bearing_t': radar_packet[5], 'speed_t': radar_packet[6], 'course_t': radar_packet[7], 'speed_r': radar_packet[8], 'course_r': radar_packet[9], 'count': radar_packet[10]}
    this.setState({
      radar: radarObj
    })
  }

  getDF() {
    const df_packet = ['2019-08-13 07:11:27', 3.884, 67, 167, "id"]
    const dfObj = {'time_seen': df_packet[0], 'power': df_packet[1], 'bearing_r': df_packet[2], 'bearing_t': df_packet[3]}
    this.setState({
      df: dfObj
    })
  }

  getWifi() {
    const wifi_packet = ['68:72:51:3e:ce:80', "2019-08-13 07:11:27", -89, 'HTC Portable Hotspot 6B50', 'Access Point', 5, 'id', 135]
    const wifiObj = {'bssid': wifi_packet[0], 'time_seen': wifi_packet[1], 'power': wifi_packet[2], 'essid': wifi_packet[3], 'type': wifi_packet[4], 'antenna': wifi_packet[5], 'bearing': wifi_packet[7]}
    this.setState({
      wifi: wifiObj
    })
  }

  getCameras() {
    // const camera_packet = [Time, Camera, Bearing (R), Bearing (T)]
    const camera_packet = ["2019-08-13 07:11:27", 2, 45, 125]
    const cameraObj = {'time_local': camera_packet[0], 'camera': camera_packet[1], 'bearing_r': camera_packet[2], 'bearing_t': camera_packet[3]}
    this.setState({
      cameras: cameraObj
    })
  }

  openModal = (e) => {
    // console.log(e.currentTarget.dataset.url)
    this.setState({
      imgUrl: e.currentTarget.dataset.url
    }, () => {
      this.setState({isOpen: true})
    })
  }


  getMMSI = () => {

    const url = "https://pulsar.siriusinsight.io:3333/aisquery?"
    const query = `SELECT "Ais"."MMSI" FROM "Ais", "Asset" WHERE "Ais"."ID" = "Asset"."AIS" AND "Asset"."ID" = ${this.props.id}`
    const newQuery = `columnname= "Ais"."MMSI" &parameters= "Ais"."ID" = "Asset"."AIS" AND "Asset"."ID" = ${this.props.id}`

    const output = fetch(url + query)
      .then(response => response.json())
        .then((data) => {
          // console.log(data[0].MMSI)
           this.setState({
              mmsi: data[0].MMSI
           })
        })

  }

  componentWillMount() {
    this.getMMSI()
    this.fetchData()

  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id != this.props.id) {
      this.getMMSI()
      this.fetchData()

    }
  }

  renderAIS = () => {
    return (
      <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">AIS:</div>
              {this.state.ais ?
                <div className="icon-flex">
                  <TiEyeOutline className="dp-icon"/>
                  <TiArrowForwardOutline className="dp-icon"/>
                  <TiWorldOutline className="dp-icon"/>
                </div> :
                null
              }
            </div>
            {this.state.ais ? (
              <div className="sensor-content">
                <Table className="sensor-dp-table" size="sm">
                  <thead>
                    <tr>
                      <td className="tbl-title">Time Local</td>
                      <td className="tbl-title">MMSI</td>
                      <td className="tbl-title">S type</td>
                      <td className="tbl-title">Vessel Name</td>
                      {/*<td className="tbl-title">Ship Type</td>*/}
                      <td className="tbl-title">Latitude</td>
                      <td className="tbl-title">Longitude</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.ais.timeLocal}</td>
                      <td>{this.state.ais.mmsi}</td>
                      <td>{this.state.ais.type}</td>
                      <td>{this.state.ais.name}</td>
                      {/*<td>{this.state.ais.type}</td>*/}
                      <td>{this.state.ais.lat}</td>
                      <td>{this.state.ais.lng}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <td className="tbl-title">SOG</td>
                      <td className="tbl-title">COG</td>
                      <td className="tbl-title">Destination</td>
                      <td className="tbl-title">Length</td>
                      <td className="tbl-title">Beam</td>
                      <td className="tbl-title">M Type</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.ais.sog}</td>
                      <td>{this.state.ais.cog}</td>
                      <td>{this.state.ais.destination}</td>
                      <td>{this.state.ais.length}</td>
                      <td>{this.state.ais.beam}</td>
                      <td>{this.state.ais.msg_type}</td>
                    </tr>
                  </tbody>

                </Table>
              </div>
            ) : <div className="">N/A</div>}
          </div>
      )
    }

    renderRadar = () => {
      return(
          <div className="dp-sensor margin-reduce">
            <div className="sensor-title-bar">
              <div className="bold">Radar:</div>
              {this.state.sensorPointers.radar ?
                <div className="icon-flex">
                  <TiEyeOutline className="dp-icon"/>
                  <TiCameraOutline onClick={this.openModal} data-url={"https://siriusdashboard.s3.eu-west-2.amazonaws.com/radarImage.bmp"} className="dp-icon"/>
                  <TiArrowForwardOutline className="dp-icon"/>
                </div> :
                null
              }
            </div>
            {this.state.sensorPointers.radar ? (
              <div className="sensor-content">
                <Table className="sensor-dp-table">
                  <thead>
                    <tr>
                      <td className="tbl-title">Time Local</td>
                      <td className="tbl-title">TargetNo</td>
                      <td className="tbl-title">Latitude</td>
                      <td className="tbl-title">Longitude</td>
                      {/*<td className="tbl-title">Ship Type</td>*/}
                      <td className="tbl-title">Distance</td>
                      <td className="tbl-title">Bearing</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.radar.timeLocal}</td>
                      <td>{this.state.radar.target_no}</td>
                      <td>{this.state.radar.lat}</td>
                      <td>{this.state.radar.lng}</td>
                      <td>{this.state.radar.distance}</td>
                      <td>{this.state.radar.bearing_t}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <td className="tbl-title">Speed(T)</td>
                      <td className="tbl-title">Course(T)</td>
                      <td className="tbl-title">Speed(R)</td>
                      <td className="tbl-title">Course(R)</td>
                      <td className="tbl-title">Count</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.radar.speed_r}</td>
                      <td>{this.state.radar.course_r}</td>
                      <td>{this.state.radar.speed_t}</td>
                      <td>{this.state.radar.course_t}</td>
                      <td>{this.state.radar.count}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            ) : <div className="">N/A</div>}
          </div>
      )
    }

    renderCameras = () => {
      return (
          <div className="dp-sensor">
            <div className="sensor-title-bar">
              <div className="bold">Cameras:</div>
              {this.state.sensorPointers.cameras ?
                <div className="icon-flex">
                  <TiEyeOutline className="dp-icon"/>
                  <TiCameraOutline onClick={this.openModal} data-url="https://siriusdashboard.s3.eu-west-2.amazonaws.com/labelled_img.png" className="dp-icon"/>
                  <TiArrowForwardOutline className="dp-icon"/>
                </div> :
                null
              }
            </div>
            {this.state.sensorPointers.cameras ? (
              <div className="sensor-content disp-flex">
                <div className="sensorhalf">
                  <Table className="sensor-dp-table">
                    <thead>
                      <tr>
                        <td className="tbl-title">Time Local</td>
                        <td className="tbl-title">Camera</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.cameras.time_local}</td>
                        <td>{this.state.cameras.camera}</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <td className="tbl-title">Bearing (R)</td>
                        <td className="tbl-title">Bearing (T)</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.cameras.bearing_r}</td>
                        <td>{this.state.cameras.bearing_t}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="sensorhalf">
                  <div className="camera-dp-img">
                    <img src="https://siriusdashboard.s3.eu-west-2.amazonaws.com/labelled_img.png" alt=""/>
                  </div>
                </div>
              </div>
            ) : <div className="">N/A</div>}
          </div>



      )
    }

  renderDF = () => {
    return (
      <div className="dp-sensor">
        <div className="sensor-title-bar">
          <div className="bold">Direction Finder:</div>
          {this.state.sensorPointers.df ?
            <div className="icon-flex">
              <TiEyeOutline className="dp-icon"/>
              <TiArrowForwardOutline className="dp-icon"/>
            </div> :
            null
          }
        </div>
          {this.state.sensorPointers.df ? (
          <div className="sensor-content">
            <Table className="sensor-dp-table">
              <thead>
                <tr>
                  <td className="tbl-title">Time Last Seen</td>
                  <td className="tbl-title">Power</td>
                  <td className="tbl-title">Bearing (R)</td>
                  <td className="tbl-title">Bearing (T)</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.df.time_seen}</td>
                  <td>{this.state.df.power}</td>
                  <td>{this.state.df.bearing_r}</td>
                  <td>{this.state.df.bearing_t}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        ) : <div className="">N/A</div>}
      </div>

    )
  }

  renderWiFi = () => {
    return (
      <div className="dp-sensor">
        <div className="sensor-title-bar">
          <div className="bold">WiFi Pinger:</div>
          {this.state.sensorPointers.wifi ?
            <div className="icon-flex">
              <TiEyeOutline className="dp-icon"/>
              <TiArrowForwardOutline className="dp-icon"/>
            </div> :
            null
          }
        </div>
        {this.state.sensorPointers.wifi ? (
          <div className="sensor-content">
            <Table className="sensor-dp-table">
              <thead>
                <tr>
                  <td className="tbl-title">Time Seen</td>
                  <td className="tbl-title">BSSID</td>
                  <td className="tbl-title">ESSID</td>
                  <td className="tbl-title">Power</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.wifi.time_seen}</td>
                  <td>{this.state.wifi.bssid}</td>
                  <td>{this.state.wifi.essid}</td>
                  <td>{this.state.wifi.power}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <td className="tbl-title">Type</td>
                  <td className="tbl-title">Antenna</td>
                  <td className="tbl-title">Bearing (C.L)</td>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.wifi.type}</td>
                  <td>{this.state.wifi.antenna}</td>
                  <td>{this.state.wifi.bearing}</td>

                </tr>
              </tbody>
            </Table>
          </div>
        ) : <div className="">N/A</div>}
      </div>

    )
  }



  render() {

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
                <div>{this.props.asset_id}</div>
            </div>
            <div className="flex-pair marg-right">
                <div className="bold">MMSI:</div>
                <div>{this.state.mmsi}</div>
            </div>
            <button className="asset-table-btn" >Profile</button>
          </div>
        </div>

        <div className="dp-sensors-wrapper">

          {this.renderAIS()}

          {this.renderRadar()}

          {this.renderCameras()}

          {this.renderDF()}

          {this.renderWiFi()}


        </div>

        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.imgUrl}
            onCloseRequest={() => this.setState({ isOpen: false})}
            className="dp-modal"
          />
        )}

      </div>
    )
  }
}

export default DataPoint
