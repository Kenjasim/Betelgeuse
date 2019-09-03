import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { TiMediaPlay } from "react-icons/ti";

const PrettoSlider = withStyles({
  root: {
    color: '#26AAE2',
    height: 8,
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -5,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);


class AssetSlider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0

    }
  }

  setValue = (value) => {
    this.setState({value: value})

  }

  handleChange = (event, newValue) => {
    this.setValue(newValue);
  };


  render() {

    return (
      <div className="asset-play-section">
        <TiMediaPlay className="asset-play-btn"/>

        <PrettoSlider value={this.state.value} onChange={this.handleChange} aria-labelledby="continuous-slider" />
      </div>
    )
  }
}

export default AssetSlider
