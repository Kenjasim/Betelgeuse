import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import io from "socket.io-client";

class SystemBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      response: false,
      endpoint: this.props.endpoint
    }
    this.socket = io.connect(this.state.endpoint)
  }

  openSocket() {
    this.socket.on('connected',  (data) => {
        this.socket.emit('ready for data', {})
      });
      this.socket.on('update',  (data) => {
        const message = data.message.payload
        console.log(message)
        this.setState({message: message})

    });
  }

  componentDidMount() {
    this.openSocket()
  }


  render() {

    let box_classes = 'system-box'
    if (this.props.disabled) {
      box_classes += ' system-disabled'
    } else {
      box_classes += ' system-enabled'
    }

    return(

      <Link to="/ais">
        <div className={box_classes}>
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
