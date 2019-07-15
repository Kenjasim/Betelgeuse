import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NavSideBar from '../components/nav_sidebar'
import NavMobile from '../components/nav_mobile'

import routes from '../components/routes'

import {setBST} from '../actions'



class Router extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      this.props.setBST()
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {setBST: setBST},
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Router);
