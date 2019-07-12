import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import io from "socket.io-client";
import Gauge from 'react-radial-gauge';
import moment from 'moment';
import ReactInterval from 'react-interval';



class WindStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wind_dir: 0,
      wind_speed: 0,
      wind_data: {
        labels: [], 
        datasets: [
          {
            label: 'Wind Speed (m/s)',
            data: [],
            fill: false,          // Don't fill area under the line
            borderColor: '#1D1955'  // Line color
          }
        ],
      },
      percentpower: '',
      status: "Connected",
      response: false,
      weather_endpoint: 'https://bobeyes.siriusinsight.io:3000'
    }
    this.socket = io.connect(this.state.weather_endpoint)
  }


  windData = (wind_num) => {
    let upd_labels = ''
    let upd_data = ''
    if (this.state.wind_data.labels.length > 300) {
      upd_labels = this.state.wind_data.labels.slice(30).concat([''])
      upd_data = this.state.wind_data.datasets[0].data.slice(30).concat(wind_num)
    } else {
      upd_labels = this.state.wind_data.labels.concat([''])
      upd_data = this.state.wind_data.datasets[0].data.concat(wind_num)
    }
    // upd_labels = this.state.wind_data.labels.concat([''])
    // upd_data = this.state.wind_data.datasets[0].data.concat(wind_num * 24)
    const upd_wind_data = {
      labels: upd_labels,
      datasets: [
        {
          label: 'Wind Speed (m/s)',
          data: upd_data,
          fill: false,          // Don't fill area under the line
          borderColor: '#1D1955'  // Line color
        }
      ]
    }
    this.setState((state, props) => {
      return {
        wind_data: upd_wind_data  }
    });
  }

  openWindSocket() {
    this.socket.on('connected',  (data) => {
        this.socket.emit('ready for data', {})
      });
      this.socket.on('update',  (data) => {
        const message = data.message.payload
        const result = message.split(",")
        this.setState({
          wind_dir: result[2],
          wind_speed: result[4]
        })
        this.windData(this.state.wind_speed)

    });
  }

  componentDidMount() {
    this.openWindSocket()
  }
  componentWillUnmount() {
    this.socket.disconnect()
    // clearInterval(don_int)
  }
  test() {
    console.log('test')
  }

  render() {
    //The options for the compass which sets the size and makes it a 360 degree circle
    let opts = {size: 200,
    currentValue: (this.state.wind_dir)/3.6,
    dialWidth: 0,
    tickLength: 0,
    progressWidth: 0,
    needleSharp: true,
    needleColor: '#1D1955',
    needleBaseColor: '#1D1955',
    }
      Chart.pluginService.register({
        beforeDraw: function (chart) {
          if (chart.config.options.elements.center) {
            //Get ctx from string
            var ctx = chart.chart.ctx;

            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = centerConfig.text;
            var color = centerConfig.color || '#000';
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
            //Start with a base font of 30px
            ctx.font = "35px " + fontStyle;

            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(newFontSize, elementHeight);

            //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse+"px " + fontStyle;
            ctx.fillStyle = color;

            //Draw text in center
            ctx.fillText(txt, centerX, centerY);
          }
        }
      });
      Chart.defaults.scale.gridLines.display = false;
    return (

      <div className="box-box">
        <div className="box-box-left">
          {/*<div className="status-info">*/}
            <div className="boxstatus">
              Wind Status:
            </div>
{/*            <div className="tempstatus">
              Box temp:
              <div className="boxtemp">{24}˚C</div>
            </div>*/}
          {/*</div>*/}
          <div className="wind-chart-container">
            <Line
              data={this.state.wind_data}
              height={170}
              options={{
                maintainAspectRatio: false,
                axes: {
                  display: false
                }
              }}
            />
            <div className="wind-speed-text">
                Wind Speed:
                {this.state.wind_speed} m/s
              </div>
          </div>
          
        </div>
        <div className="box-box-right">
          <div className="power-doughnut-section">
            <div className ="compass">
              <Gauge {...opts}/>
              <div className="wind-direction-text">
                Direction:
                {this.state.wind_dir}°
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default WindStatus;
