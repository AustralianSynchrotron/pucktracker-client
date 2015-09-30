import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Table } from 'react-bootstrap'
import EditableCell from './EditableCell'
import { addPuck, updatePuck } from '../actions/pucks'

export class Pucks extends Component {
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
  attributeChange (puck, attribute, value) {
    this.props.updatePuck(puck, {[attribute]: value})
  }
  render () {
    const pucks = this.props.pucks.sort().toArray()
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
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Puck</th>
              <th>Location</th>
              <th>Note</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {this.props.pucks.sort().toList().map(puck =>
              <tr key={puck.name}>
                <th>{puck.name}</th>
                <th>{puck.receptacle}</th>
                <EditableCell
                  value={puck.note}
                  onChange={this.attributeChange.bind(this, puck.name, 'note')}
                />
                <EditableCell
                  value={puck.owner}
                  onChange={this.attributeChange.bind(this, puck.name, 'owner')}
                />
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pucks: state.pucks,
    // newPuckText: state.app.get('newPuckText'),
  }
}

export const ConnectedPucks = connect(
  mapStateToProps,
  {addPuck, updatePuck}
  // {addPuck, setNewPuckText, setPuckEpn}
)(Pucks)
