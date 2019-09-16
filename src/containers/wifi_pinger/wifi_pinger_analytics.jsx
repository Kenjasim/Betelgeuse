import React, { Component } from 'react';
import {XYPlot, ArcSeries, Hint, FlexibleXYPlot, Crosshair} from 'react-vis';
import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';
import ReactTable from 'react-table';

import '../../../assets/stylesheets/_wifipinger.scss';



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
			loading: true,
			sector_data: []
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
				padAngle: 100,
				id: index
				
			};
		});

		this.setState({data: myData})
	}

    fetchData() {
		const url1 = "https://pulsar.siriusinsight.io:3333/wifimatchboat"
		const url2 = "content.siriusinsight.io/?psqlQuery="
		const temp_url = "http://10.0.0.43:3332/?psqlQuery="
		const tablequery = 'CREATE TEMP TABLE "matched_ships" ("ESSID" TEXT, "Matched Ships" TEXT)'
		const fakedata = 'INSERT INTO "matched_ships" ("ESSID", "Matched Ships") VALUES (\'STOC MARCIA\', null)'
		const query = `SELECT "ESSID" FROM "WifiPinger" WHERE "Last time seen" BETWEEN '2019-08-21 12:20' AND '2019-08-21 12:30' ORDER BY "Last time seen" desc`
		

		console.log(query)
		fetch(url1)
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
		const query2 = "https://pulsar.siriusinsight.io:3333/wifiquery?columnname=*&parameters=\"Last%20time%20seen\"%20BETWEEN%20%272019-08-21%2012:20%27%20AND%20%272019-08-21%2012:30%27&limits=\"Last%20time%20seen\"%20DESC"
		this.setState({datapoint: v, value: v})
		fetch(query2)
			.then(response => response.json())
			.then((json) =>	{
				console.log(json)

				var json_filtered= (json).filter(n => n.Antenna===v.id+1);

				console.log(json_filtered)
	
				this.setState({
					sector_data: json_filtered
			})
				}
		)
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
		  }, {
			Header: 'Matched Ship',
			accessor: 'VesselName'
		  },
		  {
			Header: 'MMSI',
			accessor: 'MMSI'
		  }
		]
		
		  const columns2 = [{
			Header: 'BSSID',
			accessor: 'BSSID'
		  },{
			Header: 'Last Time Seen',
			accessor: 'Last time seen',
			width: 200
		  },{
			Header: 'Power',
			accessor: 'Power'
		  },{
			Header: 'ESSID',
			accessor: 'ESSID'
		  },{
			Header: 'Type',
			accessor: 'Type'
		  },{
			Header: 'Antenna',
			accessor: 'Antenna'
		  },{
			Header: 'id',
			accessor: 'id'
		  }
		]

    return (
	
<div >

<ul class="flex-container hbox">
 
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


	  <ReactTable	  
	  data={this.state.sector_data}
	  columns={columns2}
	  loading={this.state.loading}
	  defaultPageSize={6}
	  showPageSizeOptions={false}
	  filterable={true}
	  noDataText=""
	  />




</ul>

<hr class = "new5"></hr>

<h1>Ships Detected</h1>

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