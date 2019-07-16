import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import io from "socket.io-client";

import WindMap from './wind_map'

class WeatherWind extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wind_dir: 180,
      wind_speed: 0,
      heading: 0,
      wind_data: {
        labels: [],
        datasets: [
          {
            label: 'Wind Speed (m/s)',
            data: [],
            fill: false,          // Don't fill area under the line
            borderColor: '#1D1955'  // Line color
          }
        ],
      },
      response: false,
      mru_endpoint: 'http://bobeyes.siriusinsight.io:3004',
      weather_endpoint: 'http://bobeyes.siriusinsight.io:3000'
    }
    this.socket_one = io.connect(this.state.mru_endpoint)
    this.socket_two = io.connect(this.state.weather_endpoint)
  }

  windData = (wind_num) => {
    let upd_labels = ''
    let upd_data = ''
    if (this.state.wind_data.labels.length > 200) {
      upd_labels = this.state.wind_data.labels.slice(30).concat([''])
      upd_data = this.state.wind_data.datasets[0].data.slice(30).concat(wind_num)
    } else {
      upd_labels = this.state.wind_data.labels.concat([''])
      upd_data = this.state.wind_data.datasets[0].data.concat(wind_num)
    }
    // upd_labels = this.state.wind_data.labels.concat([''])
    // upd_data = this.state.wind_data.datasets[0].data.concat(wind_num * 24)
    const upd_wind_data = {
      labels: upd_labels,
      datasets: [
        {
          label: 'Wind Speed (m/s)',
          data: upd_data,
          fill: false,          // Don't fill area under the line
          borderColor: '#1D1955'  // Line color
        }
      ]
    }
    this.setState((state, props) => {
      return {
        wind_data: upd_wind_data  }
    });
  }

  getAbsoluteDir = (relative_dir) => {
    return (parseInt(this.state.heading, 10) + parseInt(relative_dir,10)) % 360
  }

  openWindSocket() {
    this.socket_two.on('connected',  (data) => {
        this.socket_two.emit('ready for data', {})
      });
      this.socket_two.on('update',  (data) => {
        const message = data.message.payload
        const result = message.split(",")
        this.setState({
          wind_dir: this.getAbsoluteDir(result[2]),
          wind_speed: result[4]
        })
        this.windData(this.state.wind_speed)

    });
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

  openMRUSocket() {
    this.socket_one.on('connected',  (data) => {
        this.socket_one.emit('ready for data', {})
      });
      this.socket_one.on('update',  (data) => {
        const message = data.message.payload
        const result = message.split(",")
        let data_packet = this.mruParseData(result)
        const offset = 126
        const bias = 149
        let heading = offset + bias - data_packet[0]['Yaw']
        heading = heading % 360
        this.setState({
          heading: heading.toFixed(2)
        })

    });
  }

  componentDidMount() {
    this.openWindSocket()
    this.openMRUSocket()
  }

  componentWillUnmount() {
    this.socket_one.disconnect()
    this.socket_two.disconnect()
    // clearInterval(don_int)
  }

  render() {
    const compassRotate = {
      transform: `rotate(${this.state.wind_dir}deg)`
    }
    return (
      <div className="full-height">
        <div className="wind-title">Wind:</div>
        <div className="vertical-half weather-flex">
          <div className="width-60">
            <Line
              data={this.state.wind_data}
              height={170}
              options={{
                maintainAspectRatio: false,
                axes: {
                  display: false
                }
              }}
            />
          </div>
          <div className="width-40">
            <div className="compass-needle" style={compassRotate}>

            </div>
           <div className="weather-compass">

           </div>
          </div>
        </div>
        <div className="vertical-half">
          <WindMap />
        </div>
      </div>
    )
  }
}
export default WeatherWind;
