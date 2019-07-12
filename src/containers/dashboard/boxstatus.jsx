import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import io from "socket.io-client";
import moment from 'moment';
import ReactInterval from 'react-interval';



class BoxStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      power_data: {
        labels: [],
        datasets: [
          {
            label: 'Power (W)',
            data: [],
            fill: false,          // Don't fill area under the line
            borderColor: '#FF7733'  // Line color
          }
        ],
      },
      donut_data: {
        labels: [],
        datasets: [
          {
            label: ['Power Budget Used', 'Unused'],
            data: [88, 12],
            fill: true,
            backgroundColor: ['#26AAE2', 'white']      // Don't fill area under the line // Line color
          }

        ]
      },
      percentpower: '',
      status: "Connected",
      response: false,
      power_endpoint: 'http://localhost:3001'
    }
    this.socket = io.connect(this.state.power_endpoint)
    this.donut = this.donut.bind(this)
  }

  statusIndicator = () => {
    if (this.state.status == 'Connecting') {
      return (
        <div className="status-indicator status-connecting">Connecting...</div>
      )
    } else if (this.state.status == 'Connected') {
      return (
        <div className="status-indicator status-connected">Connected</div>
      )
    } else {
      return (
        <div className="status-indicator status-notconnected">Not Connected</div>
      )
    }
  }
  curdate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today
  }
  convertDate = (date) => {
    const d = moment(date).format()
    return d.slice(0, 10).replace('T', ' ');
  }

  //Creates the query ewhich gets the power used on that day
  donut = () => {
    const url = "https://bobeyes.siriusinsight.io:3333/?psqlQuery="
    //const temp_url = "//10.0.0.43:3333/?psqlQuery="
    let d = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
    let cd = new Date();
    //The SQL Query to get the average current used throughout the day
    const query = `SELECT AVG("Current") FROM "Power" WHERE "TimeLocal" > '${this.convertDate(d)}' AND "TimeLocal" < '${this.convertDate(cd.setDate(d.getDate() + 1))}' AND "Current" < 6 AND "Current" > 0`
    console.log(url+query)
    const request = fetch(url+query)
      .then(response=> response.json())
      .then((data) => {
        //Gets the actual number from the object and multiply it by the hours that have passsed this day
        let poweruse = data[0].avg * 24 * (this.percentday())
        console.log(poweruse)
        //Create the percentage and round to 1.d.p
        let ps = this.round((poweruse/1500)*100, 1)
        console.log(ps)
        let powerstring = ps.toString() + '%'
        //Add the data into a form which can be shown by the donut
        let up_dont_data = {
          labels: [],
          datasets: [
            {
              label: ['Power Budget Used', 'Unused'],
              data: [poweruse, 1500 - poweruse],
              fill: true,
              backgroundColor: ['#26AAE2', 'white']      // Don't fill area under the line // Line color
            }

          ]
        }
        this.setState({
          //set the data
          donut_data: up_dont_data,

          percentpower: powerstring,
        })
      })
  }

  //Calculate the percentage of the day whcih has passed
  percentday() {
    var now = new Date(),
    then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0),
    //calculates difference from midnight to now 
    diff = now.getTime() - then.getTime()

    return (diff/3600000);
  }

  //Rounds a number to a certain precision  
  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


  powerData = (power_num) => {
    let upd_labels = ''
    let upd_data = ''
    if (this.state.power_data.labels.length > 300) {
      upd_labels = this.state.power_data.labels.slice(30).concat([''])
      upd_data = this.state.power_data.datasets[0].data.slice(30).concat(power_num * 24)
    } else {
      upd_labels = this.state.power_data.labels.concat([''])
      upd_data = this.state.power_data.datasets[0].data.concat(power_num * 24)
    }
    // upd_labels = this.state.power_data.labels.concat([''])
    // upd_data = this.state.power_data.datasets[0].data.concat(power_num * 24)
    const upd_power_data = {
      labels: upd_labels,
      datasets: [
        {
          label: 'Power (W)',
          data: upd_data,
          fill: false,          // Don't fill area under the line
          borderColor: '#FF7733'  // Line color
        }
      ]
    }
    this.setState((state, props) => {
      return {
        power_data: upd_power_data  }
    });
  }

  openPowerSocket() {
    this.socket.on('connected',  (data) => {
        this.socket.emit('ready for data', {})
      });
      this.socket.on('update',  (data) => {
        const message = data.message.payload
        const result = message.split(",")
        this.powerData(result[2])

    });
  }

  componentDidMount() {
    this.openPowerSocket()
    this.donut()
    // const don_int = setInterval(this.donut, 1000)
  }
  componentWillUnmount() {
    this.socket.disconnect()
    // clearInterval(don_int)
  }
  test() {
    console.log('test')
  }

  render() {
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
              Box Status:
              {this.statusIndicator()}
            </div>
{/*            <div className="tempstatus">
              Box temp:
              <div className="boxtemp">{24}˚C</div>
            </div>*/}
          {/*</div>*/}
          <div className="power-chart-container">
            <Line
              data={this.state.power_data}
              height={170}
              options={{
                maintainAspectRatio: false,
                axes: {
                  display: false
                }
              }}
            />

          </div>
        </div>
        <div className="box-box-right">
          <div className="power-doughnut-section">
            <div>
              <ReactInterval timeout={30000} enabled={true} callback={this.donut.bind(this)} />
              <Doughnut
                height={180}
                data={this.state.donut_data}
                options={{
                  elements: {
                    center: {
                      text: this.state.percentpower,
                      color: '#26AAE2', // Default is #000000
                      fontStyle: 'Arial', // Default is Arial
                      sidePadding: 20 // Defualt is 20 (as a percentage)
                    }
                  }
                }}
              />
              <div className="power-budget-text">
                Daily Power Budget
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default BoxStatus;
