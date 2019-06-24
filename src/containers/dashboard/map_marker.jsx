import React, { Component } from 'react';
import ReactMapboxGl, {Marker} from "react-mapbox-gl";

class MapMarker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat:  51.01271940,
      long: 1.23917630,
      heading: 0
    }
  }


  render() {
    const markerUrl = "https://siriusdashboard.s3.eu-west-2.amazonaws.com/red_arrow.png";
    return (
      <Marker
        coordinates={[this.state.long, this.state.lat]}
        anchor="bottom"

        >
        <img className="ship-marker" src={markerUrl}/>
      </Marker>
    )
  }
}

export default MapMarker;
