import React, { Component } from 'react'
import ReactMapboxGl, { Marker, Layer, Feature, Popup, ScaleControl, Overlay } from "react-mapbox-gl";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GeoJSONLayer } from "react-mapbox-gl";
import * as MapboxGL from 'mapbox-gl';

import TAVMarker from './tav_marker'
import AssetTrack from './asset_track'
import test_data from './dummy_data'


class AssetMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      assets: [],
      data: []
    }

  }


  chunkArray = (data_array) => {

  }

  // getAll() {
  //   const url = "https://pulsar.siriusinsight.io:3333/?psqlQuery="
  //   const query = `SELECT * FROM "Asset" WHERE "TimeSeen" BETWEEN '2019-08-20 9:50:04' AND '2019-08-20 10:00:04' ORDER BY "AssetID" DESC `
  //   const request = fetch(url+query)
  //     .then(response => response.json())
  //       .then((data) => {
  //         console.log(data)
  //     })
  // }

  getIndividual = (id) => {
    let output

    const url = "https://pulsar.siriusinsight.io:3333/?psqlQuery="
    const query = `SELECT * FROM "Asset" WHERE "TimeSeen" BETWEEN '2019-08-20 8:20:04' AND '2019-08-20 14:00:04' AND "AssetID" = ${id}`

    output = fetch(url + query)
      .then(response => response.json())
        .then(function(data) {
          return data
        })

    return output

  }



  getBlockedArray() {
    const url = "https://pulsar.siriusinsight.io:3333/?psqlQuery="
    const query = `SELECT "AssetID" FROM "Asset" WHERE "TimeSeen" BETWEEN '2019-08-20 8:20:04' AND '2019-08-20 14:00:04' GROUP BY "AssetID"  `
    const request = fetch(url+query)
      .then(response => response.json())
        .then((data) => {

          const output = data.map( (asset_id) => {

            return (this.getIndividual(asset_id.AssetID))
          })
          Promise.all(output).then(results => {

            this.setState({
              data: results
            }, () => {
              // console.log(this.state.data)
            })
          })


      })

  }


  componentWillMount() {
    this.getBlockedArray()

  }

  componentDidMount() {
    // console.log(this.state.data)
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
        {this.state.data.map((asset) => {

          // console.log(asset)
          return(
            <AssetTrack asset_group={asset} key={asset[0].AssetID}/>

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
