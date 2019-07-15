import React, { Component } from 'react';

import WindMap from './wind_map'

class WeatherWind extends Component {
  render() {
    return (
      <div className="full-height">
        <div className="wind-title">Wind</div>
        <div className="vertical-half weather-flex">
          <div className="width-60">
            <p>live graph</p>
          </div>
          <div className="width-40">
            <p>compass</p>
          </div>
        </div>
        <div className="vertical-half">

            <WindMap />

        </div>
      </div>
    )
  }
}
export default WeatherWind;
