import React, { Component } from 'react';
import ReactMapboxGl, {Marker} from "react-mapbox-gl";
import io from "socket.io-client";

class MapMarker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat:  51.01271940,
      long: 1.23917630,
      heading: 0,
      response: false,
      mru_endpoint: 'http://pulsar.siriusinsight.io:3004',
      gps_endpoint: 'http://pulsar.siriusinsight.io:3003'
    },
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

  openMRUSocket() {
    this.socket_one.on('connected',  (data) => {
        this.socket_one.emit('ready for data', {})
      });
      this.socket_one.on('update',  (data) => {
        const message = data.message.payload
        const result = message.split(",")
        let data_packet = this.mruParseData(result)
        // const offset = 126
        // const bias = 149
        // let heading = offset + bias - data_packet[0]['Yaw']
        // heading = heading % 360
        this.setState({
          // heading: heading.toFixed(2)
          heading: data_packet[0]['ShipHeading']
        })

    });
  }

  GPSData = (long, lat) => {
    this.setState({
      long: (long / 100).toFixed(8),
      lat: (lat / 100).toFixed(7)
    })
  }

  openGPSSocket() {
    this.socket_two.on('connected',  (data) => {
        this.socket_two.emit('ready for data', {})
        console.log('here')
      });
      this.socket_two.on('update',  (data) => {
        const message = data.message.payload
        const result = message.split(",")
        this.GPSData(result[2], result[3])

    });
  }

  componentWillMount() {
    this.openMRUSocket()
    this.openGPSSocket()
  }


  render() {
    const markerUrl = "https://siriusdashboard.s3.eu-west-2.amazonaws.com/red_arrow.png";
    const markerRotate = {
      transform: `rotate(${this.state.heading}deg)`
    }
    return (
      <Marker
        coordinates={[this.state.long, this.state.lat]}
        anchor="center"

        >
        <img style={markerRotate} className="ship-marker" src={markerUrl}/>
      </Marker>
    )
  }
}

export default MapMarker;
