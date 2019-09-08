import React, { Component } from 'react';
import {XYPlot, ArcSeries, Hint, FlexibleXYPlot, Crosshair} from 'react-vis';

class DFAnalytic extends Component {

  constructor(props) {
		super(props);
		this.state = {
			data: [{angle:0,
					angle0: 0,
					radius: 0,
					radius0: 0}],
			value: false,
			datapoint: null,
			state_data: [],
			loading: true,
			sector_data: []
		};
	}

	updateData = () => {
		const divider = 4.5;
		const PI = Math.PI;
		const myData = [...new Array(360)].map((row, index) => {
			return {
				
				radius0: 300,
				radius: 700,
				angle0: (index * PI) / 180,
				angle: (index + 1) * (PI / 180),
				padAngle: 100,
				id: index
				
			};
		});

		this.setState({data: myData})
	}

  componentDidMount() {
		this.updateData()
	}
	
  render() {
    return (
<div>
      <p>DFAnalytic</p>
      <XYPlot
  xDomain={[-650, 750]}
  yDomain={[-1200, 1200]}
  width={500}
  height={800}
  position = {'relative'}
  >
	 
  <ArcSeries
	radiusDomain = {[0,700]}
	radiusType = {'linear'}
	center={{x: 0, y: 0}}
	positiion = {'relative'}
	data={this.state.data.map(datapoint => {
		if (this.state.value && this.state.value.id === datapoint.id) {
		  return {...datapoint, style: {stroke: 'black', strokeWidth: '3px'}
			 };
		}
		return datapoint;
	  })}
	colorType={'literal'}
	color="#34bdeb"
	strokeType={'literal'}
	stroke="#ffffff"
	onValueClick={(datapoint) => {
		this.handleHover(datapoint),

		console.log(datapoint.id, datapoint.angle0, datapoint.angle, (Math.PI) / 4.5)
	}}
	//onSeriesMouseOut={() => this.setState({value: false})}
	>
	
	 </ArcSeries>
	 
</XYPlot>
</div>
    );
  }
}

export default DFAnalytic;
