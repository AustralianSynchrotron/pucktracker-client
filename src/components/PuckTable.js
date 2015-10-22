import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { Table } from 'react-bootstrap'
import EditableCell from './EditableCell'


class PuckRow extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  attributeChange (attribute, value) {
    const { name } = this.props.puck
    this.props.updatePuck(name, {[attribute]: value})
  }
  render () {
    const { puck } = this.props
    return (
      <tr>
        <th>{puck.name}</th>
        <th>{puck.receptacle}</th>
        <th>{puck.lastDewar}</th>
        <EditableCell
          value={puck.owner}
          onChange={this.attributeChange.bind(this, 'owner')}
        />
        <EditableCell
          value={puck.institute}
          onChange={this.attributeChange.bind(this, 'institute')}
        />
        <EditableCell
          value={puck.email}
          onChange={this.attributeChange.bind(this, 'email')}
        />
        <EditableCell
          value={puck.note}
          onChange={this.attributeChange.bind(this, 'note')}
        />
      </tr>
    )
  }
}


export class PuckTable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  render () {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Puck</th>
            <th>Location</th>
            <th>Dewar</th>
            <th>Owner</th>
            <th>Institute</th>
            <th>Email</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {this.props.pucks.toList().map(puck =>
            <PuckRow key={puck.name} puck={puck}
                     updatePuck={this.props.updatePuck} />
          )}
        </tbody>
      </Table>
    )
  }
}
