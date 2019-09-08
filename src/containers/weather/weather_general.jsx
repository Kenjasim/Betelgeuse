import React, { Component } from 'react';
import io from "socket.io-client";
import moment from 'moment';

class WeatherGeneral extends Component {

  constructor(props) {
    super(props)
    this.state = {
      long: 0,
      lat: 0,
      curr_temp: 0,
      curr_pressure: 0,
      curr_hum: 0,
      curr_alt: 0,
      iconid: '',
      weather_status: '',
      status: "Connected",
      response: false,
      current_tab: "Temp (°C)",
      weather_endpoint: 'http://pulsar.siriusinsight.io:5555/weather',
      historical_array: [{}]
    }
    this.socket = io.connect(this.state.weather_endpoint)
  }


  fetchWeatherMessage() {
    const query = 'http://api.openweathermap.org/data/2.5/weather?lat=51.01271940&lon=1.23917630&APPID=f300656fa853f1035be46b19ff4a6b67'
    const request = fetch(query)
      .then(response=> response.json())
      .then((data) => {
        let tempdata = []
        data.weather.map((point, i) => (tempdata = point));
        this.setState({
          iconid: tempdata.icon,
          weather_status: tempdata.description,
        })
      })
  }

  fetchGPS() {
    const url = "http://pulsar.siriusinsight.io:3333/gpsquery?"
    let columnname = '*'
    let limits = '"ID" desc LIMIT 1'
    let query = url + 'columnname=' + columnname + '&limits=' + limits
    const request = fetch(query)
      .then(response=> response.json())
      .then((data) => {
        console.log(data)
        this.setState({
          long: data[0].Longitude,
          lat: data[0].Latitude,
        })
    })
  }

  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 10)
  }

  parseDate(date) {
    const split = date.split('-')
    return `${split[2]}/${split[1]}`
  }

  fetchHistorical() {
    const query_map = {
      "Temp (°C)": "Temperature",
      "Wind (m/s)": "WindSpeed",
      "Humidity (%)": "Humidity",
      "Altitude (m)": "Altitude"
    }
    const query_word = query_map[this.state.current_tab]
    const index_array = Array(5).fill().map((_, i) => i);
    const date_array = index_array.map((day) => {
      let d = new Date()
      d.setDate(d.getDate() - day)
      return(this.convertDate(d))
    })
    const url = "http://pulsar.siriusinsight.io:3333/weatherdashboard?"
    let queries = []
    date_array.forEach((date) => {
      queries.push(`SELECT ROUND(AVG("${query_word}")::numeric,0), MAX("${query_word}"), MIN("${query_word}") FROM "Weather" WHERE "TimeLocal" BETWEEN '${date} 00:00:01' AND '${date} 23:59:59'`)
    })
    const query = queries.join(" UNION ALL ")

    const request = fetch(url+'query='+query)
      .then(response=> response.json())
      .then((data) => {
        console.log(data)
        data.forEach((a, i) => {
          a.date = this.parseDate(date_array[i])
        })
        console.log(data)

        this.setState({
          historical_array: data.reverse()
        })
    })

  }

  //Opens the socket on the server and gets the relevent data from the server
  openWeatherSocket() {
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
          curr_alt: result[8],
          curr_wind: result[4]

        })

    });
  }

  componentDidMount() {
    this.openWeatherSocket()
    this.fetchWeatherMessage()
    this.fetchGPS()
    this.fetchHistorical()
  }
  componentWillUnmount() {
    this.socket.disconnect()
    // clearInterval(don_int)
  }

  getHistoric = () => {
    return (
      [
        {date: "11/7", avg: 20, high: 26, low: 16},
        {date: "12/7", avg: 24, high: 28, low: 20},
        {date: "13/7", avg: 28, high: 30, low: 26},
        {date: "14/7", avg: 24, high: 25, low: 23},
        {date: "15/7", avg: 24, high: 28, low: 20}

      ]
    )
  }

  switchDataTab = (e) => {
    this.setState({current_tab: e.target.innerHTML}, () => {
      this.fetchHistorical()
    })

  }

  render() {
    const historic_array = this.getHistoric()
    const days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return (
      <div className="weather-general">

        <div className="weather-gen-top">
          <div className="weather-text weather-title">
            The Varne, English Channel
          </div>
          <div className="weather-text weather-title">
            {(this.state.long / 100).toFixed(2)}, {(this.state.lat / 100).toFixed(2)}
          </div>
          <div className="weather-text weather-sub">
            {days[new Date(new Date).getDay()]}
          </div>
          <div className="weather-text weather-sub">
            {this.state.weather_status}
          </div>
        </div>

        <div className="weather-gen-middle">
          <div className="middle-left">
            <img src={'http://openweathermap.org/img/wn/'+ this.state.iconid+ '@2x.png'} className=""></img>
            <div className="flex">
              <div className="live-temp">{this.state.curr_temp}</div>
              <div className="temp-symbol-div">°C</div>
            </div>
          </div>
          <div className="middle-right">
            <div>
              <div className="weather-text weather-sub">
                Relative Humidity: {this.state.curr_hum} %
              </div>
              <div className="weather-text weather-sub">
                Wind Speed: {this.state.curr_wind} m/s
              </div>
              <div className="weather-text weather-sub">
                Pressure: {this.state.curr_pressure} Pa
              </div>
              <div className="weather-text weather-sub">
                Altitude: {this.state.curr_alt} m
              </div>
            </div>
          </div>
        </div>

        <div className="weather-gen-bottom">
          <div className="seperator">
            <div id="reduce-font" className="weather-text weather-sub">
              Past (average, high, low):
            </div>
            <div className="weather-options">
              {
                ["Temp (°C)", "Wind (m/s)", "Humidity (%)", "Altitude (m)"].map((tab) => {
                  let classes = "weather-option-btn"
                  if (this.state.current_tab == tab) {
                    classes += " weather-selected"
                  }
                  return (
                    <div className={classes} onClick={this.switchDataTab} key={tab}>{tab}</div>

                  )
                })
              }
            </div>
          </div>
          <div className="historical-wrapper">
            {this.state.historical_array.map((historic_obj) => {
              return (
                <div className="historical-box" key={historic_obj.date}>
                  <div className="weather-text">{historic_obj.date}</div>
                  <div className="historic-data">
                    <div className="weather-avg">{historic_obj.round}</div>
                    <div className="historical-right">
                      <div className="weather-high high-and-low weather-text">{historic_obj.max}</div>
                      <div className="weather-low high-and-low weather-text">{historic_obj.min}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    )
  }
}
export default WeatherGeneral;
