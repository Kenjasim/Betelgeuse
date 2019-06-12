import React, { Component } from 'react';

import { TiChartBar } from "react-icons/ti";
import { TiVideo } from "react-icons/ti";
import { TiFlash } from "react-icons/ti";
import { TiArrowMove } from "react-icons/ti";
import { TiAnchor } from "react-icons/ti";
import { TiRss } from "react-icons/ti";
import { TiEject } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiCompass } from "react-icons/ti";


const links = [
  { url: '/',
    link: 'Dashboard',
    icon: <TiChartBar className="linkIcon"/> },
  { url: '/cameras',
    link: 'Cameras',
    icon: <TiVideo className="linkIcon"/> },
  { url: '/power',
    link: 'Power',
    icon: <TiFlash className="linkIcon"/> },
  { url: '/radar',
    link: 'Radar',
    icon: <TiArrowMove className="linkIcon"/> },
  { url: '/ais',
    link: 'AIS',
    icon: <TiAnchor className="linkIcon"/> },
  { url: '/wifi_pinger',
    link: 'WiFi Pinger',
    icon: <TiRss className="linkIcon"/> },
  { url: '/direction_finder',
    link: 'Direction Finder',
    icon: <TiEject className="linkIcon"/> },
  { url: '/mru',
    link: 'MRU',
    icon: <TiCompass className="linkIcon"/> },

  { url: '/weather',
    link: 'Weather',
    icon: <TiWeatherPartlySunny className="linkIcon"/> },

];

export default links;
