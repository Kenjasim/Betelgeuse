import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import WiFiPingerRaw from './wifi_pinger_raw'
import WiFiPingerAnalytics from './wifi_pinger_analytics'

class WiFiPinger extends Component {

  render() {
    const tabs = [
      {
        'name': 'Raw Data',
        'component': <WiFiPingerRaw/>
      },
      {
        'name': 'Analytics',
        'component': <WiFiPingerAnalytics/>
      }
    ]
    return (
      <DashTabs tabs={tabs} page="WiFiPinger"/>
    );
  }
}

export default WiFiPinger;
