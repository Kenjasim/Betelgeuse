import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import PowerLiveFeed from './power_live'
import PowerRaw from './power_raw'
import PowerAnalytics from './power_analytics'

class Power extends Component {

  render() {
    const tabs = [
      {
        'name': 'Live Feed',
        'component': <PowerLiveFeed/>
      },
      {
        'name': 'Raw Data',
        'component': <PowerRaw/>
      },
      {
        'name': 'Analytics',
        'component': <PowerAnalytics/>
      }
    ]
    return (
      <DashTabs tabs={tabs} page='Power'/>
    );
  }
}

export default Power;
