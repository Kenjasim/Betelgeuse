import React, { Component } from 'react'
import ReactMapboxGl, { Marker, Layer, Feature, Popup, ScaleControl, Overlay } from "react-mapbox-gl";


class AssetMap extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGFjaGFsbCIsImEiOiJjangwbGc4NzcwMGF0NDJvN3NxZ2QxOTlzIn0.15ElYDfKXCSogk87TVE-GA"
    })

    return (
      <Map
        className="asset-map-container"
        style="mapbox://styles/mapbox/satellite-v9"
        center = {[1.23917630,51.01271940]}
        zoom = {[9]}
        bearing = {[0]}
        pitch = {[0]}

      />
    )
  }
}

export default AssetMap
