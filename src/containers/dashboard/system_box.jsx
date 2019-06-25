import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
import cogoToast from 'cogo-toast';


class SystemBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      response: false,
      endpoint: this.props.endpoint,
      receiving: false
    }
    this.socket = io.connect(this.state.endpoint)
  }

  openSocket() {
    const options = {
      position: 'top-left'
    }
    this.socket.on('connected',  (data) => {
        this.socket.emit('ready for data', {})

      });
      this.socket.on('update',  (data) => {
        const message = data.message.payload
        this.setState({message: message})
        if (!this.state.receiving) {
          this.setState({receiving: true})
          cogoToast.success(`${this.props.name} connected`, options);
        }
    });
  }


  componentDidUpdate(prevProps, prevState) {
    const x = document.getElementById(this.props.name)
    x.className = "system-box--flash show";
    setTimeout(function(){ x.className = x.className.replace("system-box--flash show", "system-box--flash"); }, 500);


  }

  componentDidMount() {
    this.openSocket()
  }
  componentWillUnmount() {
    this.socket.disconnect()
  }


  render() {

    let box_classes = 'system-box'
    if (this.props.disabled) {
      box_classes += ' system-disabled'
    } else {
      box_classes += ' system-enabled'
    }

    return(

      <Link to={this.props.link}>

          <div className={box_classes}>
            <div id={this.props.name} className=""></div>
              <div className="system-box-title">
                {this.props.name}:
              </div>
              <div className="system-box-message">
                {this.state.message}
              </div>

          </div>
      </Link>

    )
  }
}

export default SystemBox;
