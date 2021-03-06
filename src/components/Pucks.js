import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'react-bootstrap'
import { addPuck, deletePuck, updatePuck } from '../actions/pucks'
import { PuckTable } from './PuckTable'

export class Pucks extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  constructor (props) {
    super(props)
    this.state = {newPuckText: '', searchText: ''}
  }
  onNewPuckChange (event) {
    this.setState({newPuckText: event.target.value})
  }
  onSearchChange (event) {
    this.setState({searchText: event.target.value})
  }
  addPuck (event) {
    event.preventDefault()
    if (!this.state.newPuckText) return
    this.props.addPuck({name: this.state.newPuckText})
    this.setState({newPuckText: ''})
  }
  render () {
    const searchText = this.state.searchText.toLowerCase()
    let pucks = this.props.pucks
    if (searchText) {
      pucks = pucks.filter(puck => {
        return (
          puck.name.toLowerCase().indexOf(searchText) > -1
          || (puck.receptacle
              && puck.receptacle.toLowerCase().indexOf(searchText) > -1)
          || puck.owner.toLowerCase().indexOf(searchText) > -1
          || puck.institute.toLowerCase().indexOf(searchText) > -1
          || puck.email.toLowerCase().indexOf(searchText) > -1
          || puck.note.toLowerCase().indexOf(searchText) > -1
        )
      })
    }
    return (
      <div>
        <h1>Pucks</h1>
        <Row>
          <Col md={4}>
            <Input
              type="text"
              placeholder="Search"
              value={this.state.searchText}
              onChange={this.onSearchChange.bind(this)}
            />
          </Col>
          <Col md={4}>
          </Col>
          <Col md={4}>
            <form onSubmit={this.addPuck.bind(this)}>
              <Input type="text"
                     value={this.state.newPuckText}
                     placeholder="New puck name"
                     onChange={this.onNewPuckChange.bind(this)}
                     buttonAfter={<Button type="submit">Add puck</Button>}
              />
            </form>
          </Col>
        </Row>
        <PuckTable
          pucks={pucks}
          deletePuck={this.props.deletePuck}
          updatePuck={this.props.updatePuck} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pucks: state.pucks,
  }
}

export const ConnectedPucks = connect(
  mapStateToProps,
  {addPuck, deletePuck, updatePuck}
)(Pucks)
