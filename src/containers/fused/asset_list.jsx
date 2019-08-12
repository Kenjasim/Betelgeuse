import React, { Component } from 'react'
import ReactTable from 'react-table';


const data = [
  {
    'sid': 1111,
    'mmsi': 2389102,
    'track': <button className="asset-table-btn">track</button>,
    'profile': <button className="asset-table-btn">profile</button>
  },{
    'sid': 1111,
    'mmsi': 2389102,
    'track': <button className="asset-table-btn">track</button>,
    'profile': <button className="asset-table-btn">profile</button>
  },{
    'sid': 1111,
    'mmsi': 2389102,
    'track': <button className="asset-table-btn">track</button>,
    'profile': <button className="asset-table-btn">profile</button>
  },{
    'sid': 1111,
    'mmsi': 2389102,
    'track': <button className="asset-table-btn">track</button>,
    'profile': <button className="asset-table-btn">profile</button>
  },{
    'sid': 1111,
    'mmsi': 2389102,
    'track': <button className="asset-table-btn">track</button>,
    'profile': <button className="asset-table-btn">profile</button>
  },{
    'sid': 1111,
    'mmsi': 2389102,
    'track': <button className="asset-table-btn">track</button>,
    'profile': <button className="asset-table-btn">profile</button>
  },{
    'sid': 1111,
    'mmsi': 2389102,
    'track': <button className="asset-table-btn">track</button>,
    'profile': <button className="asset-table-btn">profile</button>
  }

]

class AssetList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }

  }

  render() {
    const columns = [{
        Header: 'SID',
        accessor: 'sid',
        width: 89
      },{
        Header: 'MMSI',
        accessor: 'mmsi',
        width: 89
      },{
        Header: '',
        accessor: 'track'
      },
      {
        Header: '',
        accessor: 'profile'
      }
    ]

    return (
      <div className="asset-list">
        <div className="asset-list-title-wrapper">
          <div className="asset-list-title">
            Asset List:
          </div>
          <div className="asset-list-time">
            last 10 minutes
          </div>
        </div>
          <ReactTable
            data={data}
            columns={columns}
            style={{height:"300px"}}
            loading={this.state.loading}
            defaultPageSize={7}
            showPageSizeOptions={false}
            filterable={true}
            noDataText="No Data"
          />
      </div>
    )
  }
}

export default AssetList
