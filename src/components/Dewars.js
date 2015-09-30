import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Table } from 'react-bootstrap'
import EditableCell from './EditableCell'
import { setNewDewarText } from '../actions/app'
import { addDewar, updateDewar } from '../actions/dewars'

export class Dewars extends Component {
  addDewar () {
    if (!this.props.newDewarText) return
    this.props.addDewar({name: this.props.newDewarText})
    this.props.setNewDewarText('')
  }
  onNewDewarChange (event) {
    this.props.setNewDewarText(event.target.value)
  }
  attributeChange (dewar, attribute, value) {
    this.props.updateDewar(dewar, {[attribute]: value})
  }
  render () {
    const dewars = this.props.dewars.sort().toArray()
    return (
      <div>
        <h1>Dewars</h1>
        <form style={{maxWidth: '300px'}} onSubmit={this.addDewar.bind(this)}>
          <Input type="text"
                 value={this.props.newDewarText}
                 placeholder="New dewar name"
                 onChange={this.onNewDewarChange.bind(this)}
                 buttonAfter={
                   <Button onClick={this.addDewar.bind(this)}>Add dewar</Button>
                 }
          />
        </form>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Dewar</th>
              <th>EPN</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dewars.sort().toList().map(dewar =>
              <tr key={dewar.name}>
                <th>{dewar.name}</th>
                <EditableCell
                  value={dewar.epn}
                  onChange={this.attributeChange.bind(this, dewar.name, 'epn')}
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
    dewars: state.dewars,
    newDewarText: state.app.get('newDewarText'),
  }
}

export const ConnectedDewars = connect(
  mapStateToProps,
  {addDewar, setNewDewarText, updateDewar}
)(Dewars)
