import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DashTabs from '../dash_tabs'
import WeatherLiveFeed from './weather_live_feed'
import WeatherRaw from './weather_raw'
import WeatherAnalytics from './weather_analytics'
import WeatherAnalytics2 from './weather_analytics2'

class Weather extends Component {

  render() {
    const tabs = [
      {
        'name': 'Dashboard',
        'component': <WeatherAnalytics2/>

      },
      {
        'name': 'Live Feed',
        'component': <WeatherLiveFeed/>
      },
      {
        'name': 'Raw Data',
        'component': <WeatherRaw/>
      },
      {
        'name': 'Kenan',
        'component': <WeatherAnalytics/>
      }
    ]
    return (
      <DashTabs tabs={tabs} page="Weather"/>
    );
  }
}

export default Weather;
