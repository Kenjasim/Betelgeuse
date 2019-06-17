import Dashboard from "../containers/dashboard/dashboard"
import Cameras from "../containers/cameras/cameras"
import Power from "../containers/power/power"
import Radar from "../containers/radar/radar"
import AIS from "../containers/ais/ais"
import WiFiPinger from "../containers/wifi_pinger/wifi_pinger"
import DirectionFinder from "../containers/direction_finder/direction_finder"
import Weather from "../containers/weather/weather"
import MRU from "../containers/mru/mru"


const routes = [
  { path: '/',
    component: Dashboard },
  { path: '/cameras',
    component: Cameras },
  { path: '/power',
    component: Power },
  { path: '/radar',
    component: Radar },
  { path: '/ais',
    component: AIS },
  { path: '/wifi_pinger',
    component: WiFiPinger
  },
  { path: '/direction_finder',
    component: DirectionFinder
  },
  { path: '/mru',
    component: MRU
  },
  { path: '/weather',
    component: Weather
  }

];



export default routes;

