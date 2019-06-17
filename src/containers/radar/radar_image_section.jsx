import React, { Component } from 'react';

class RadarImageSection extends Component {

  render() {
    let prev_style = this.props.selectedIndex == this.props.max -1 ? "radar-image-btn radar-btn-disabled" : "radar-image-btn radar-image-hover"
    let next_style = this.props.selectedIndex == 0 ? "radar-image-btn radar-btn-disabled" : "radar-image-btn radar-image-hover"
    let style = {
      backgroundImage: `url(${"http://217.138.134.182:3005" + this.props.radar_image.FilePath})`
    }
    return (

      <div className="radar-image-section">
        <div className="radar-image" >
          <img className="radar-img" src={"http://217.138.134.182:3005" + this.props.radar_image.FilePath} ></img>
        </div>
        <div className="image-footer">
          <button className={prev_style} onClick={this.props.togglePrev}>
            Previous
          </button>
          <div className="radar-image-info">
            <p>{this.props.radar_image.TimeLocal}</p>
            <p>Scale: {this.props.radar_image.Range}nm</p>
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
