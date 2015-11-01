import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { Table, Button, Glyphicon } from 'react-bootstrap'
import EditableCell from './EditableCell'


class PuckRow extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  attributeChange (attribute, value) {
    const { name } = this.props.puck
    this.props.updatePuck(name, {[attribute]: value})
  }
  handleRemoveClick (puck) {
    const doDelete = confirm(`Permanently delete puck ${puck.name}?`)
    if (doDelete) {
      this.props.deletePuck(puck.name)
    }
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
        <td>
          <Button block onClick={this.handleRemoveClick.bind(this, puck)}>
            <Glyphicon glyph="remove" />
          </Button>
        </td>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.pucks.toList().map(puck =>
            <PuckRow key={puck.name} puck={puck}
                     deletePuck={this.props.deletePuck}
                     updatePuck={this.props.updatePuck} />
          )}
        </tbody>
      </Table>
    )
  }
}
