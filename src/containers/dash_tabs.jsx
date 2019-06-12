import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import "~react-tabs/style/react-tabs.css";

class DashTabs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="tab-section">

          <div className="tab-section-inner">
            <Tabs defaultIndex={1}>

              <TabList>
                <Tab disabled={true} disabledClassName="tab-page-title">{this.props.page}</Tab>
                {this.props.tabs.map((tab) => <Tab key={tab.name}>{tab.name}</Tab>)}
              </TabList>

              <div className="tab-content-section">
                <TabPanel></TabPanel>
                {this.props.tabs.map((tab) => {
                  return (
                    <TabPanel key={tab.name}>
                      <div className="tab-container">
                        {tab.component}
                      </div>
                    </TabPanel>
                  )
                })}
              </div>

            </Tabs>
          </div>

      </div>
    );
  }
}

export default DashTabs;
