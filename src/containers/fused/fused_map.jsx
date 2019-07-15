import React, { Component } from 'react';
import ReactMapboxGl, { Marker, Layer, Feature, Popup, ScaleControl, Overlay } from "react-mapbox-gl";
import io from "socket.io-client";
import ShipMarker from './marker';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment'
import { CSVLink, CSVDownload } from "react-csv";
import ControlPanel from "./control-panel";
//import 'bootstrap/dist/css/bootstrap.min.css';

// import data from './dummy_data'

class FusedMap extends Component {
  constructor(props) {
    super(props);
    //this.parseData = this.parseData.bind(this);
    const d1 = new Date();
    let d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() - 10);
    this.state = {
      response: false,
      endpoint: 'bobeyes.siriusinsight.io:3002',
      startDate: d2,
      endDate: d1,
      map_data: [],
      mmsi_data: [],
      datePickerDisabled: false,
      loading: false,
      viewport: {},
      queryString: "AND",

      coordinates24nm: [
        [1.1502777777777777, 51.2209667],
        [1.6474622222222222, 51.2209667],
        [1.6474622222222222, 50.8208333],
        [1.1502777777777777, 50.8208333]
        ],

      coordinates12nm: [
        [1.274722222222222, 51.1209667],
        [1.5230175, 51.1209667],
        [1.5230175, 50.9208333],
        [1.274722222222222, 50.9208333 ]
        ],

        drawn: false,
        visibility: "visible", 
    };
    this.socket = io.connect(this.state.endpoint)
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.drawDataSelected = this.drawDataSelected.bind(this);
    this.fetchMMSIData = this.fetchMMSIData.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
    this.changeVisibility = this.changeVisibility.bind(this);
    this.calculateCoordinates = this.calculateCoordinates.bind(this);
  }


  componentDidMount = () => {

    this.socket.on('connected', (data) => {
      this.socket.emit('ready for data', {})
    });
    this.socket.on('update', (data) => {
      const message = data.message.payload
      const result = message.split(",")
      console.log(result)
      let data_packet = this.parseData(result)

      this.setState((state, props) => {
        const updated = data_packet.concat(state.state_data)
        return { state_data: updated };
      });

    });


  }

  handleStartChange(date) {
    this.setState({
      datePickerDisabled: true,
      loading: true,
      startDate: date,

      datePickerDisabled: false,
      loading: false,
    }, () => {
        console.log("Date received")
    });

  }

  handleEndChange(date) {
    this.setState({
      datePickerDisabled: true,
      loading: true,
      endDate: date,

      datePickerDisabled: false,
      loading: false,
    }, () => {
        console.log("Date received")
    });

  }

  
  drawDataSelected() {
    this.setState({
      datePickerDisabled: true,
      loading: true,
    }, () => {
      this.fetchData()
      console.log("1")
    });
  }
  
  fetchMMSIData() {
    this.setState({
      datePickerDisabled: true,
      loading: true,
    }, () => {
      this.fetchData2()
      console.log("2")
    });
  }

/*Continued at line 182

  Change changeQuery() so that it checks whether the mmsiAdd from the select field is null. 
  If it is not, map mmsiAdd and form a query extension from it called mmsiData and equate queryString to it. 
  If it is, make queryString equal to an empty string “”. 
  
*/

  changeQuery(mmsiAdd) {
    let mmsiData = "AND ("
    if(mmsiAdd != null || "") {
      mmsiAdd.map((point, i) => (mmsiData = mmsiData + ' "MMSI"=' + point.value+ " OR"));
    
    this.setState({
      queryString: mmsiData,
    }, () =>
    {
      console.log(this.state.queryString);
    });}

    else if(mmsiAdd == null || "") {
      this.setState({
        queryString: "",
      }, () =>
      {
        console.log(this.state.queryString);
      });}
    
  }

<<<<<<< HEAD
  changeVisibility() {
    if (this.state.visibility === "visible") {
      this.state.visibility = "none";
    } 
    else {
      this.state.visibility = "visible";
    }
  }
