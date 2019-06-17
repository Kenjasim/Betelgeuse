import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';


class BoxStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: 'Power',
            data: [22,19,27,23,22,24,17,25,23,24,20,19],
            fill: false,          // Don't fill area under the line
            borderColor: '#26AAE2'  // Line color
          }
        ]
      },
      status: "Connected"
    }
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

  render() {
    return (

      <div className="box-box">
        <div className="boxstatus">
          Box Status:
          {this.statusIndicator()}
        </div>
        <div className="tempstatus">
          Box temp:
          <div className="boxtemp">{24}˚C</div>
        </div>
        <div className="chart-section">
          <div className="power-chart-container">
            <Line
              data={this.state.data}
              height={400}
              options={{
                maintainAspectRatio: false,
                axes: {
                  display: false
                }
              }}
            />

          </div>
          <div className="power-doughnut-section">
            <Doughnut />
          </div>
        </div>
      </div>

    );
  }
}

export default BoxStatus;
