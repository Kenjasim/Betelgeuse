import React, { Component } from 'react';
import ReactMapboxGl, { Marker, Layer, Feature, Popup, ScaleControl, Overlay } from "react-mapbox-gl";
import { GeoJSONLayer } from "react-mapbox-gl";
import * as MapboxGL from 'mapbox-gl';
import { Pie } from 'react-chartjs-2';



class AssetTrack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false,
      coords: [0, 0],
      datapoint: null,
      lineColor: "#061322"
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
                    'coordinates': this.props.asset_group.map((asset_point) =>  [asset_point[10], asset_point[9]] )

                  }
                }


              ]

        }

    )
  }

  selectDataPoint = (e) => {
    console.log(e.features[0].properties)

  }

  openPopup = (e) => {
    console.log(e)
    this.setState({
      showPopup: true,
      coords: [e.features[0].properties[10], e.features[0].properties[9]],
      datapoint: e.features[0].properties
    })


  }

  closePopup = () => {
    this.setState({
      showPopup: false
    })
    console.log(this.setSegments())
  }

  setSegments = () => {
    // data point nulls come through as strings for some reason, needs to be fixed somewhere along the pipeline
    const sensors = Object.values(this.state.datapoint).slice(2, 7)
    const segments = ['orange', 'green', 'blue', 'red', 'yellow'].map((segment, index) => {
      if (sensors[index] == "null") {
        return "white"
      } else {
        return segment
      }
    })
    return segments
  }


  componentDidMount() {
    this.setState({
      lineColor: this.getRandomColor()
    })
  }

  render() {
    console.log(this.props.asset_group)


    return (
      <>

        <GeoJSONLayer
          data={this.geojson()}
          linePaint={this.linePaint()}
        />
        <Layer
          type="symbol"
          id={`${this.props.asset_group[0][1]}`}
          layout={{ "icon-image": "harbor-15" }}
          minZoom={8}
          icon-allow-overlap={true}

        >


          {this.props.asset_group.map((asset_point) => {

            return (
              <Feature
                key={asset_point[0]}
                coordinates={[asset_point[10], asset_point[9]]}
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
                <div className="popup-title">Asset:</div>
                <div className="popup-date">{this.state.datapoint[7]}</div>
              </div>
              <div className="popup-flex">
                <div className="popup-flex">
                  <div className="popup-title">SID:</div>
                  <div className="">{this.state.datapoint[1]}</div>
                </div>
                <div className="popup-flex">
                  <div className="popup-title marg-l-6">MMSI:</div>
                  <div className="">{9925768}</div>
                </div>
              </div>
              <div className="popup-graph-wrapper">
                <Pie

                  data={{
                    labels: ['AIS', 'Radar', 'DF', 'WiFi', 'Cameras'],
                    datasets: [{
                      data: [1,1,1,1,1],
                      backgroundColor: this.setSegments(),
                      borderColor: ['orange', 'green', 'blue', 'red', 'yellow']
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

export default AssetTrack

