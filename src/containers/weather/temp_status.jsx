import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import io from "socket.io-client";
//import WeatherIcon from 'react-icons-weather';
//Optional include of the default css styles 
//import 'react-open-weather/lib/css/ReactWeather.css';
import moment from 'moment';
import ReactInterval from 'react-interval';



class TempStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curr_temp: 0,
      curr_pressure: 0,
      curr_hum: 0,
      curr_alt: 0,
      iconid: '',
      weather_status: '',
      status: "Connected",
      response: false,
      weather_endpoint: 'http://bobeyes.siriusinsight.io:3000'
    }
    this.socket = io.connect(this.state.weather_endpoint)
  }

  //Fetches the weather to style the icon
  fetchWeatherMessage()
  {
    const query = 'http://api.openweathermap.org/data/2.5/weather?lat=51.01271940&lon=1.23917630&APPID=f300656fa853f1035be46b19ff4a6b67'
    const request = fetch(query)
      .then(response=> response.json())
      .then((data) => {
        let tempdata = []
        data.weather.map((point, i) => (tempdata = point));
        this.setState({
          iconid: tempdata.icon,
          weather_status: tempdata.main,
        })
      })
  }
  //Opens the socket on the server and gets the relevent data from the server
  openTempSocket() {
    this.socket.on('connected',  (data) => {
        this.socket.emit('ready for data', {})
      });
      this.socket.on('update',  (data) => {
        const message = data.message.payload
        const result = message.split(",")
        this.setState({
          curr_temp: result[6],
          curr_pressure: result[7],
          curr_hum: result[5],
          curr_alt: result[8]

        })

    });
  }

  componentDidMount() {
    this.openTempSocket()
    this.fetchWeatherMessage()
  }
  componentWillUnmount() {
    this.socket.disconnect()
    // clearInterval(don_int)
  }
  test() {
    console.log('test')
  }

  render() {
    return (
      <div className="weather-box">
        <div className="boxstatus">
              Weather Status:
        </div>
        <div className="weather-box-top">
          <div className="image-container">
            <img src={'http://openweathermap.org/img/wn/'+ this.state.iconid+ '@2x.png'} class={"center"}></img>
          </div>
          <div className="temp-text-container">
            {this.state.curr_temp}°C
          </div>
          
          
        </div>
        <div className="weather-box-bottom">
          <div className="weather-text">
            Air Pressure: {this.state.curr_pressure} <br/>
            Humidity: {this.state.curr_hum}<br/>
            Altitude: {this.state.curr_alt}
          </div>

        </div>

      </div>

    );
  }
}

export default TempStatus;
