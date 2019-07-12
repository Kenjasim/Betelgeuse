import React, { Component } from 'react';
import WindStatus from './wind_status'
import WindMap from './wind_map';
import TempStatus from './temp_status';
// import Systems from './systems'
// import ShipStatus from './shipstatus'

class WeatherAnalytics extends Component {

  render() {
    return (

      <div className=" container dashboard-section">
        <div  className="row dashboard-size">
          <div className="col-12 col-sm-12 col-md-6 dashboard-left">
            <div className="boxstatus-container grey-container">
               <TempStatus />
            </div>
            <div className="ship-container grey-container">
              <WindMap />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 dashboard-right">
            <div className="boxstatus-container grey-container">
              <WindStatus />
            </div>
            <div className="ship-container grey-container">
              {/* <WindMap /> */}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default WeatherAnalytics;
