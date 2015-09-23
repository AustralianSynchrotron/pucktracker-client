import React from 'react'
import { Table } from 'react-bootstrap'
import Position from './Position'

const POSITIONS = {
  'LS3000': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
  'MX1': ['Left', 'Middle', 'Right'],
  'MX2': ['Left', 'Middle', 'Right'],
}

export default class Location extends React.Component {
  render () {
    const positions = POSITIONS[this.props.holderLocation]
    return (
      <div>
        <h1>{this.props.holderLocation}</h1>
        <Table striped>
          <thead>
            <tr><th>Location</th><th>Holder</th></tr>
          </thead>
          <tbody>
            {positions.map(position => (
              <Position key={position}
                        holderPosition={position}
                        {...this.props}
              />
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
