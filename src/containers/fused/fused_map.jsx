import React, { Component } from 'react';
import ReactMapboxGl, { Marker, Layer, Feature } from "react-mapbox-gl";
import io from "socket.io-client";
import ShipMarker from './marker';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import { CSVLink, CSVDownload } from "react-csv";

// import data from './dummy_data'

class FusedMap extends Component {
  constructor(props) {
    super(props);
    //this.parseData = this.parseData.bind(this);
    const d1 = new Date();
    let d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() - 10);
    this.state = {
      response: false,
      endpoint: 'bobeyes.siriusinsight.io:3002',
      state_data: [],
      startDate: d2,
      endDate: d1,
      map_data: [],
      datePickerDisabled: false,
      loading: false,

    };
    this.socket = io.connect(this.state.endpoint)
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }


  componentDidMount = () => {

    this.socket.on('connected', (data) => {
      this.socket.emit('ready for data', {})
    });
    this.socket.on('update', (data) => {
      const message = data.message.payload
      const result = message.split(",")
      console.log(result)
      let data_packet = this.parseData(result)

      this.setState((state, props) => {
        const updated = data_packet.concat(state.state_data)
        return { state_data: updated };
      });

    });
  }

  handleStartChange(date) {
    this.setState({
      datePickerDisabled: true,
      loading: true,
      startDate: date
    }, () => {
        this.fetchData()
    });

  }

  handleEndChange(date) {
    this.setState({
      datePickerDisabled: true,
      loading: true,
      endDate: date
    }, () => {
        this.fetchData()
    });

  }

  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 19).replace('T', ' ');
  }

  fetchData() {
    
    const url = "https://bobeyes.siriusinsight.io:3333/?psqlQuery="
    const temp_url = "http://10.0.0.43:3333/?psqlQuery="
    const query = `SELECT "Longitude", "Latitude" FROM "Ais" WHERE "TimeLocal" BETWEEN '2019-06-25 12:34:25' AND '2019-06-25 17:34:11'`
    console.log(this.convertDate(this.state.startDate));
    console.log(this.convertDate(this.state.endDate));
    const request = fetch(url+query)
      .then(response=> response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          map_data: data,
          datePickerDisabled: false,
          loading: false
        })
      })
  }


  handleStartChange(date) {
    this.setState({
      datePickerDisabled: true,
      loading: true,
      startDate: date
    }, () => {
      //this.fetchData()
    });

  }

  handleEndChange(date) {
    this.setState({
      datePickerDisabled: true,
      loading: true,
      endDate: date
    }, () => {
      //this.fetchData()
    });

  }

  componentWillMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGFjaGFsbCIsImEiOiJjangwbGc4NzcwMGF0NDJvN3NxZ2QxOTlzIn0.15ElYDfKXCSogk87TVE-GA"
    })

    const today = new Date()
    return (
      <div className="map-wrapper">
          <div className="date-filter-wrapper">
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
              disabled={this.state.datePickerDisabled}
              maxDate={this.state.endDate}
              minDate={1}
              maxTime={this.state.startDate.getDate() === this.state.endDate.getDate() ? this.state.endDate : (new Date(new Date().setHours(23, 59)))}
              minTime={new Date(new Date().setHours(0, 0, 0, 0))}
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
              disabled={this.state.datePickerDisabled}

              maxDate={new Date()}
              minDate={this.state.startDate}
              maxTime={today.getDate() === this.state.endDate.getDate() ? this.state.endDate : (new Date(new Date().setHours(23, 59)))}
              minTime={this.state.startDate.getDate() === this.state.endDate.getDate() ? this.state.startDate : (new Date(new Date().setHours(0, 0, 0, 0)))}
            />
          </div>
          <Map
            style="mapbox://styles/mapbox/dark-v10"
            containerStyle={{
              height: "100%",
              width: "100%"
            }}
            center={[0, 0]}
            zoom={[5]}
          >

          

          <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "harbor-15" }}>


              {this.state.map_data.map((point, i) => <Feature key={i} coordinates={[point.Longitude, point.Latitude]} />)}


            </Layer> 
           <ShipMarker /> 
          </Map>
      </div>);

  }
}
export default FusedMap;
