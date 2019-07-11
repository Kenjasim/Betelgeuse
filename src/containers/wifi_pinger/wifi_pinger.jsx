import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import WiFiPingerRaw from './wifi_pinger_raw'
import WiFiPingerAnalytics from './wifi_pinger_analytics'
import WifiLiveFeed from './wifi_pinger_live'

class WiFiPinger extends Component {

  render() {
    const tabs = [
      {
        'name': 'Live Feed ',
        'component': <WifiLiveFeed/>
      },
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
