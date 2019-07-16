import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { Line } from 'react-chartjs-2';

class WeatherGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth() , new Date().getDate()),
      current_tab: "Temperature",
      graph_data: {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            fill: false,          // Don't fill area under the line
            borderColor: '#1D1955'  // Line color
          }
        ],
      }


    };
    this.handleClick = this.handleClick.bind(this);
    // this.selectIndex = this.selectIndex.bind(this);
  }

  handleChange = (date) => {
    this.setState({ startDate: date }, () => {
      // this.fetchData()

      console.log("weather graph date changed")
    });

  }

  handleClick = (e) => {
    // console.log(e.target.dataset.index)
    console.log("here")
    this.setState({
      selectedIndex: e.target.dataset.index,
      // selectedImage: e.target
    })
  }

  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 10).replace('T', ' ');
  }

  switchDataTab = (e) => {
    this.setState({current_tab: e.target.innerHTML})
  }

  render() {
    return (
      <div className="weather-graph-section">
        <div className="weather-query-wrapper">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
          <div className="weather-graph-options">
            {
              ["Temperature", "Wind Speed", "Humidity", "Pressure"].map((tab) => {
                let classes = "weather-option-btn2"
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
        <div className="weather-graph-wrapper">
          <Line
              data={this.state.wind_data}
              height={"100%"}
              width={"100%"}
              options={{
                maintainAspectRatio: false,
                axes: {
                  display: false
                }
              }}
          />
        </div>
      </div>
    )
  }
}
export default WeatherGraphs;
