import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { TiThMenu } from "react-icons/ti";
import { BrowserRouter, Link, NavLink } from 'react-router-dom';

import links from './links'

class NavMobile extends Component {


  render() {
    return (

      <div id="mobileNavToggle" className="nav-mobile">
        <div className="nav-mobile-inner">
          <UncontrolledDropdown>
            <DropdownToggle id="toggleButton">
              <TiThMenu className="dropdown-burger"/>
            </DropdownToggle>
            <DropdownMenu>
              {links.map(({url, link}) => {
                return (
                  <DropdownItem>
                    <Link to={url} className="dropdown-links">{link}</Link>
                  </DropdownItem>
                )
              })}

             {/* <DropdownItem>
                Action
              </DropdownItem>
              <DropdownItem>
                Another Action
              </DropdownItem>
              <DropdownItem>
                Another Action
              </DropdownItem>*/}
            </DropdownMenu>
          </UncontrolledDropdown>
          <div></div>
        </div>
      </div>

    );
  }
}

export default NavMobile;
