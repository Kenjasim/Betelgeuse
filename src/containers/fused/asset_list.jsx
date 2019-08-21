import React, { Component } from 'react'
import ReactTable from 'react-table';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {setDataObj} from '../../actions'

const data = [
  {
    'sid': 1111,
    'mmsi': 2389102
  },{
    'sid': 3422,
    'mmsi': 2389102
  },{
    'sid': 6785,
    'mmsi': 2389102
  },{
    'sid': 1235,
    'mmsi': 2389102
  },{
    'sid': 6879,
    'mmsi': 2389102
  },{
    'sid': 9247,
    'mmsi': 2389102
  },{
    'sid': 9635,
    'mmsi': 2389102
  }

]



class AssetList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }

  }

  track = (sid, mmsi) => {
    console.log(sid)
    console.log(mmsi)
  }

  profile = (sid, mmsi) => {
    console.log(sid)
    console.log(mmsi)
    this.props.setDataObj({'type': 'profile', 'id': sid})
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
      },
      {
        Header: '',
        accessor: 'track',

        Cell: ({ row }) => (<button className="asset-table-btn" onClick={(e) => this.track(row.sid, row.mmsi)}>Track</button>)
      },
      {
        Header: '',
        accessor: 'track',

        Cell: ({ row }) => (<button className="asset-table-btn" onClick={(e) => this.profile(row.sid, row.mmsi)}>Profile</button>)
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


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {setDataObj: setDataObj},
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(AssetList);


