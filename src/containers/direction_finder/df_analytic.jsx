import React, { Component } from 'react';
import {XYPlot, ArcSeries, Hint, FlexibleXYPlot, Crosshair} from 'react-vis';
import ReactTable from 'react-table';

import '../../../assets/stylesheets/_wifipinger.scss';


class DFAnalytic extends Component {

  constructor(props) {
		super(props);
		this.state = {
			data: [{angle:0,
					angle0: 0,
					radius: 0,
					radius0: 0,
					opacity: 0,
					id: 0}],
			value: false,
			datapoint: null,
			state_data: [],
			loading: true,
			table_data: []
		};
	}

	updateData = () => {
		const PI = Math.PI;
		const myData = [...new Array(360)].map((row, index) => {			//creates an array of datapoints which correspond to a line for all 360 degrees around 
			return {
				
				radius0: 200,												//each datapoint holds properties for radius, angle, opacity(default invis), and identifier int 
				radius: 650,
				angle0: (index * PI) / 180,
				angle: (index + 1) * (PI / 180),
				opacity: 0,
				id: index
			};
		});
		
		let temp_ships = [];
		let ship_map = new Map();
		let real_ships= [];

		for (var i=0; i<360; i++){												//for loop goes through heading integers 0 - 360 
			temp_ships = (this.state.state_data).filter(n => n.Heading == i)	//filter returned query for heading i and see if length is greater than 0
			if (temp_ships.length > 0){											//if true then make line visible and set length according to last Power seen
				myData[i].opacity = 1											
				myData[i].radius = temp_ships[0].Power * 130   
				ship_map.set(myData[i].id, temp_ships[0][ "id " ] )
				real_ships.push(temp_ships[0])
			}

			
		}
		console.log(ship_map.get(122))
		console.log(ship_map)
		console.log(real_ships)
		this.setState({
					   data: myData,
					   table_data: real_ships
					  })
	}

	filterData() {
		var json_filtered = [];

		//if (direction) 
		json_filtered = (this.state.state_data).filter(n => n.Heading == 258);
		console.log(this.state.data[1])

		if (typeof this.state.data[1] != 'undefined'){
			this.state.data[1].opacity = this.setState({
				opacity: 0
			})
		}	

		console.log(json_filtered)
			
		//return json_filtered;
	}

	handleHover = (v) => {
		this.setState({datapoint: v, value: v})
	}

  componentDidMount() {
	  	const query = "https://pulsarapi.siriusinsight.io:3333/dfquery?columnname=*&parameters=\"TimeLocal\"%20BETWEEN%20%272019-08-21%2015:13%27%20AND%20%272019-08-21%2015:19%27&limits=\"TimeLocal\"%20DESC"
		const temp_url = "https://pulsar.siriusinsight.io:3333/dfquery?columnname=*&parameters=\"TimeLocal\"%20BETWEEN%20%272019-08-21%2015:13%27%20AND%20%272019-08-21%2015:19%27&limits=\"TimeLocal\"%20DESC"
  
		  fetch(query)
		  .then(response=> response.json())
		  .then((dfdata) => {
			this.setState({
				state_data: dfdata,
				loading:false,
			})
			console.log(dfdata)
		  })
		  .then(() => {
			this.updateData()
		  })

		  /*fetch(temp_url)
		  .then(res => res.json())
		  .then((json) => {
			this.setState({
				table_data: json,
				loading: false
			})
		  })*/
		}

	
	
  render() {

	const columns = [{
        Header: 'id ',
        accessor: 'id '
      },{
        Header: 'TimeLocal',
        accessor: 'TimeLocal',
        width: 200
      },{
        Header: 'Power',
        accessor: 'Power'
      },{
        Header: 'Heading',
        accessor: 'Heading'
      },{
        Header: 'True Heading',
        accessor: 'True Heading'
      }
	]
	
    return (	
		
<div>
<ul class="flex-container hbox">

      <XYPlot
  xDomain={[-650, 750]}
  yDomain={[-1200, 1200]}
  width={700}
  height={900}
  margin ={{right:40}}
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
	onValueMouseOver={(datapoint) => {
		this.handleHover(datapoint)
		console.log(datapoint.id, datapoint.angle0, datapoint.angle, (Math.PI) / 4.5)
	}}
	//onSeriesMouseOut={() => this.setState({value: false})}
	>
	
	 </ArcSeries>
	 
</XYPlot>

<ReactTable	  
	  data={this.state.table_data}
	  columns={columns}
	  className="-striped -highlight"
      getTrProps={(state, rowInfo) => {
		if (rowInfo && rowInfo.row) {
		  return {
			onClick: e => {
			  console.log("inside");
			  console.log(rowInfo);
			  if (rowInfo.index != this.state.rowEdit) {
				this.setState({
				  rowEdit: rowInfo.index
				});
			  } else {
				this.setState({
				  rowEdit: null
				});
			  }
			  console.log(rowInfo.index);
			  console.log(this.state.rowEdit);
			},
			style: {
			  background:
				rowInfo.index === this.state.rowEdit ? "#00afec" : "white",
			  color:
				rowInfo.index === this.state.rowEdit ? "white" : "black"
			}
		  };
		} else {
		  return {};
		}
	  }}
	  loading={this.state.loading}
	  defaultPageSize={10}
	  showPageSizeOptions={false}
	  filterable={true}
	  noDataText=""
	  />

</ul>
</div>
	);

  }
}

export default DFAnalytic;
