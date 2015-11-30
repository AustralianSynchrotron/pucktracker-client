import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { Table } from 'react-bootstrap'
import { HolderContainer } from './Holder'
import { TargetPosition } from './TargetPosition'

export class NoLocation extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  holders () {
    return this.props.adaptors.filter(holder => !holder.get('location'))
  }
  moveHolder () {
    this.props.setAdaptorPlace(this.props.selectedHolder, null, null)
    this.props.setSelectedHolder(null)
  }
  hasPucks (holder) {
    return !!this.props.pucks.find(puck => puck.receptacle === holder.name)
  }
  render () {
    return (
      <div>
        <h1>Wall</h1>
        <Table striped>
          <thead>
            <tr><th>Holder</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <TargetPosition isDisabled={!this.props.selectedHolder}
                                onClick={this.moveHolder.bind(this)}>
                  Move holder
                </TargetPosition>
              </td>
            </tr>
            {this.holders().toList().map(holder => (
              <tr key={holder.name}>
                <td>
                  <HolderContainer type='adaptor' name={holder.name}
                    className={this.hasPucks(holder) ? 'btn-danger' : ''}
                    {...this.props}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
