import React, { Component } from 'react'

import AssetProfile from './asset_profile'
import DataPoint from './data_point'

class AssetInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: 'none'
    }

  }

  pickComponent = () => {
    if (this.state.mode == 'none') {
      return <div className="asset-none">click an asset or data point for further information</div>
    } else if (this.state.mode == 'profile') {
      return <AssetProfile/>
    } else if (this.state.mode == 'data_point') {
      return <DataPoint/>
    }
  }

  render() {

    return (
      <div className="asset-data">
        {this.pickComponent()}
      </div>
    )
  }
}

export default AssetInfo
