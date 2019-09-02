import React, { Component } from 'react';
import {XYPlot, ArcSeries, Hint, FlexibleXYPlot, Crosshair} from 'react-vis';
import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';
import ReactTable from 'react-table';



export default class WiFiPingerAnalytics extends Component {

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
			loading: true
		};
	}

	updateData = () => {
		const divider = 4.5;
		const PI = Math.PI;
		const myData = [...new Array(9)].map((row, index) => {
			return {
				
				radius0: index <= 26 && index > 17 ? 500 : (index <= 17 && index > 8 ?  300 : 100),
				radius: index <= 26 && index > 17 ? 700 : (index <= 17 && index > 8 ?  500 : 300),
				angle0: (index * PI) / divider,
				angle: (index + 1) * (PI / divider),
				id: index
				
			};
		});

		this.setState({data: myData})
	}

    fetchData() {
		const url1 = "http://bobeyes.siriusinsight.io:3332/?psqlQuery="
		const url2 = "content.siriusinsight.io/?psqlQuery="
		const temp_url = "http://10.0.0.43:3332/?psqlQuery="
		const tablequery = 'CREATE TEMP TABLE "matched_ships" ("ESSID" TEXT, "Matched Ships" TEXT)'
		const fakedata = 'INSERT INTO "matched_ships" ("ESSID", "Matched Ships") VALUES (\'STOC MARCIA\', null)'
		const query = `SELECT "ESSID" FROM "WifiPinger" WHERE "Last time seen" BETWEEN '2019-08-21 12:20' AND '2019-08-21 12:30' ORDER BY "Last time seen" desc`
		const query2 = 'SELECT * FROM "static_0819" WHERE "vessel_name" = \''

		console.log(query)
		fetch(temp_url + tablequery)
		  .then(response=> response.json())
		  .then((shipdata) => {
			this.setState({
				state_data: shipdata
			})
		  })

		fetch(temp_url + fakedata)
		  .then(response=> response.json())
		  .then((shipdata) => {
			this.setState({
				state_data: shipdata,
				loading:false
			})
		  })

		 console.log(fakedata)

		

	  }



   buildValue(hoveredvalue) {
		const {radius, angle, angle0} = hoveredvalue;
		const truedAngle = (angle + angle0) / 2;
		console.log(radius, angle, angle0, truedAngle);
		return {
		  y: radius * Math.cos(truedAngle),
		  x: radius * Math.sin(truedAngle)
		  
		};
	  }

	handleHover = (v) => {
		this.setState({value: v, datapoint: v})
	}
  
	
	componentDidMount() {
		this.updateData()
	}
	
	  componentWillMount() {
		this.fetchData()
	  }

	
	render(){
		
		const columns = [{
			Header: 'BSSID',
			accessor: 'BSSID'
		  },{
			Header: 'Last Time Seen',
			accessor: 'Last time seen',
			width: 200
		  },{
			Header: 'ESSID',
			accessor: 'ESSID'
		  },{
			Header: 'Type',
			accessor: 'Type'
		  }, 	]

    return (
	<div >
		
<XYPlot
  xDomain={[-650, 750]}
  yDomain={[-1200, 1200]}
  width={850}
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
	color="#a3a3a3"
	strokeType={'literal'}
	stroke="#ffffff"
	onValueMouseOver={(datapoint) => {
		this.handleHover(datapoint),

		console.log(datapoint.id, datapoint.angle0, datapoint.angle, (Math.PI) / 4.5)
	}}
	onSeriesMouseOut={() => this.setState({value: false})}
	>
	
	 </ArcSeries>
	 {this.state.value ? (   
		  <Hint value={this.state.datapoint}>
			
			<div style={{background: 'black'}}>
			<h1>Hello</h1>

			</div>
			</Hint> ) : null
	}
	 
</XYPlot>

<h>Ships Detected</h>

<ReactTable
            data={this.state.state_data}
            columns={columns}
            loading={this.state.loading}
            defaultPageSize={9}
            showPageSizeOptions={false}
            filterable={true}
            noDataText="No Data"
          />



	</div>
	);
}
}