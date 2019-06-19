import React, {Component} from 'react';
import ReactMapboxGl, {Marker, Layer, Feature } from "react-mapbox-gl";

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
    const markerUrl = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png";
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
        zoom={[6]}
        >
        <Marker
          coordinates={[this.props.long, this.props.lat]}
          anchor="bottom"

          >
          <img className="ship-marker" src={markerUrl}/>
        </Marker>
      </Map>


    )
  }
}

export default ShipMap;
