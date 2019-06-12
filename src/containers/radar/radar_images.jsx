import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import ImageCard from './image_card'
import RadarImageSection from './radar_image_section'
import data from './dummy_data'

class RadarImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      selectedIndex: 0,
      data: data
    };
    this.handleClick = this.handleClick.bind(this);
    // this.selectIndex = this.selectIndex.bind(this);
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
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
  focusDiv() {
    ReactDOM.findDOMNode(this.refs.theDiv).focus();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keySelect, false);
    this.ele.focus();

  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keySelect, false);
  }

  render() {
    return (

      <div className="radar-images-container of-scroll" onKeyDown={this.keySelect}>
        <div className="row display-flex">
          <div className="col-xs-12 col-sm-7">
            <RadarImageSection
              selectedIndex={this.state.selectedIndex}
              radar_image={this.state.data[this.state.selectedIndex]}
              toggleNext={this.selectNext}
              togglePrev={this.selectPrev}
              max={this.state.data.length}
            />
          </div>
          <div className="col-xs-12 col-sm-5">
            <div className="radar-selection-section">
              <div className="radar-selection-search">
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                />
              </div>
              <div className="radar-images-list"
                tabIndex="-1"
                ref={(element) => { this.ele = element; }}
              >
                <div className="overflow-wrapper">
                </div>
                {this.state.data.map((radar_image, index) => {
                  let style = index%2 == 0 ? "radar-image-card" : "radar-image-card card-odd"
                  if (index == this.state.selectedIndex) {
                    style += " card-selected"
                  }
                  return (
                    <ImageCard
                      key={radar_image.time_local}
                      style={style} index={index}
                      time_local={radar_image.time_local}
                      scale={radar_image.scale}
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
