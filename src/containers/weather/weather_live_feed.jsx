import React, { Component } from 'react';
import ReactTable from 'react-table';
import io from "socket.io-client";

// import data from './dummy_data'

class WeatherLiveFeed extends Component {
  constructor(props) {
    super(props);
    this.parseData = this.parseData.bind(this);
    this.state = {
      response: false,
      endpoint: 'bobeyes.siriusinsight.io:3000',
      state_data: [],
    };
    this.socket = io.connect(this.state.endpoint)
  }


  //creates a usable array to pass into the live data table
  parseData = (array) => {
      const data = [{
          'id': array[0],
          'time local': array[1],
          'wind direction': array[2],
          'reference': array[3],
          'wind speed': array[4],
          'humidity': array[5],
          'temp': array[6],
          'air pressure': array[7],
          'altitude': array[8]
        }]
      return data

    }


  componentDidMount = () => {

      this.socket.on('connected',  (data) => {
        this.socket.emit('ready for data', {})
      });
      this.socket.on('update',  (data) => {
        const message = data.message.payload
        const result = message.split(",")
        let data_packet = this.parseData(result)

        this.setState((state, props) => {
          const updated = data_packet.concat(state.state_data)
          return {state_data: updated};
        });

    });
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  render() {
    const columns = [{
        Header: 'Time Local',
        accessor: 'time local',
        width: 200
      },{
        Header: 'Wind Direction',
        accessor: 'wind direction',
        width: 115
      },{
        Header: 'Wind Speed',
        accessor: 'wind speed'
      },{
        Header: 'Humidity',
        accessor: 'humidity'
      },{
        Header: 'Temperature',
        accessor: 'temp'
      },{
        Header: 'Air Pressure',
        accessor: 'air pressure'
      },{
        Header: 'Altitude',
        accessor: 'altitude'
      }
    ]

    return (
      <div className="table-wrapper">
        <ReactTable data={this.state.state_data} columns={columns} defaultPageSize={12} showPagination={true} showPageSizeOptions={false}/>
      </div>

    );
  }
}
export default WeatherLiveFeed;
