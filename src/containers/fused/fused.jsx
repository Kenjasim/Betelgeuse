import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import FusedMap from './fused_map'
import AISAnalytics from './ais_analytics'
import WeatherFused from './weather_fused';
import AssetDB from './asset_db';
import Reports from './reports';

class Fused extends Component {

  render() {
    const tabs = [
      {
        'name': 'AssetDB',
        'component': <AssetDB/>
      },
      {
        'name': 'AisMap',
        'component': <FusedMap/>
      },
      {
        'name': 'AISAnalytics',
        'component': <AISAnalytics/>
      }

    ]
    return (
      <DashTabs tabs={tabs} page="Fused"/>
    );
  }
}

export default Fused;
