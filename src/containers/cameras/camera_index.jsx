import React, {Component} from 'react'
import DatePicker from "react-datepicker";

import CameraDataCard from './camera_data_card'

import data from './dummy_data'

class CameraIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      state_data: data
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
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
          {this.state.state_data.map((camera_card, index) => {
            let style = index%2 == 0 ? "camera-image-card card-odd" : "camera-image-card"
            return (
              <CameraDataCard
                key={camera_card.timestamp}
                style={style}
                index={index}
                timestamp={camera_card.timestamp}
                type={camera_card.type}
                filename={camera_card.filename}
                duration={camera_card.duration}
                switchFile={this.props.switchFile}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default CameraIndex;
