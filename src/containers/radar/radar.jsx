import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import RadarImages from './radar_images'
import RadarRaw from './radar_raw'
import RadarAnalytics from './radar_analytics'

class Radar extends Component {

  render() {
    const tabs = [
      {
        'name': 'Radar Images',
        'component': <RadarImages/>
      },
      {
        'name': 'Raw Data',
        'component': <RadarRaw/>
      },
      {
        'name': 'Analytics',
        'component': <RadarAnalytics/>
      }
    ]
    return (
      <DashTabs tabs={tabs} page="Radar"/>
    );
  }
}

export default Radar;
