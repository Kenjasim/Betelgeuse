import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AssetProfile from './asset_profile'
import DataPoint from './data_point'

class AssetInfo extends Component {

  constructor(props) {
    super(props)


  }



  pickComponent = () => {
    if (this.props.dataObj.type == 'none') {
      return <div className="asset-none">click an asset or data point for further information</div>
    } else if (this.props.dataObj.type == 'profile') {
      return <AssetProfile id={this.props.dataObj.id}/>
    } else if (this.props.dataObj.type == 'data_point') {
      return <DataPoint id={this.props.dataObj.id} asset_id={this.props.dataObj.asset_id}/>
    }
  }

  render() {
    // console.log("here")

    return (
      <div className="asset-data">
        {this.pickComponent()}
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    dataObj: reduxState.assetData
  };
}

export default connect(mapStateToProps, null)(AssetInfo);


