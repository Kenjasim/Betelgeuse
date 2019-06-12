import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import DFRaw from './df_raw'
import DFAnalytics from './df_analytic'

class DirectionFinder extends Component {

  render() {
    const tabs = [
      {
        'name': 'Raw Data',
        'component': <DFRaw/>
      },
      {
        'name': 'Analytics',
        'component': <DFAnalytics/>
      }
    ]
    return (
      <DashTabs tabs={tabs} page="Direction Finder"/>
    );
  }
}

export default DirectionFinder;
