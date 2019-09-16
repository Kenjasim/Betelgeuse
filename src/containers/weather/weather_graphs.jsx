import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class WeatherGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth() , new Date().getDate()),
      current_tab: "Temperature",
      dropdownOpen: false,
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
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.selectIndex = this.selectIndex.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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
    const query_map = {
      "Temperature": ["Temperature", true],
      "Wind Speed": ["WindSpeed", true],
      "Air Pressure": ["AirPressure", true],
      "Humidity": ["Humidity", true],
      "Heading": ["Heading", false],
      "Roll": ["Roll", false],
      "Pitch": ["Pitch", false]
    }
    const query_word = query_map[this.state.current_tab][0]
    const query_pointer = query_map[this.state.current_tab][1]
    let query = ""
    query_pointer ?
      query = `https://pulsarapi.siriusinsight.io/weatherquery?columnname= "TimeLocal", "${query_word}"&parameters= "TimeLocal" BETWEEN '${this.convertDate(this.state.startDate).slice(0,10)} 00:00:01' AND '${this.convertDate(this.state.startDate).slice(0,10)} 23:59:59'&limits="TimeLocal" desc`
      : query = `https://pulsarapi.siriusinsight.io/mruquery?columnname= "TimeLocal", "${query_word}"&parameters="TimeLocal" BETWEEN '${this.convertDate(this.state.startDate).slice(0,10)} 00:00:01' AND '${this.convertDate(this.state.startDate).slice(0,10)} 23:59:59'&limits="TimeLocal" desc`
      console.log(query)
    const request = fetch(query)
      .then(response=> response.json())
      .then((data) => {
        const n = data.length;
        const labels = Array(n).join(".").split(".")


        const outputData = data.map( Object.values );
        let chart_data = outputData.map(a => a[1]);
        let chart_times = outputData.map(a => a[0])

        let color1 = '#FFCC00'
        let color2 = '#FFF5CC'
        let title = 'Temperature °C'

        switch (this.state.current_tab) {
          case 'Temperature':
            console.log(this.state.current_tab)
            break
          case 'Wind Speed':
            color1 = '#5198F4'
            color2 = '#E7F1FC'
            title = 'Wind Speed m/s'
            break
          case 'Humidity':
            color1 = 'rgb(217,217,217)'
            color2 = 'rgba(217,217,217, 0.3)'
            title = 'Humidity %'
            break
          case 'Air Pressure':
            color1 = '#E15554'
            color2 = 'rgba(225, 85, 84, 0.3)'
            title = 'Air Pressure Pa'
            break
          case 'Heading':
            color1 = 'rgb(241,227,243)'
            color2 = 'rgba(241,227,243, 0.3)'
            title = 'Heading °'
            break
          case 'Pitch':
            color1 = 'rgb(194,187,240)'
            color2 = 'rgba(194,187,240, 0.3)'
            title = 'Pitch °'
            break
          case 'Roll':
            color1 = 'rgb(143,184,237)'
            color2 = 'rgba(143,184,237, 0.3)'
            title = 'Roll °'
            break
        }


        this.setState({
          graph_data: {
            labels: chart_times,
            datasets: [
              {
                label: title,
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
            maxDate={new Date ()}
            className="weather-datepicker"
          />
          <div className="weather-graph-options">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="weather-dropdown">
              <DropdownToggle caret>
                {this.state.current_tab}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.switchDataTab}>Temperature</DropdownItem>
                <DropdownItem onClick={this.switchDataTab}>Wind Speed</DropdownItem>
                <DropdownItem onClick={this.switchDataTab}>Air Pressure</DropdownItem>
                <DropdownItem onClick={this.switchDataTab}>Humidity</DropdownItem>
                <DropdownItem onClick={this.switchDataTab}>Heading</DropdownItem>
                <DropdownItem onClick={this.switchDataTab}>Roll</DropdownItem>
                <DropdownItem onClick={this.switchDataTab}>Pitch</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {
              ["Temperature", "Wind Speed", "Air Pressure", "Humidity", "Heading", 'Roll', "Pitch"].map((tab) => {
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
