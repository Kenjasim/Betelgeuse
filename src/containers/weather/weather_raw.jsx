import React, { Component } from 'react';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import moment from 'moment'


// import data from './dummy_data'

class WeatherRaw extends Component {
  constructor(props) {
    super(props);
    const d1 = new Date();
    let d2 = new Date ( d1 );
    d2.setMinutes ( d1.getMinutes() - 10 );
    this.state = {
      startDate: d2,
      endDate: d1,
      state_data: []
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    // this.handleMinTime = this.handleMinTime.bind(this);
  }



  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 19).replace('T', ' ');
  }

  fetchData() {
    console.log(this.convertDate(this.state.endDate))
    const url = "http://217.138.134.182:3333/?psqlQuery="
    const temp_url = "http://10.0.0.43:3333/?psqlQuery="
    const query = `SELECT * FROM "Weather" WHERE "TimeLocal" BETWEEN '${this.convertDate(this.state.startDate)}' AND '${this.convertDate(this.state.endDate)}'`
    const request = fetch(url+query)
      .then(response=> response.json())
      .then((data)=> {
        data.sort(function(a, b){
          return new Date(b.TimeLocal) - new Date(a.TimeLocal);
        });
        this.setState({
          state_data: data
        })
      })
  }
   handleStartChange(date) {
    this.setState({ startDate: date }, () => {
        this.fetchData()
    });
  }


  handleEndChange(date) {
    this.setState({ endDate: date }, () => {
        this.fetchData()
    });
  }

  componentWillMount() {
    this.fetchData()
  }


  render() {
    const columns = [{
        Header: 'Time Local',
        accessor: 'TimeLocal',
        width: 200
      },{
        Header: 'Wind Direction',
        accessor: 'WindDirection',
        width: 115
      },{
        Header: 'Wind Speed',
        accessor: 'WindSpeed'
      },{
        Header: 'Humidity',
        accessor: 'Humidity'
      },{
        Header: 'Temperature',
        accessor: 'Temperature'
      },{
        Header: 'Air Pressure',
        accessor: 'AirPressure'
      },{
        Header: 'Altitude',
        accessor: 'Altitude'
      },
    ]
    return (
      <div className="table-wrapper">
        <div className="date-filter-wrapper">
          <div></div>
          <div className="date-filter-section">
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"

              maxDate={this.state.endDate}
              minDate={1}
              maxTime={this.state.startDate.getDate() === this.state.endDate.getDate() ? this.state.endDate : (new Date(new Date().setHours(23,59)))}
              minTime={new Date(new Date().setHours(0,0,0,0))}
            />
            <div className="date-to">
            to
            </div>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleEndChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"

              maxDate={new Date ()}
              minDate={this.state.startDate}
              maxTime={new Date ()}
              minTime={this.state.startDate.getDate() === this.state.endDate.getDate() ? this.state.startDate : (new Date(new Date().setHours(0,0,0,0)))}
            />
          </div>
        </div>
        <div className="">
          <ReactTable
            data={this.state.state_data}
            columns={columns}

            defaultPageSize={13}
            showPageSizeOptions={false}
            filterable={true}/>
        </div>
      </div>

    );
  }
}

export default WeatherRaw;
