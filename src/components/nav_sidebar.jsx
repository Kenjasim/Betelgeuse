import React, { Component } from 'react';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';

import links from './links'

class NavSideBar extends Component {

  render() {

    let classes = 'linkGroup'


    return (
      <div className="sideNav">
        <div className="sideNavHeader">
          <div className="navHeaderContent">
            <img src="https://siriusdashboard.s3.eu-west-2.amazonaws.com/SiriusLogo.png" className="siriusLogo" alt=""/>
            <p className="headerText">Sirius Sensor Dashboard</p>
          </div>
        </div>
        <div className="sideNavLinksSection">
          <div className="sideNavLinks">
            <ul className="linkList">
              {
                links.map(({url, link, icon}) => {
                  return (
                    <li className="linkListItem" key={link}>
                      <NavLink exact={true} activeStyle={{color: "#4285F4"}} className="navLink" to={url}>
                        <div className={classes}>
                          {icon}
                          {link}
                        </div>
                      </NavLink>
                    </li>
                  )
                })
              }
            </ul>

          </div>
        </div>
      </div>
    );
  }
}

export default NavSideBar;
