import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Table } from 'react-bootstrap'
import EditableCell from './EditableCell'
// import { setNewPuckText } from '../actions/app'
import { addPuck, updatePuck } from '../actions/pucks'

        // <form style={{maxWidth: '300px'}} onSubmit={this.addPuck.bind(this)}>
        //   <Input type="text"
        //          value={this.props.newPuckText}
        //          placeholder="New puck name"
        //          onChange={this.onNewPuckChange.bind(this)}
        //          buttonAfter={
        //            <Button onClick={this.addPuck.bind(this)}>Add puck</Button>
        //          }
        //   />
        // </form>

export class Pucks extends Component {
  // addPuck () {
  //   if (!this.props.newPuckText) return
  //   this.props.addPuck({name: this.props.newPuckText})
  //   this.props.setNewPuckText('')
  // }
  // onNewPuckChange (event) {
  //   this.props.setNewPuckText(event.target.value)
  // }
  attributeChange (puck, attribute, value) {
    this.props.updatePuck(puck, {[attribute]: value})
  }
  render () {
    const pucks = this.props.pucks.sort().toArray()
    return (
      <div>
        <h1>Pucks</h1>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Puck</th>
              <th>Note</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {this.props.pucks.sort().toList().map(puck =>
              <tr key={puck.name}>
                <th>{puck.name}</th>
                <EditableCell
                  value={puck.note}
                  onChange={this.attributeChange.bind(this, puck.name, 'note')}
                />
                <EditableCell
                  value={puck.owner}
                  onChange={this.attributeChange.bind(this, puck.name, 'owner')}
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
    pucks: state.pucks,
    // newPuckText: state.app.get('newPuckText'),
  }
}

export const ConnectedPucks = connect(
  mapStateToProps,
  {addPuck, updatePuck}
  // {addPuck, setNewPuckText, setPuckEpn}
)(Pucks)
