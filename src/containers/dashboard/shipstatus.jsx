import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import io from "socket.io-client";

import ShipMap from './ship_map'


class ShipStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat:  51.01271940,
      long: 1.23917630,
      heading: '',
      roll_data: {
        labels: [],
        datasets: [
          {
            label: 'Roll',
            data: [],
            fill: false,          // Don't fill area under the line
            borderColor: '#26AAE2'  // Line color
          }
        ],
      },
      pitch_data: {
        labels: [],
        datasets: [
          {
            label: 'Pitch',
            data: [],
            fill: false,          // Don't fill area under the line
            borderColor: '#26AAE2'  // Line color
          }
        ],
      },
      response: false,
      mru_endpoint: 'http://217.138.134.182:3004',
      gps_endpoint: 'http://217.138.134.182:3003'
    }
    this.socket_one = io.connect(this.state.mru_endpoint)
    this.socket_two = io.connect(this.state.gps_endpoint)
  }

  mruParseData = (array) => {
    const data = [{
        'ID': array[0],
        'TimeLocal': array[1],
        'Pitch': array[2],
        'Roll': array[3],
        'Yaw': array[4],
        'ShipHeading': array[5]
      }]
    return data
  }

  rollData = (roll_num) => {
    let upd_labels = ''
    let upd_data = ''
    if (this.state.roll_data.labels.length > 70) {
      upd_labels = this.state.roll_data.labels.slice(2).concat([''])
      upd_data = this.state.roll_data.datasets[0].data.slice(2).concat(roll_num)
    } else {
      upd_labels = this.state.roll_data.labels.concat([''])
      upd_data = this.state.roll_data.datasets[0].data.concat(roll_num)
    }
    const upd_roll_data = {
      labels: upd_labels,
      datasets: [
        {
          label: 'Roll',
          data: upd_data,
          fill: false,          // Don't fill area under the line
          borderColor: '#26AAE2'  // Line color
        }
      ]
    }
    this.setState((state, props) => {
      return { roll_data: upd_roll_data }
    });
  }
  pitchData = (pitch_num) => {
    let upd_labels = ''
    let upd_data = ''
    if (this.state.pitch_data.labels.length > 70) {
      upd_labels = this.state.pitch_data.labels.slice(2).concat([''])
      upd_data = this.state.pitch_data.datasets[0].data.slice(2).concat(pitch_num)
    } else {
      upd_labels = this.state.pitch_data.labels.concat([''])
      upd_data = this.state.pitch_data.datasets[0].data.concat(pitch_num)
    }
    const upd_pitch_data = {
      labels: upd_labels,
      datasets: [
        {
          label: 'Pitch',
          data: upd_data,
          fill: false,          // Don't fill area under the line
          borderColor: '#26AAE2'  // Line color
        }
      ]
    }
    this.setState((state, props) => {
      return { pitch_data: upd_pitch_data }
    });
  }

  headingData = (yaw) => {
    const offset = 126
    const bias = 149
    let heading = offset + bias - yaw
    heading = heading % 360
    this.setState({
      heading: heading.toFixed(2)
    })
  }

  openMRUSocket() {
    this.socket_one.on('connected',  (data) => {
        this.socket_one.emit('ready for data', {})
      });
      this.socket_one.on('update',  (data) => {
        const message = data.message.payload
        const result = message.split(",")
        let data_packet = this.mruParseData(result)
        this.rollData(data_packet[0]['Roll'])
        this.pitchData(data_packet[0]['Pitch'])
        this.headingData(data_packet[0]['Yaw'])
    });
  }

  GPSData = (long, lat) => {
    this.setState({
      long: (long / 100).toFixed(8),
      lat: (lat / 100).toFixed(8)
    })
  }

  openGPSSocket() {
    this.socket_two.on('connected',  (data) => {
        this.socket_two.emit('ready for data', {})
      });
      this.socket_two.on('update',  (data) => {
        const message = data.message.payload
        const result = message.split(",")
        this.GPSData(result[2], result[3])
    });
  }


  componentDidMount() {
    this.openMRUSocket()
    this.openGPSSocket()
  }

  componentWillUnmount() {
    this.socket_one.disconnect()
    this.socket_two.disconnect()
  }

  render() {

    Chart.defaults.scale.gridLines.display = false;
    return (
      <div className="ship-box">
        <div className="ship-status-left">
          <div className="ship-title">
            <div className="ship-indicator">
              Ship:
            </div>
            <div className="ship">
              Light Vessel 07
            </div>
          </div>
          <div className="ship-roll">
            Roll:
            <div className="roll-chart chart-container">
              <Line
                data={this.state.roll_data}
                height={140}
                options={{
                  maintainAspectRatio: false,
                  axes: {
                    display: false
                  }
                }}
              />
            </div>
          </div>
          <div className="ship-pitch">
            Pitch:
            <div className="pitch-chart chart-container">
              <Line
                data={this.state.pitch_data}
                height={140}
                options={{
                  maintainAspectRatio: false,
                  axes: {
                    display: false
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="ship-status-right">
          <div className="ship-table-section">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">Latitude:</th>
                  <td>{this.state.lat}</td>
                </tr>
                <tr>
                  <th scope="row">Longitude:</th>
                  <td>{this.state.long}</td>
                </tr>
                <tr>
                  <th scope="row">Heading:</th>
                  <td>{this.state.heading}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ship-map-section">
            <ShipMap lat={this.state.lat} long={this.state.long} />
          </div>
        </div>
      </div>

    );
  }
}

export default ShipStatus;
