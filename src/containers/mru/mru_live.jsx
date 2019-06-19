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
      endpoint: 'http://217.138.134.182:3004',
      state_data: [],
    };
    this.socket = io.connect(this.state.endpoint)
  }


  parseData = (array) => {
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
    const columns = [
      {
        Header: 'Time Local',
        accessor: 'TimeLocal',
        width: 200
      },
      {
        Header: 'Pitch',
        accessor: 'Pitch'
      },{
        Header: 'Roll',
        accessor: 'Roll'
      },{
        Header: 'Yaw',
        accessor: 'Yaw'
      },{
        Header: 'Ship Heading',
        accessor: 'ShipHeading'
      }
    ]

    return (
      <div className="table-wrapper">
        <ReactTable data={this.state.state_data} columns={columns} defaultPageSize={13} showPagination={true} showPageSizeOptions={false}/>
      </div>

    );
  }
}
export default WeatherLiveFeed;
