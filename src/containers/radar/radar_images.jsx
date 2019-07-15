import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment'


import ImageCard from './image_card'
import RadarImageSection from './radar_image_section'
import dummyData from './dummy_data'

class RadarImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()),
      selectedIndex: 0,
      data: [{ TimeLocal: 'NaN',
      Range: 15, 
     FilePath: ""}]
    };
    this.handleClick = this.handleClick.bind(this);
    // this.selectIndex = this.selectIndex.bind(this);
  }

  handleChange = (date) => {
    this.setState({ startDate: date }, () => {
      this.fetchData()
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

  selectIndex = (index) => {
    this.setState({
      selectedIndex: index
    })
  }

  selectNext = () => {
    if (this.state.selectedIndex > 0) {
      this.setState({
        selectedIndex: this.state.selectedIndex-1
      })
    }
  }

  selectPrev = () => {
    if (this.state.selectedIndex < this.state.data.length - 1) {
      this.setState({
        selectedIndex: this.state.selectedIndex+1
      })
    }
  }

  keySelect = (e) => {
    console.log(e.key)
    if (e.key == 'ArrowUp' || e.key == 'ArrowRight') {
      this.selectNext()
    } else if (e.key == 'ArrowDown' || e.key == 'ArrowLeft') {
      this.selectPrev()
    }
  }
  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 10).replace('T', ' ');
  }
  //executes a query to the database from the server
  fetchData() {
    console.log(this.convertDate(this.state.endDate))
    const url = "https://bobeyes.siriusinsight.io:3333/?psqlQuery="
    const temp_url = "http://10.0.0.43:3333/?psqlQuery="
    let d = new Date()
    //The SQL query which gets all the Radar Data froma certain time which is defined by the timw picker
    const query = `SELECT * FROM "RadarImage" WHERE "TimeLocal" > '${this.convertDate(this.state.startDate)}' AND "TimeLocal" < '${this.convertDate(d.setDate(this.state.startDate.getDate() + 1))}'`
    const request = fetch(url+query)
    //console.log(url)
      .then(response=> response.json())
      .then((data) => {
          this.setState({
            //sets the data recieved by the query as the data to show
            data: data,
          })
        console.log(this.state.data)
      })
  }


  componentDidMount() {
    document.addEventListener("keydown", this.keySelect, false);
    let d = new Date()
    console.log(this.convertDate(d.setDate(this.state.startDate.getDate() + 1)));
    this.fetchData();
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.keySelect, false);
  }

  render() {
    return (

      <div className="radar-images-container of-scroll" onKeyDown={this.keySelect}>
        <div className=" display-flex">
          <div className="col-12 col-sm-12 col-md-5">
            <RadarImageSection
              //imageFile={}
              selectedIndex={this.state.selectedIndex}
              radar_image={this.state.data[this.state.selectedIndex]}
              toggleNext={this.selectNext}
              togglePrev={this.selectPrev}
              max={this.state.data.length}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-7">
            <div className="radar-selection-section">
              <div className="radar-selection-search">
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                />
              </div>
              <div className="radar-images-list">
                <div className="overflow-wrapper">
                </div>
                {this.state.data.map((radar_image, index) => {
                  let style = index%2 == 0 ? "radar-image-card" : "radar-image-card card-odd"
                  if (index == this.state.selectedIndex) {
                    style += " card-selected"
                  }
                  return (
                    <ImageCard
                      key={radar_image.TimeLocal}
                      style={style} index={index}
                      time_local={radar_image.TimeLocal}
                      scale={radar_image.Range}
                      toggleIndex={this.selectIndex}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default RadarImages;
