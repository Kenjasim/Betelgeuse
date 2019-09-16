import React, { Component } from 'react';
import ReactTable from 'react-table';
import io from "socket.io-client";

// import data from './dummy_data'

class AISLiveFeed extends Component {
  constructor(props) {
    super(props);
    this.parseData = this.parseData.bind(this);
    this.state = {
      response: false,
      endpoint: 'sockets.siriusinsight.io/ais',
      state_data: [],
    };
    this.socket = io.connect(this.state.endpoint)
  }


  parseData = (array) => {
      const data = [{
          'ID': array[0],
          'MMSI': array[1],
          'Latitude': array[2],
          'Longitude': array[3],
          'Sog': array[4],
          'Cog': array[5],
          'Length': array[6],
          'Beam': array[7],
          'Destination': array[8],
          'Timestamp': array[9],
          'TimeLocal': array[10],
          'VesselName': array[11],
          'CallSign': array[12],
          'MessageType': array[13],
          'ShipType': array[14]
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
        console.log(result)
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
        Header: 'MMSI',
        accessor: 'MMSI'
      },{
        Header: 'Vessel Name',
        accessor: 'VesselName'
      },{
        Header: 'Ship Type',
        accessor: 'ShipType'
      },{
        Header: 'Latitude',
        accessor: 'Latitude'
      },{
        Header: 'Longitude',
        accessor: 'Longitude'
      },{
        Header: 'Speed over Ground',
        accessor: 'Sog'
      },{
        Header: 'Course over Ground',
        accessor: 'Cog'
      },{
        Header: 'Destination',
        accessor: 'Destination'
      },{
        Header: 'Length',
        accessor: 'Length'
      },{
        Header: 'Beam',
        accessor: 'Beam'
      },{
        Header: 'MessageType',
        accessor: 'MessageType'
      }

    ]

    return (
      <div className="table-wrapper">
        <ReactTable data={this.state.state_data} columns={columns} defaultPageSize={13} showPagination={true} showPageSizeOptions={false}/>
      </div>

    );
  }
}
export default AISLiveFeed;
