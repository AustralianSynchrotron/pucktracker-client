import React, { Component } from 'react/addons'
import { connect } from 'react-redux'
import { Input, Button } from 'react-bootstrap'
import { addPuck, updatePuck } from '../actions/pucks'
import Disconnected from './Disconnected'
import { PuckTable } from './PuckTable'

export class Pucks extends Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(
      this, arguments
    )
  }
  constructor (props) {
    super(props)
    this.state = {newPuckText: ''}
  }
  onNewPuckChange (event) {
    this.setState({newPuckText: event.target.value})
  }
  addPuck () {
    if (!this.state.newPuckText) return
    this.props.addPuck({name: this.state.newPuckText})
    this.setState({newPuckText: ''})
  }
  render () {
    if (!this.props.connected) return (<Disconnected />)
    return (
      <div>
        <h1>Pucks</h1>
        <form style={{maxWidth: '300px'}} onSubmit={this.addPuck.bind(this)}>
          <Input type="text"
                 value={this.state.newPuckText}
                 placeholder="New puck name"
                 onChange={this.onNewPuckChange.bind(this)}
                 buttonAfter={
                   <Button onClick={this.addPuck.bind(this)}>Add puck</Button>
                 }
          />
        </form>
        <PuckTable pucks={this.props.pucks} updatePuck={this.props.updatePuck} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    connected: state.app.get('connected'),
    pucks: state.pucks,
  }
}

export const ConnectedPucks = connect(
  mapStateToProps,
  {addPuck, updatePuck}
)(Pucks)
