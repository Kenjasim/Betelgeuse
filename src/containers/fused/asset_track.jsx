import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMapboxGl, { Marker, Layer, Feature, Popup, ScaleControl, Overlay } from "react-mapbox-gl";
import { GeoJSONLayer } from "react-mapbox-gl";
import * as MapboxGL from 'mapbox-gl';
import { Pie } from 'react-chartjs-2';

import {setDataObj} from '../../actions'

class AssetTrack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false,
      coords: [0, 0],
      datapoint: null,
      lineColor: "#061322",
      mmsi: 'N/A'
    }
  }


  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  linePaint = () => {
    return(
      {
        'line-color': this.state.lineColor,
        'line-width': 2
      }
    )
  }

  geojson = () => {
    return(
        {
          "type": "FeatureCollection",
          "features":
              [
                {
                  'type': 'Feature',
                  'properties': {
                    'color': '#F7455D' // red
                  },
                  'geometry': {
                    'type': 'LineString',
                    'coordinates': this.props.asset_group.map((asset_point) =>  [asset_point.Longitude, asset_point.Latitude] )

                  }
                }


              ]

        }

    )
  }

  selectDataPoint = (e) => {
    // console.log(e.features[0].properties)
    this.props.setDataObj({'type': 'data_point', 'id': e.features[0].properties.ID, 'asset_id': e.features[0].properties.AssetID})

  }

  openPopup = (e) => {
    // console.log(e.feature.properties)
    // console.log(e)
    this.setState({
      showPopup: true,
      coords: [e.feature.properties.Longitude, e.feature.properties.Latitude],
      datapoint: e.feature.properties
    })
    this.getMMSI()


  }

  closePopup = () => {
    this.setState({
      showPopup: false
    })
    // console.log(this.setSegments())
  }

  setSegments = () => {
    // data point nulls come through as strings for some reason, needs to be fixed somewhere along the pipeline
    const sensors = Object.values(this.state.datapoint).slice(2, 7)
    const segments = ['green', 'orange', 'red', 'blue', 'yellow'].map((segment, index) => {
      if (sensors[index] == 0) {
        return "white"
      } else {
        return segment
      }
    })
    return segments
  }

  getMMSI = () => {

    const url = "https://pulsar.siriusinsight.io:3333/?psqlQuery="
    const query = `SELECT "MMSI" FROM "Ais" WHERE "ID" = ${this.state.datapoint.AIS}`

    const output = fetch(url + query)
      .then(response => response.json())
        .then((data) => {
           this.setState({mmsi: data[0].MMSI})
        })


    // return "0807087"
  }


  componentDidMount() {
    this.setState({
      lineColor: this.getRandomColor(),
    })
  }

  render() {
    // console.log(this.props.asset_group[0].AssetID)


    return (
      <>

        <GeoJSONLayer
          data={this.geojson()}
          linePaint={this.linePaint()}
        />
        <Layer
          type="symbol"
          id={`${this.props.asset_group[0].AssetID}`}
          layout={{ "icon-image": "harbor-15" }}
          minZoom={10}
          icon-size={0.5}



        >


          {this.props.asset_group.map((asset_point) => {

            return (
              <Feature
                key={asset_point.ID}
                coordinates={[asset_point.Longitude, asset_point.Latitude]}
                properties={asset_point}
                onClick={this.selectDataPoint}
                onMouseEnter={this.openPopup}
                onMouseLeave={this.closePopup}


              >
              </Feature>

            )
          })}

        </Layer>
        {this.state.showPopup && (
          <Popup coordinates={this.state.coords} >
            <div className="asset-popup">
              <div className="popup-flex">
                {/*<div className="popup-title">Asset:</div>*/}
                <div className="popup-date">{this.state.datapoint.TimeSeen}</div>
              </div>
              <div className="popup-flex">
                <div className="popup-flex">
                  <div className="popup-title">SID:</div>
                  <div className="">{this.state.datapoint.AssetID}</div>
                </div>
                <div className="popup-flex">
                  <div className="popup-title marg-l-6">MMSI:</div>
                  <div className="">{this.state.mmsi}</div>
                </div>
              </div>
              <div className="popup-graph-wrapper">
                <Pie

                  data={{
                    labels: ['Radar', 'AIS', 'WiFi', 'DF', 'Cameras'],
                    datasets: [{
                      data: [1,1,1,1,1],
                      backgroundColor: this.setSegments(),
                      borderColor: ['green', 'orange', 'red', 'blue', 'yellow']
                    }]
                  }}



                />
              </div>
            </div>
          </Popup>


        ) }
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {setDataObj: setDataObj},
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(AssetTrack);


