import React, { Component } from 'react';
import ReactMapboxGl, { Marker, Layer, Feature, Popup, ScaleControl, Overlay } from "react-mapbox-gl";
import { GeoJSONLayer } from "react-mapbox-gl";
import * as MapboxGL from 'mapbox-gl';




class AssetTrack extends Component {
  constructor(props) {
    super(props)
  }


  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  linePaint = (color) => {
    return(
      {
        'line-color': color,
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




  render() {
    console.log(this.props.asset_group)

    return (
      <>

        <GeoJSONLayer
          data={this.geojson()}
          linePaint={this.linePaint(this.getRandomColor())}
        />
        <Layer
          type="symbol"
          id={`${this.props.asset_group[0][1]}`}
          layout={{ "icon-image": "harbor-15" }}
          minZoom={8}
        >

          {this.props.asset_group.map((asset_point) => {

            return (
              <Feature
                key={asset_point[0]}
                coordinates={[asset_point[10], asset_point[9]]}
              />


            )
          })}

        </Layer>
      </>
    )
  }
}

export default AssetTrack