=======
>>>>>>> eff29de761ae78e2a2a98ded494a7a3520ae9e56

  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 19).replace('T', ' ');
  }

  fetchData() {

    let tempData = []

    const url = "https://bobeyes.siriusinsight.io:3333/?psqlQuery="
    const temp_url = "http://10.0.0.43:3333/?psqlQuery="
    const query = `SELECT "TimeLocal", "Sog", "Cog", "MMSI", "Longitude", "Latitude" FROM "Ais" WHERE "Longitude" > 0 AND "TimeLocal" BETWEEN '${this.convertDate(this.state.startDate)}' AND '${this.convertDate(this.state.endDate)}'`
    const query_mmsi = `SELECT DISTINCT "MMSI" FROM "Ais" WHERE "Longitude" > 0 AND "MMSI" <> 0 AND "TimeLocal" BETWEEN '${this.convertDate(this.state.startDate)}' AND '${this.convertDate(this.state.endDate)}'`

    console.log(this.convertDate(this.state.startDate));
    console.log(this.convertDate(this.state.endDate));

    const request = fetch(url+query)
      .then(response=> response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          map_data: data,
          datePickerDisabled: false,
          loading: false
        })
      })
     
      const request2 = fetch(url+query_mmsi)
      .then(response=> response.json())
      .then((data2) => {
        console.log(data2);
        data2.map((point, i) => tempData.push({value: point.MMSI, label: point.MMSI}));
        this.setState({
          mmsi_data: tempData,
          datePickerDisabled: false,
          loading: false
        })
        console.log(this.state.mmsi_data);
      })
  }

  /*Comment starts at line 109
    
    In turn, in fetchData2, the queryString’s ending will be compared to “ OR”. 
    If it is equal to it (i.e. the string does include MMSI data that ends with “ OR”), that ending will be removed 
    and closed bracket “)” will be concatenated to form the end query extension. 
    If the ending of queryString is not equal to “ OR”, it means that no MMSI’s are selected 
    and thus the empty extension will be added to the root query (i.e. nothing changes) and all data is displayed.

  */

  fetchData2() {
    let query_check = ""
    if (this.state.queryString.substring(this.state.queryString.length-3, this.state.queryString.length) == " OR"){
      query_check = this.state.queryString.substring(0,this.state.queryString.length-3) + ")" 
    }
    

    const url = "https://bobeyes.siriusinsight.io:3333/?psqlQuery="
    const temp_url = "http://10.0.0.43:3333/?psqlQuery="
    const query_mmsi = `SELECT "TimeLocal", "Sog", "Cog", "MMSI", "Longitude", "Latitude" FROM "Ais" WHERE "Longitude" > 0 AND "TimeLocal" BETWEEN '${this.convertDate(this.state.startDate)}' AND '${this.convertDate(this.state.endDate)}'`
    const query = query_mmsi + query_check
    console.log(query);

    const request = fetch(url+query)
      .then(response=> response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          map_data: data,
          datePickerDisabled: false,
          loading: false
        })
      })
    
  
  }

  fetchData3() {
    const url = "https://bobeyes.siriusinsight.io:3333/?psqlQuery="
    const temp_url = "http://10.0.0.43:3333/?psqlQuery="
    const query_draw = `SELECT "TimeLocal", "Sog", "Cog", "MMSI", "Longitude", "Latitude" FROM "Ais" WHERE "TimeLocal" BETWEEN '${this.convertDate(this.state.startDate)}' AND '${this.convertDate(this.state.endDate)}'`

    console.log(this.convertDate(this.state.startDate));
    console.log(this.convertDate(this.state.endDate));

    const request3 = fetch(url+query_draw)
      .then(response=> response.json())
      .then((data3) => {
        console.log(data3);
        this.setState({
          map_data: data3,
          datePickerDisabled: false,
          loading: false
        })
      })
  
  }

  componentWillMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  //_onViewportChange = viewport => this.setState({viewport});

  //_onStyleChange = mapStyle => this.setState({mapStyle});

  calculateCoordinates(startLat, startLon, radRange, bearing) {
    let coord = []
    let adjCoord = []
    let φ1 = (startLat * Math.PI) / 180                //51.0209 
    let λ1 = (startLon * Math.PI) / 180                //1.39887
    let relBrng = (bearing * Math.PI) / 180
    let realBrng = [5.6199823571 + relBrng,
                    0.6632029501 + relBrng, 
                    2.4783897035 + relBrng, 
                    3.8047956037 + relBrng]
    let d = radRange * 1852.00/2                                            //radRange in nautical miles, d in metres
    let R = 6371e3                                                          // Earth's mean radius = 6,371e3 metres 

    let latSort = []
    let lonSort = []  

    //console.log(relBrng, realBrng, d, R)

    for(var i = 0; i < 4; i++) {
      var φ2 = Math.asin( Math.sin(φ1)*Math.cos(d/R) +
                    Math.cos(φ1)*Math.sin(d/R)*Math.cos(realBrng[i]) );
      var λ2 = λ1 + Math.atan2(Math.sin(realBrng[i])*Math.sin(d/R)*Math.cos(φ1),
                         Math.cos(d/R)-Math.sin(φ1)*Math.sin(φ2));

      coord.push([(λ2 * 180) / Math.PI, (φ2 * 180) / Math.PI]);
    }
    //console.log(coord);
    
    for(var i = 0; i < 4; i++) {
      let pair = coord[i];
      
      lonSort.push(pair[0]);
      latSort.push(pair[1]);
    }

    latSort.sort((a, b) => a - b);
    lonSort.sort((a, b) => a - b);

    adjCoord.push([lonSort[0],latSort[3]], [lonSort[3],latSort[3]], [lonSort[3],latSort[0]], [lonSort[0],latSort[0]])
    //console.log(adjCoord);
    return adjCoord
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGFjaGFsbCIsImEiOiJjangwbGc4NzcwMGF0NDJvN3NxZ2QxOTlzIn0.15ElYDfKXCSogk87TVE-GA"
    })
