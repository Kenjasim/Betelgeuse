import React, { Component } from 'react';
import { Sunburst } from '@nivo/sunburst';
import {XYPlot, ArcSeries, Hint} from 'react-vis';



class WiFiPingerAnalytics extends Component {
constructor(props) {
    super(props);
    this.state = {
	
			  }
    };

  render(){

	const myData = [
		{angle0: 0, angle: Math.PI / 4.5, radius: 700, radius0: 500, opacity:0.1},
		{angle0: Math.PI / 4.5, angle: 2 * Math.PI / 4.5, radius: 700, radius0: 500},
		{angle0: 2 * Math.PI / 4.5, angle: 3 * Math.PI / 4.5, radius: 700, radius0: 500},
		{angle0: 3 * Math.PI / 4.5, angle: 4 * Math.PI / 4.5, radius: 700, radius0: 500},
		{angle0: 4 * Math.PI / 4.5, angle: 5 * Math.PI / 4.5, radius: 700, radius0: 500},
		{angle0: 5 * Math.PI / 4.5, angle: 6 * Math.PI / 4.5, radius: 700, radius0: 500},
		{angle0: 6 * Math.PI / 4.5, angle: 7 * Math.PI / 4.5, radius: 700, radius0: 500},
		{angle0: 7 * Math.PI / 4.5, angle: 8 * Math.PI / 4.5, radius: 700, radius0: 500},
		{angle0: 8 * Math.PI / 4.5, angle: 9 * Math.PI / 4.5, radius: 700, radius0: 500},
		{angle0: 0, angle: Math.PI / 4.5, radius: 500, radius0: 300, opacity:0.1},
		{angle0: Math.PI / 4.5, angle: 2 * Math.PI / 4.5, radius: 500, radius0: 300},
		{angle0: 2 * Math.PI / 4.5, angle: 3 * Math.PI / 4.5, radius: 500, radius0: 300},
		{angle0: 3 * Math.PI / 4.5, angle: 4 * Math.PI / 4.5, radius: 500, radius0: 300},
		{angle0: 4 * Math.PI / 4.5, angle: 5 * Math.PI / 4.5, radius: 500, radius0: 300},
		{angle0: 5 * Math.PI / 4.5, angle: 6 * Math.PI / 4.5, radius: 500, radius0: 300},
		{angle0: 6 * Math.PI / 4.5, angle: 7 * Math.PI / 4.5, radius: 500, radius0: 300},
		{angle0: 7 * Math.PI / 4.5, angle: 8 * Math.PI / 4.5, radius: 500, radius0: 300},
		{angle0: 8 * Math.PI / 4.5, angle: 9 * Math.PI / 4.5, radius: 500, radius0: 300},
		{angle0: 0, angle: Math.PI / 4.5, radius: 300, radius0: 100, opacity:0.1},
		{angle0: Math.PI / 4.5, angle: 2 * Math.PI / 4.5, radius: 300, radius0: 100},
		{angle0: 2 * Math.PI / 4.5, angle: 3 * Math.PI / 4.5, radius: 300, radius0: 100},
		{angle0: 3 * Math.PI / 4.5, angle: 4 * Math.PI / 4.5, radius: 300, radius0: 100},
		{angle0: 4 * Math.PI / 4.5, angle: 5 * Math.PI / 4.5, radius: 300, radius0: 100},
		{angle0: 5 * Math.PI / 4.5, angle: 6 * Math.PI / 4.5, radius: 300, radius0: 100},
		{angle0: 6 * Math.PI / 4.5, angle: 7 * Math.PI / 4.5, radius: 300, radius0: 100},
		{angle0: 7 * Math.PI / 4.5, angle: 8 * Math.PI / 4.5, radius: 300, radius0: 100},
		{angle0: 8 * Math.PI / 4.5, angle: 9 * Math.PI / 4.5, radius: 300, radius0: 100}
	  ]
	


    return (
	<div className="power-doughnut-section">
		
		<XYPlot
  xDomain={[-200, 200]}
  yDomain={[-200, 200]}
  width={500}
  height={1000}>
  <ArcSeries
	animation
	radiusDomain = {[0,700]}
    center={{x: 0, y: 0}}
    data={myData}
    colorType={'literal'}
	color="#a3a3a3"
	strokeType={'literal'}
	stroke="#ffffff"
	>
	 </ArcSeries>
</XYPlot>

	</div>
	);
}
}

export default WiFiPingerAnalytics;
