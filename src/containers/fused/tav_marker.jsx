import React, { Component } from 'react';
import ReactMapboxGl, {Marker} from "react-mapbox-gl";
import io from "socket.io-client";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TAVMarker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat:  51.0214,
      long: 1.39913,
      heading: 0
    }
  }

  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 19).replace('T', ' ');
  }

  fetchTAVHeading = () => {
    const url = "https://pulsarapi.siriusinsight.io/mruquery?"
    const columnname = 'AVG("Heading")'
    const parameters = '"TimeLocal" BETWEEN ' +'\'' + this.props.time_window[0] + '\'' + 'AND' + '\'' + this.props.time_window[1] + '\''
    const query = url + 'columnname=' + columnname + '&parameters=' + parameters
    console.log(query)
    const request = fetch(query)
      .then(response=> response.json())
      .then((data) => {
        // console.log(data[0].avg);
        this.setState({
          heading: data[0].avg
        })
    })
  }

  componentDidMount() {
    this.fetchTAVHeading()

  }

  render() {
    const markerUrl = "https://siriusdashboard.s3.eu-west-2.amazonaws.com/red_arrow.png";
    const markerRotate = {
      transform: `rotate(${this.state.heading}deg)`
    }
    return (
      <Marker
        coordinates={[this.state.long, this.state.lat]}
        anchor="center"

        >
        <img style={markerRotate} className="ship-marker" src={markerUrl}/>
      </Marker>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    time_window: reduxState.time_window
  };
}


export default connect(mapStateToProps, null)(TAVMarker);
