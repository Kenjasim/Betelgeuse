import React, {Component} from 'react';
import DatePicker from "react-datepicker";

import CameraDataCard from './camera_data_card';

//import data from './dummy_data'
import moment from 'moment';


class CameraIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      data: []
    };
    this.handleChange = this.handleChange.bind(this);
  }



  handleChange(date) {
    this.setState({ startDate: date }, () => {
      this.fetchData()
    });

  }
  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 10).replace(/-/g, '/');
  }

  //Queries the camera server to get the images which are in the server
  fetchData() {
    console.log(this.convertDate(this.state.startDate))
    //Passes the query which is just the date and time into the API
    const temp_url = "http://10.0.0.43:6003/"
    const url = "https://bobeyes.siriusinsight.io:3006/"
    const query = this.props.id + '/' + this.convertDate(this.state.startDate) + '/';
    console.log(url+query)
    const request = fetch(temp_url+query)
      .then(response=> response.json())
      .then((data) => {
        console.log(data)
        this.setState({ data: data}, () => {
          this.props.setFiles(this.state.data)
        })
        // console.log(this.state.data)
        // console.log(this.state.data[1].slice(27,30))
        //console.log(('http://217.138.134.182:3006/'+ this.props.id + '/' + this.convertDate(this.state.startDate) + '/' +this.state.data[1]).duration)
      })
  }

  componentDidMount() {
    this.fetchData()
  }


  render () {

    return (
      <div className="camera-index">
        <div className="camera-datepicker-container">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>
        <div className="camera-list-container of-scroll">
          {this.state.data.map((camera_card, index) => {
            let style = index%2 == 0 ? "camera-image-card card-odd" : "camera-image-card"
            const url = 'https://bobeyes.siriusinsight.io:3006/'+ this.props.id + '/' + this.convertDate(this.state.startDate) + '/' + camera_card
            const temp_url = 'http://10.0.0.43:6003/'+ this.props.id + '/' + this.convertDate(this.state.startDate) + '/' + camera_card
            return (
              <CameraDataCard
                key={camera_card}
                style={style}
                index={index}
                timestamp={camera_card.slice(12,25)}
                type={camera_card.slice(27,30)}
                filepath={temp_url}
                filename={temp_url}
                duration={camera_card.slice(27,30)}
                switchFile={this.props.switchFile}
                index={index}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default CameraIndex;
