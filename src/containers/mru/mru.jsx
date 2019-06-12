import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import MRURaw from './mru_raw'
import MRUAnalytics from './mru_analytics'

class MRU extends Component {

  render() {
    const tabs = [
      {
        'name': 'Raw Data',
        'component': <MRURaw/>
      },
      {
        'name': 'Analytics',
        'component': <MRUAnalytics/>
      }
    ]
    return (
      <DashTabs tabs={tabs} page="Motion Reference Unit"/>
    );
  }
}

export default MRU;
