import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

export default class Disconnected extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  static propTypes = {
    serverConnected: PropTypes.bool,
    databaseConnected: PropTypes.bool,
  };
  text () {
    if (!this.props.serverConnected) {
      return 'Connecting to the server...'
    } else {
      return 'Database disconnected'
    }
  }
  render () {
    return (<h1>{this.text()}</h1>)
  }
}
