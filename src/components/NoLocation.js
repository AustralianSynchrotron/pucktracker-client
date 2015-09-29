import React from 'react'
import { Table } from 'react-bootstrap'
import { HolderContainer } from './Holder'
import { TargetPosition } from './TargetPosition'

export class NoLocation extends React.Component {
  holders () {
    return this.props.adaptors.filter(holder => !holder.get('location'))
  }
  moveHolder () {
    this.props.setAdaptorPlace(this.props.selectedHolder, null, null)
    this.props.setSelectedHolder(null)
  }
  render () {
    return (
      <div>
        <h1>Other</h1>
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
              <tr key={holder.get('name')}>
                <td>
                  <HolderContainer type='adaptor' name={holder.get('name')}
                                   {...this.props}/>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
