import React, { Component } from 'react';

class ImageCard extends Component {
  constructor(props) {
    super(props)
  }

  giveIndex = () => {
    this.props.toggleIndex(this.props.index)
  }

  render() {

    return (
      <div className={this.props.style} key={this.props.time_local} onClick={this.giveIndex}>
        <p>{this.props.time_local}</p>
        <p>Scale: {this.props.scale}nm</p>
      </div>

    );
  }
}

export default ImageCard;
