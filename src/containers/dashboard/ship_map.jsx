import React, {Component} from 'react';
import ReactMapboxGl, {Marker, Layer, Feature } from "react-mapbox-gl";

import ShipMarker from './map_marker'

class ShipMap extends Component {
  constructor(props) {
      super(props)
      this.lastUpdateDate = new Date();
    }

    shouldComponentUpdate() {
        const now = new Date();
        let seconds = (now.getTime() - this.lastUpdateDate.getTime()) / 1000;
        return seconds >= 60;
        // return true;
    }

    componentDidUpdate() {
        this.lastUpdateDate = new Date();
    }



  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGFjaGFsbCIsImEiOiJjangwbGc4NzcwMGF0NDJvN3NxZ2QxOTlzIn0.15ElYDfKXCSogk87TVE-GA"
    });
    const markerUrl = "https://siriusdashboard.s3.eu-west-2.amazonaws.com/red_arrow.png";
    console.log(this.props.lat)
    console.log(this.props.long)
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        center={[1.23917630, 51.01271940 ]}
        zoom={[7]}
        >
        <ShipMarker />
      </Map>


    )
  }
}

export default ShipMap;
