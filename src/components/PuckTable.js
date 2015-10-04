import React, { Component } from 'react/addons'
import { Table } from 'react-bootstrap'
import EditableCell from './EditableCell'


class PuckRow extends Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  attributeChange (puck, attribute, value) {
    this.props.updatePuck(puck, {[attribute]: value})
  }
  render () {
    const { puck } = this.props
    return (
      <tr>
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
    )
  }
}


export class PuckTable extends Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  render () {
    return (
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
          {this.props.pucks.toList().map(puck =>
            <PuckRow key={puck.name} puck={puck}
                     updatePuck={this.props.updatePuck} />
          )}
        </tbody>
      </Table>
    )
  }
}
