import React from 'react'
import { Table } from 'react-bootstrap'
import { HolderContainer } from './Holder'

export class NoLocation extends React.Component {
  holders () {
    return this.props.adaptors.filter(holder => !holder.get('place'))
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
            {this.holders().keySeq().map(name => (
              <tr key={name}>
                <td>
                  <HolderContainer type='adaptor' name={name}
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
