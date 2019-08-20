import React, { Component } from 'react'
import ReactMapboxGl, { Marker, Layer, Feature, Popup, ScaleControl, Overlay } from "react-mapbox-gl";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GeoJSONLayer } from "react-mapbox-gl";
import * as MapboxGL from 'mapbox-gl';

import TAVMarker from './tav_marker'
import AssetTrack from './asset_track'
import data from './dummy_data'


class AssetMap extends Component {

  constructor(props) {
    super(props)

  }



  componentDidMount() {
    console.log(this.props.time_window)
    const url = "https://bobeyes.siriusinsight.io:3333/?psqlQuery="
    const query = `SELECT * FROM "Asset" ORDER BY "ID" DESC LIMIT 100`
    const request = fetch(url+query)
      .then(response => response.json())
        .then((data) => {
          console.log(data)
        })


  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGFjaGFsbCIsImEiOiJjangwbGc4NzcwMGF0NDJvN3NxZ2QxOTlzIn0.15ElYDfKXCSogk87TVE-GA"
    })


    return (
      <Map
        className="asset-map-container"
        style="mapbox://styles/mapbox/satellite-v9"
        center = {[1.39913,51.0214]}
        zoom = {[9]}
        bearing = {[0]}
        pitch = {[0]}
      >
        <TAVMarker/>
        {data.map((asset) => {

          return(
            <AssetTrack asset_group={asset} key={asset[0][1]}/>

          )
        })}

      </Map>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    time_window: reduxState.time_window
  };
}

export default connect(mapStateToProps, null)(AssetMap)
