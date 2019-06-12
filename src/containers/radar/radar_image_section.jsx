import React, { Component } from 'react';

class RadarImageSection extends Component {

  render() {
    let prev_style = this.props.selectedIndex == this.props.max -1 ? "radar-image-btn radar-btn-disabled" : "radar-image-btn radar-image-hover"
    let next_style = this.props.selectedIndex == 0 ? "radar-image-btn radar-btn-disabled" : "radar-image-btn radar-image-hover"

    return (

      <div className="radar-image-section">
        <div className="radar-image">
        </div>
        <div className="image-footer">
          <button className={prev_style} onClick={this.props.togglePrev}>
            Previous
          </button>
          <div className="radar-image-info">
            <p>{this.props.radar_image.time_local}</p>
            <p>Scale: {this.props.radar_image.scale}nm</p>
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
