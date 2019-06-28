import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import AISRaw from './ais_raw'
import FusedMap from './fused_map'
import AISAnalytics from './ais_analytics'

class Fused extends Component {

  render() {
    const tabs = [
      {
        'name': 'Map',
        'component': <FusedMap/>
      },
      {
        'name': 'Rap',
        'component': <AISRaw/>
      },
      {
        'name': 'Sap',
        'component': <AISAnalytics/>
      }
    ]
    return (
      <DashTabs tabs={tabs} page="Fused"/>
    );
  }
}

export default Fused;