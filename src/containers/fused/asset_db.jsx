import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { TiMediaPlay } from "react-icons/ti";
import ReactMapboxGl, { Marker, Layer, Feature, Popup, ScaleControl, Overlay } from "react-mapbox-gl";

import AssetSearch from './asset_search'
import AssetMap from './asset_map'
import AssetSlider from './asset_slider'
import AssetList from './asset_list'
import AssetInfo from './asset_info'


class AssetDB extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGFjaGFsbCIsImEiOiJjangwbGc4NzcwMGF0NDJvN3NxZ2QxOTlzIn0.15ElYDfKXCSogk87TVE-GA"
    })

    return (
      <div className="asset-db-container">
        <div className="height-100 asset-left">
          <div className="asset-search-section">
            <AssetSearch/>
          </div>
          <div className="asset-map">
            <AssetMap/>
          </div>
          <AssetSlider/>
        </div>
        <div className="height-100 asset-right">
          <div className="width-100 asset-list-container">
            <AssetList/>
          </div>
          <div className="width-100 asset-data-container">
            <AssetInfo/>
          </div>
        </div>

      </div>
    )
  }
}

export default AssetDB
