import React, { Component } from 'react';
import ReactTable from 'react-table';
import io from "socket.io-client";

// import data from './dummy_data'

class PowerLiveFeed extends Component {
  constructor(props) {
    super(props);
    this.parseData = this.parseData.bind(this);
    this.state = {
      response: false,
      endpoint: 'http://217.138.134.182:3001',
      state_data: [],
    };
    this.socket = io.connect(this.state.endpoint)
  }


  parseData = (array) => {
      const data = [{
          'ID': array[0],
          'TimeLocal': array[1],
          'Current': array[2],
          'Power': (array[2] * 24).toFixed(2)
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
        accessor: 'TimeLocal',
        width: 200
      },{
        Header: 'Current (A)',
        accessor: 'Current'
      },{
        Header: 'Power (W)',
        accessor: 'Power'
      }
    ]

    return (
      <div className="table-wrapper">
        <ReactTable data={this.state.state_data} columns={columns} defaultPageSize={15} showPagination={true} showPageSizeOptions={false}/>
      </div>

    );
  }
}
export default PowerLiveFeed;
