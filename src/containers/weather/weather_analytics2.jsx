import React, { Component } from 'react';

import WeatherGeneral from './weather_general'
import WeatherWind from './weather_wind'
import WeatherGraphs from './weather_graphs'


class WeatherAnalytics extends Component {

  render() {
    return (

      <div className="container weather-analytic-container">
        <div className="row">
          <div className="col-12 col-md-6 weather-box1">
            <div className="weather-wrapper">
              <div className="weather-box">
                <WeatherGeneral />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 weather-box2">
            <div className="weather-wrapper">
              <div className="weather-box">
                <WeatherWind />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="weather-wrapper">
              <div className="weather-box">
                <WeatherGraphs />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default WeatherAnalytics;
