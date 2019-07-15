import React, { Component } from 'react';

class WeatherGeneral extends Component {
  render() {
    return (
      <div>
        <div className="weather-gen-top">
          <div className="weather-text weather-title">
            The Varne, English Channel
          </div>
          <div className="weather-text weather-title">
            51.1, 1.08
          </div>
          <div className="weather-text weather-sub">
            Monday
          </div>
          <div className="weather-text weather-sub">
            Overcast
          </div>
        </div>
      </div>
    )
  }
}
export default WeatherGeneral;
