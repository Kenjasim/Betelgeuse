import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import AISRaw from './ais_raw'
import AISLiveFeed from './ais_live'
import AISAnalytics from './ais_analytics'

class AIS extends Component {

  render() {
    const tabs = [
      {
        'name': 'Live Feed',
        'component': <AISLiveFeed/>
      },
      {
        'name': 'Raw Data',
        'component': <AISRaw/>
      }
    ]
    return (
      <DashTabs tabs={tabs} page="AIS"/>
    );
  }
}

export default AIS;
