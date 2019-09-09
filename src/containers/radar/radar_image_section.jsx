import React, { Component } from 'react';

class RadarImageSection extends Component {

  render() {
    let prev_style = this.props.selectedIndex == this.props.max -1 ? "radar-image-btn radar-btn-disabled" : "radar-image-btn radar-image-hover"
    let next_style = this.props.selectedIndex == 0 ? "radar-image-btn radar-btn-disabled" : "radar-image-btn radar-image-hover"
    let Date = this.props.date
    console.log(Date)
    let TimeLocal = ""
    let Range = ""
    try{
      let style = {
        backgroundImage: `url(${"https://pulsarapi.siriusinsight.io/radar?" +'date=' + this.props.date + '&image='  + this.props.radar_image})`
      }
    }catch
    {

    }

    return (

      <div className="radar-image-section">
        <div className="radar-image" >
          <img className="radar-img" src={"https://pulsarapi.siriusinsight.io/radar?" +'date=' + this.props.date + '&image='  + this.props.radar_image} ></img>
        </div>
        <div className="image-footer">
          <button className={prev_style} onClick={this.props.togglePrev}>
            Previous
          </button>
          <div className="radar-image-info">
            <p>{TimeLocal}</p>
            <p>Scale: {Range}nm</p>
          </div>
          <button className={next_style} onClick={this.props.toggleNext}>
            Next
          </button>
        </div>
      </div>

    );
  }
}

export default RadarImageSection;
