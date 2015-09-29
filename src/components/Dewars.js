import React from 'react'
import { connect } from 'react-redux'
import { Table, Input } from 'react-bootstrap'

export class Dewars extends React.Component {
  render () {
    return (
      <div>
        <h1>Dewars</h1>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Dewar</th>
              <th>EPN</th>
              <th>Pucks</th>
              <th>On-site</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dewars.sort().toList().map(dewar =>
              <tr key={dewar.get('name')}>
                <td>{dewar.get('name')}</td>
                <td></td>
                <td></td>
                <td></td>
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
    dewars: state.dewars,
  }
}

export const ConnectedDewars = connect(
  mapStateToProps,
  {}
)(Dewars)
