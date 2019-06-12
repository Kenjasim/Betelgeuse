import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import NavSideBar from './nav_sidebar'
import NavMobile from './nav_mobile'

import routes from './routes'

import App from './app';
import Example from './example';

class Router extends Component {
    constructor(props) {
        super(props);
    }

    render() {

      const routeComponents = routes.map(({path, component}, key) => <Route exact path={path} component={component} key={key} />);
      return (
        <BrowserRouter>
            <NavSideBar />
            <NavMobile />
              <Switch>
                {routeComponents}
                {/*<Redirect from='*' to='/' />*/}
              </Switch>
        </BrowserRouter>
      );
    }
};

export default Router;
