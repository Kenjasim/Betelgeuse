import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import AISRaw from './ais_raw'
import AISAnalytics from './ais_analytics'

class AIS extends Component {

  render() {
    const tabs = [
      {
        'name': 'Raw Data',
        'component': <AISRaw/>
      },
      {
        'name': 'Analytics',
        'component': <AISAnalytics/>
      }
    ]
    return (
      <DashTabs tabs={tabs} page="AIS"/>
    );
  }
}

export default AIS;
