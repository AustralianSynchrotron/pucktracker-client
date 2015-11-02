import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

export default class Disconnected extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  render () {
    return (
      <h1>Connecting to the server...</h1>
    )
  }
}
