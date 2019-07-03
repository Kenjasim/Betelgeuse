import React, { Component } from 'react';
import ReactMapboxGl, { Marker, Layer, Feature, Popup } from "react-mapbox-gl";
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
      startDate: d2,
      endDate: d1,
      map_data: [],
      datePickerDisabled: false,
      loading: false,
    };
    this.socket = io.connect(this.state.endpoint)
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleDateSelected = this.handleDateSelected.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
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
      startDate: date,

      datePickerDisabled: false,
      loading: false,
    }, () => {
        console.log("Date received")
    });

  }

  handleEndChange(date) {
    this.setState({
      datePickerDisabled: true,
      loading: true,
      endDate: date,

      datePickerDisabled: false,
      loading: false,
    }, () => {
        console.log("Date received")
    });

  }
  
  handleDateSelected() {
    this.setState({
      datePickerDisabled: true,
      loading: true,
    }, () => {
      this.fetchData()
      console.log("Data fetched and drawn")
    });
  }
  
  togglePopup(MMSI) {

  }

  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 19).replace('T', ' ');
  }

  fetchData() {
    
    const url = "https://bobeyes.siriusinsight.io:3333/?psqlQuery="
    const temp_url = "http://10.0.0.43:3333/?psqlQuery="
    const query = `SELECT "MMSI", "Longitude", "Latitude" FROM "Ais" WHERE "TimeLocal" BETWEEN '${this.convertDate(this.state.startDate)}' AND '${this.convertDate(this.state.endDate)}'`
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
    
    const layerPaint = {
      'heatmap-weight': {
        property: 'aisPresence',
        type: 'exponential',
        stops: [[1, 0], [62, 1]]
      },
      // Increase the heatmap color weight weight by zoom level
      // heatmap-ntensity is a multiplier on top of heatmap-weight
      'heatmap-intensity': {
        stops: [[11, 1], [15, 3]]
      },
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(33,102,172,0)',
        0.25,
        'rgb(103,169,207)',
        0.5,
        'rgb(209,229,240)',
        0.8,
        'rgb(253,219,199)',
        1,
        'rgb(239,138,98)',
        2,
        'rgb(178,24,43)'
      ],
      // Adjust the heatmap radius by zoom level
      'heatmap-radius': {
        stops: [[11, 5], [15, 20]]
      },
      // Adjust increase of heatmap opacity as user zooms in to make data decluster
      'heatmap-opacity': {
        default: 1,
        stops: [
          [4, 0],
          [6, 1],
          [14, 1],
          [15, 0]
        ]
      },
    };
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
              popperPlacement="bottom-end"
              popperModifiers={{
                flip: {
                    behavior: ['bottom'] // don't allow it to flip to be above
                },
                preventOverflow: {
                    enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                },
                hide: {
                    enabled: false // turn off since needs preventOverflow to be enabled
                }}}

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
              popperPlacement="bottom-end"
              popperModifiers={{
                flip: {
                    behavior: ['bottom'] // don't allow it to flip to be above
                },
                preventOverflow: {
                    enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                },
                hide: {
                    enabled: false // turn off since needs preventOverflow to be enabled
                }}}

              maxDate={new Date()}
              minDate={this.state.startDate}
              maxTime={today.getDate() === this.state.endDate.getDate() ? this.state.endDate : (new Date(new Date().setHours(23, 59)))}
              minTime={this.state.startDate.getDate() === this.state.endDate.getDate() ? this.state.startDate : (new Date(new Date().setHours(0, 0, 0, 0)))}
            />
          </div>

          <button onClick={this.handleDateSelected}>
            Display data
          </button>
          
          <Map
            style="mapbox://styles/mapbox/dark-v10"
            containerStyle={{
              height: "100%",
              width: "100%"
            }}
            center={[1.23917630, 51.01271940]}
            zoom={[5]}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "harbor-15" }}
              minZoom={14}>


              {this.state.map_data.map((point, i) => 
                <Feature 
                  key={i} 
                  coordinates={[point.Longitude, point.Latitude]} 
                  onClick={this.togglePopup(point.MMSI)}
                  />)}
            </Layer>

            <Layer
              type="heatmap"
              id="ais-heat"
              minZoom={5}
              maxZoom={15}
              paint={layerPaint}
              >

              {this.state.map_data.map((point, i) => <Feature key={i} coordinates={[point.Longitude, point.Latitude]} />)}
            
            </Layer>

            <ShipMarker /> 
          </Map>
      </div>);

  }
}
export default FusedMap;
