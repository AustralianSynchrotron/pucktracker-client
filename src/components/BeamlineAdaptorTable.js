import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import shouldPureComponentUpdate from 'react-pure-render/function'

export class BeamlineAdaptorTable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  renderSlot (slot) {
    const puck = this.props.pucks.find(puck => puck.slot === slot)
    const { name: puckName, lastDewar: dewarName, note } = puck || {}
    const dewar = dewarName ? this.props.dewars.get(dewarName) : null
    const { epn, owner, institute } = dewar || {}
    return (
      <tr>
        <th>{slot}</th>
        <td>{puckName}</td>
        <td>{epn}</td>
        <td>{dewarName}</td>
        <td>{owner}</td>
        <td>{institute}</td>
        <td>{note}</td>
      </tr>
    )
  }
  render () {
    const { name: adaptorName = '–' } = this.props.adaptor || {}
    return (
      <div>
        <h2>{this.props.name}: {adaptorName}</h2>
        <Table striped bordered condensed hover className="puck-table">
          <thead>
            <tr>
              <th className="col-md-1">Position</th>
              <th className="col-md-1">Puck</th>
              <th className="col-md-1">EPN</th>
              <th className="col-md-1">Dewar</th>
              <th className="col-md-3">Owner</th>
              <th className="col-md-3">Institute</th>
              <th className="col-md-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {this.renderSlot('A')}
            {this.renderSlot('B')}
            {this.renderSlot('C')}
            {this.renderSlot('D')}
          </tbody>
        </Table>
      </div>
    )
  }
}
