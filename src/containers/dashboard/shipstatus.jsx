import React, { Component } from 'react';
import ReactMapboxGl, {Marker, Layer, Feature } from "react-mapbox-gl";


class ShipStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 50.567188,
      long: 0.989291,
      heading: 61.3
    }
  }


  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGFjaGFsbCIsImEiOiJjangwbGc4NzcwMGF0NDJvN3NxZ2QxOTlzIn0.15ElYDfKXCSogk87TVE-GA"
    });
    const markerUrl = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
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
                  <td>{this.state.lat}</td>
                </tr>
                <tr>
                  <th scope="row">Longitude:</th>
                  <td>{this.state.long}</td>
                </tr>
                <tr>
                  <th scope="row">Heading:</th>
                  <td>{this.state.heading}</td>
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
              }}
              center={[this.state.long, this.state.lat]}
              zoom={[5]}
              >
              <Marker
                coordinates={[this.state.long, this.state.lat]}
                anchor="bottom">
                className="ship-marker"
                <img src={markerUrl}/>
              </Marker>
            </Map>
          </div>
        </div>
      </div>

    );
  }
}

export default ShipStatus;
