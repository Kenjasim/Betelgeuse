import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

class ShipStatus extends Component {


  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiZmFicmljOCIsImEiOiJjaWc5aTV1ZzUwMDJwdzJrb2w0dXRmc2d0In0.p6GGlfyV-WksaDV_KdN27A"
    });
    return (
      <div className="ship-box">
        <div className="ship-status-left">
          <div className="ship-title">
            <div className="ship-indicator">
              Ship:
            </div>
            <div className="ship">
              Light Vessel 07
            </div>

          </div>
        </div>
        <div className="ship-status-right">
          <div className="ship-table-section">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">Latitude:</th>
                  <td>51.2111</td>
                </tr>
                <tr>
                  <th scope="row">Longitude:</th>
                  <td>1.3867</td>
                </tr>
                <tr>
                  <th scope="row">Heading:</th>
                  <td>61.2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ship-map-section">
            <Map
              style="mapbox://styles/mapbox/streets-v9"
              containerStyle={{
                height: "100%",
                width: "100%"
              }}>
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{ "icon-image": "marker-15" }}>
                  <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
                </Layer>
            </Map>
          </div>
        </div>
      </div>

    );
  }
}

export default ShipStatus;
