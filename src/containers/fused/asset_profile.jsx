import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {setDataObj} from '../../actions'

class AssetProfile extends Component {

  constructor(props) {
    super(props)
  }

  closeDataWindow = () => {
    this.props.setDataObj({'type': 'none', 'id': null})
  }

  render() {

    return (
      <div className="asset-profile">
        <div className="asset-profile-x" onClick={this.closeDataWindow}>X</div>
        <div>Asset: {this.props.id}</div>
        Assets don't have individual profiles yet. As data is accrued, analysis will be done to characterize asset activity
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {setDataObj: setDataObj},
    dispatch
  );
}


export default connect(null, mapDispatchToProps)(AssetProfile);
