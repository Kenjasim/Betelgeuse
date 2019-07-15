import React, { Component } from 'react';
import ReactTable from 'react-table';
import io from "socket.io-client";

// import data from './dummy_data'

class WifiLiveFeed extends Component {
  constructor(props) {
    super(props);
    this.parseData = this.parseData.bind(this);
    this.state = {
      response: false,
      endpoint: 'bobeyes.siriusinsight.io:3007',
      state_data: [],
    };
    this.socket = io.connect(this.state.endpoint)
  }


  //creates a usable array to pass into the live data table
  parseData = (array) => {
      const data = [{
          'bssid': array[0],
          'last time seen': array[1],
          'power': array[2],
          'essid': array[3],
          'type': array[4],
          'antenna': array[5]
        }]
      return data

    }


  //connects to the socket and when a message is sent is parsed
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
        Header: 'BSSID',
        accessor: 'bssid',
        width: 200
      },{
        Header: 'Last Time Seen',
        accessor: 'last time seen',
        width: 115
      },{
        Header: 'Power',
        accessor: 'power'
      },{
        Header: 'ESSID',
        accessor: 'essid'
      },{
        Header: 'Type',
        accessor: 'type'
      },{
        Header: 'Antenna',
        accessor: 'antenna'
      }
    ]

    return (
      <div className="table-wrapper">
        <ReactTable data={this.state.state_data} columns={columns} defaultPageSize={12} showPagination={true} showPageSizeOptions={false}/>
      </div>

    );
  }
}
export default WifiLiveFeed;
