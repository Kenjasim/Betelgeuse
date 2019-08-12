import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment'

import { setTime } from '../../actions'


class AssetSearch extends Component {
  constructor(props) {
    super(props)
    const d1 = new Date();
    let d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() - 10);
    this.state = {
      startDate: d2,
      endDate: d1,
      all: false,
      selectedAssetType: null,
      datePickerDisabled: false,
      loading: false


    }
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    // this.handleDateSelected = this.handleDateSelected.bind(this);
  }

  handleStartChange(date) {
    this.setState({
      startDate: date
    }, () => {
        console.log(date)
    });

  }

  handleEndChange(date) {
    this.setState({
      endDate: date
    }, () => {
        console.log(date)
    });

  }

  handleClick = () => {
    this.setState({
      all: !this.state.all,
      datePickerDisabled: !this.state.datePickerDisabled
    })
  }

  handleOptionChange = (changeEvent) => {
    let typeString = changeEvent.target.value
    console.log(typeString )
    if (typeString == this.state.selectedAssetType) {
      typeString = null
    }
    this.setState({
      selectedAssetType: typeString
    });
  }

  convertDate(date) {
    const d = moment(date).format()
    return d.slice(0, 19).replace('T', ' ');
  }

  componentDidMount() {
    this.props.setTime(this.convertDate(this.state.startDate), this.convertDate(this.state.endDate))
  }


  render() {
    const today = new Date ();
    let btnStyle = "asset-all"
    if (this.state.all) {
      btnStyle += " all-selected"
    }

    return (
      <div className="asset-search-container">
        <div className="asset-date-section">
          <div className="date-filter-section">
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleStartChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                disabled={this.state.datePickerDisabled}

                maxDate={this.state.endDate}
                minDate={1}
                maxTime={this.state.startDate.getDate() === this.state.endDate.getDate() ? this.state.endDate : (new Date(new Date().setHours(23,59)))}
                minTime={new Date(new Date().setHours(0,0,0,0))}
              />
              <div className="date-to">
              to
              </div>
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleEndChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                disabled={this.state.datePickerDisabled}

                maxDate={new Date ()}
                minDate={this.state.startDate}
                maxTime={ today.getDate() === this.state.endDate.getDate() ? this.state.endDate : (new Date(new Date().setHours(23,59)))}
                minTime={this.state.startDate.getDate() === this.state.endDate.getDate() ? this.state.startDate : (new Date(new Date().setHours(0,0,0,0)))}
              />
              <div className={btnStyle} onClick={this.handleClick}>All Time</div>
            </div>
        </div>
        <div className="asset-search-section">
          <div className="checkboxes-box">
            <form action="" className="checkboxes-box">
              <label>
                <div className="radio-pair">
                  <input className="asset-radio" type="radio" value="sid" checked={this.state.selectedAssetType == 'sid'} onClick={this.handleOptionChange} readOnly={true}/>
                  <div className="radio-text">
                    SID
                  </div>
                </div>
              </label>
              <label>
                <div className="radio-pair">
                  <input className="asset-radio" type="radio" value="mmsi" checked={this.state.selectedAssetType =='mmsi'} onClick={this.handleOptionChange} readOnly={true}/>
                  <div className="radio-text">
                    MMSI
                  </div>
                </div>
              </label>
            </form>
          </div>
          <Select
            defaultValue={[]}
            isMulti
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <div className="asset-search-btn">
            Search
          </div>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {setTime: setTime},
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(AssetSearch);