<<<<<<< HEAD
    
    const mapStyle = {
      
      "version": 8,
      "name": "Dark",
      "sources": {
        "mapbox": {
          "type": "vector",
          "url": "mapbox://mapbox.mapbox-streets-v8"
        },
        "overlay": {
          "type": "image",
          "url": "assets/images/transpRadarCopy4.png",
          "coordinates": this.calculateCoordinates(51.0209, 1.39887, 38, 238)
          //center: {[1.39887,51.0209]}
        },
        "10m-bathymetry-81bsvj": {
          "type": "vector",
          "url": "mapbox://mapbox.9tm8dx88"
        },
        "satellite": {
          "type": "raster",
          "url": "mapbox://mapbox.satellite",
          "tileSize": 256 
        }

      },
      "sprite": "mapbox://sprites/mapbox/dark-v10",
      "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
      "layers": [
        
        {
          "id": 'satellite',
          "source": "satellite",
          "type": "raster"
        },
        {
          "id": "water",
          "source": "mapbox",
          "source-layer": "water",
          "type": "fill",
          "paint": {"fill-color": "#a5d2f3"},
          "layout": {"visibility": "none"},
        },
        {
          "id": "10m-bathymetry-81bsvj",
          "type": "fill",
          "source": "10m-bathymetry-81bsvj",
          "source-layer": "10m-bathymetry-81bsvj",
          "layout": {"visibility": "none"},
          "paint": {
            "fill-outline-color": "hsla(337, 82%, 62%, 0)",
            // cubic bezier is a four point curve for smooth and precise styling
            // adjust the points to change the rate and intensity of interpolation
            "fill-color": [ "interpolate",
            [ "cubic-bezier",
            0, 0.5,
            1, 0.5 ],
            ["get", "DEPTH"],
            50,  "#78bced",
            500, "#1b82cc",
            1000, "#15659f",
            9000, "#125788"
            ]
          }  
          },
        {
        "id": "boundaries",
        "source": "mapbox",
        "source-layer": "admin",
        "type": "line",
        "paint": {"line-color": "#797979", "line-dasharray": [2, 2, 6, 2]},
        "filter": ["all", ["==", "maritime", 0]]
        },
        {
        "id": "overlay",
        "source": "overlay",
        "type": "raster",
        "paint": {"raster-opacity": 0.85},
        "layout": {"visibility": this.state.visibility},
        },
        {
        "id": "cities",
        "source": "mapbox",
        "source-layer": "place_label",
        "type": "symbol",
          "layout": {
          "text-field": "{name_en}",
          "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
          "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          4, 9,
          6, 12
          ]
          },
          "paint": {
          "text-color": "#969696",
          "text-halo-width": 2,
          "text-halo-color": "rgba(0, 0, 0, 0.85)"
          }
        },
        {
        "id": "states",
        "source": "mapbox",
        "source-layer": "place_label",
        "type": "symbol",
          "layout": {
          "text-transform": "uppercase",
          "text-field": "{name_en}",
          "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
          "text-letter-spacing": 0.15,
          "text-max-width": 7,
          "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          4, 10,
          6, 14
          ]
          },
          "filter": ["==", ["get", "class"], "state"],
          "paint": {
          "text-color": "#969696",
          "text-halo-width": 2,
          "text-halo-color": "rgba(0, 0, 0, 0.85)"
          }
        }
      ]
    };
