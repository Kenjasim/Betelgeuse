import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import WeatherLiveFeed from './weather_live_feed'
import WeatherRaw from './weather_raw'
import WeatherAnalytics from './weather_analytics'

class Weather extends Component {

  render() {
    const tabs = [
      {
        'name': 'Live Feed',
        'component': <WeatherLiveFeed/>
      },
      {
        'name': 'Raw Data',
        'component': <WeatherRaw/>
      },
      {
        'name': 'Analytics',
        'component': <WeatherAnalytics/>
      }
    ]
    return (
      <DashTabs tabs={tabs} page="Weather"/>
    );
  }
}

export default Weather;
