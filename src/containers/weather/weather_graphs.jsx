import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

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
      this.fetchData()

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
    this.setState({current_tab: e.target.innerHTML}, () => {
      this.fetchData()

    })
  }

  fetchData = () => {
    const url = "http://bobeyes.siriusinsight.io:3333/?psqlQuery="
    const query = `SELECT "TimeLocal", "${this.state.current_tab}" FROM "Weather" WHERE "TimeLocal" BETWEEN '${this.convertDate(this.state.startDate).slice(0,10)} 00:00:01' AND '${this.convertDate(this.state.startDate).slice(0,10)} 23:59:59' AND "ID" %2530 = 0 ORDER BY "TimeLocal" desc`
    console.log(query)
    const request = fetch(url+query)
      .then(response=> response.json())
      .then((data) => {
        const n = data.length;
        const labels = Array(n).join(".").split(".")


        const outputData = data.map( Object.values );
        let chart_data = outputData.map(a => a[1]);
        let chart_times = outputData.map(a => a[0])

        let color1 = '#FFCC00'
        let color2 = '#FFF5CC'

        switch (this.state.current_tab) {
          case 'Temperature':
            console.log(this.state.current_tab)
            break
          case 'WindSpeed':
            color1 = '#5198F4'
            color2 = '#E7F1FC'
        }


        this.setState({
          graph_data: {
            labels: chart_times,
            datasets: [
              {
                label: this.state.current_tab,
                data: chart_data,
                fill: true,
                backgroundColor: color2,
                borderColor: color1,
                pointBackgroundColor: color1,
                pointBorderColor: color1,
                pointRadius: 1.5
              }
            ],
          }
        })
      })
  }

  componentDidMount() {
    this.fetchData()
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
              ["Temperature", "WindSpeed", "Humidity", "Pressure"].map((tab) => {
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
              data={this.state.graph_data}

              options={{
                maintainAspectRatio: false,
                lineTension: 0,
                scales: {
                  xAxes: [{
                    gridLines: {
                      display:false
                    },
                        type: 'time',
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20
                    }
                  }],
                  yAxes: [{
                      gridLines: {
                          display:false
                      }
                  }]
                }
              }}
          />
        </div>
      </div>
    )
  }
}
export default WeatherGraphs;