=======
>>>>>>> eff29de761ae78e2a2a98ded494a7a3520ae9e56

    const layerPaint = {
      'heatmap-weight': {
        property: 'aisPresence',
        type: 'exponential',
        stops: [[1, 0], [62, 1]]
      },
      // Increase the heatmap color weight weight by zoom level
      // heatmap-ntensity is a multiplier on top of heatmap-weight
      'heatmap-intensity': {
        stops: [[11, 1], [15, 3]]
      },
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(33,102,172,0)',
        0.25,
        'rgb(103,169,207)',
        0.5,
        'rgb(209,229,240)',
        0.8,
        'rgb(253,219,199)',
        1,
        'rgb(239,138,98)',
        2,
        'rgb(178,24,43)'
      ],
      // Adjust the heatmap radius by zoom level
      'heatmap-radius': {
        stops: [[11, 5], [15, 20]]
      },
      // Adjust increase of heatmap opacity as user zooms in to make data decluster
      'heatmap-opacity': {
        default: 1,
        stops: [
          [1, 1],
          [14, 1],
          [15, 0]
        ]
      },
    };

    // var toggleableLayerIds = [ "10m-bathymetry-81bsvj", "water", "overlay" ];

    // for (var i = 0; i < toggleableLayerIds.length; i++) {
    //   var id = toggleableLayerIds[i];
    //   console.log(id);

    //   var link = document.createElement('a');
    //   link.href = '#';
    //   link.className = 'active';
    //   link.textContent = id;
      
    //   console.log(link);

    //   link.onclick = function (e) {
    //     var clickedLayer = this.textContent;
    //     e.preventDefault();
    //     e.stopPropagation();
        
    //     var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
        
    //     if (visibility === 'visible') {
    //       map.setLayoutProperty(clickedLayer, 'visibility', 'none');
    //       this.className = '';
    //     } 
    //     else {
    //       this.className = 'active';
    //       map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    //     }
    //   };
      
    //   if(document.readyState === "complete" && !this.state.drawn) {
    //     var layers = document.getElementById('menu');
    //     layers.appendChild(link);
    //     this.state.drawn = true;
    //   }
      
    // }

    const today = new Date()

    
    return (
      <div className="map-wrapper">
          <div className="date-filter-wrapper">


            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
              disabled={this.state.datePickerDisabled}
              popperPlacement="bottom-end"
              

              maxDate={this.state.endDate}
              minDate={1}
              maxTime={this.state.startDate.getDate() === this.state.endDate.getDate() ? this.state.endDate : (new Date(new Date().setHours(23, 59)))}
              minTime={new Date(new Date().setHours(0, 0, 0, 0))}
            />
            <div className="date-to">
              to
            </div>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleEndChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
              disabled={this.state.datePickerDisabled}
              popperPlacement="bottom-end"
              

              maxDate={new Date()}
              minDate={this.state.startDate}
              maxTime={today.getDate() === this.state.endDate.getDate() ? this.state.endDate : (new Date(new Date().setHours(23, 59)))}
              minTime={this.state.startDate.getDate() === this.state.endDate.getDate() ? this.state.startDate : (new Date(new Date().setHours(0, 0, 0, 0)))}
            />

          </div>

          <button onClick={this.drawDataSelected}>
            1: Draw all data
          </button>

          <button onClick={this.fetchMMSIData}>
            2: Draw specified MMSI
          </button>

          <button onClick={this.changeVisibility}>
            3: Toggle layers
          </button>      

          <div className="mmsiSelect" style={{width: '300px'}}>
            <Select
              defaultValue = {[]}
              isMulti
              options = {this.state.mmsi_data}
              classNamePrefix = "select"
              placeholder = "Search for MMSI..." 
              onChange = {this.changeQuery}
            />
          </div>
<<<<<<< HEAD
          <nav id="menu" ref="menu"></nav>
=======
          

>>>>>>> eff29de761ae78e2a2a98ded494a7a3520ae9e56
          <Map
            style={mapStyle}
            //onViewportChange={this._onViewportChange}

            containerStyle={{
              height: "100%",
              width: "100%"
              }}
              
              center = {[1.23917630,51.01271940]}
              zoom = {[5]}
              bearing = {[0]}
              pitch = {[0]}>


            {/* <ControlPanel
              containerComponent={this.props.containerComponent}
              onChange={this._onStyleChange}
            /> */}

            <ScaleControl measurement="mi" position="topLeft" style={{ right: 30 }} />
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "harbor-15" , "visibility": this.state.visibility}}
              minZoom={14}
              >


              {this.state.map_data.map((point, i) => 
                <Feature 
                  key={i} 
                  coordinates={[point.Longitude, point.Latitude]}
                  style={{transform: `rotate(${point.Cog}deg)`}} 
                  onClick={() => 
                    console.log("////////////////////////////////////"  + '\n' +
                                "Local Time: " + point.TimeLocal + '\n' + 
                                "MMSI: " + point.MMSI + '\n' + 
                                "Longitude: " + point.Longitude + '\n' + 
                                "Latitude: " + point.Latitude + '\n' + 
                                "Speed over ground: " + point.Sog + '\n' + 
                                "Course over ground: " + point.Cog)}
                />)}

            </Layer>

            <Layer
              type="heatmap"
              id="ais-heat"
              minZoom={5}
              maxZoom={15}
              paint={layerPaint}
              layout={{"visibility": this.state.visibility}}
              >

              {this.state.map_data.map((point, i) => 
                <Feature 
                  key={i} 
                  coordinates={[point.Longitude, point.Latitude]} 
                />)}
            

            </Layer>

            <ShipMarker />
          </Map>
      </div>
    );

  }
}
export default FusedMap;
