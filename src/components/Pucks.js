import React, { Component } from 'react/addons'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'react-bootstrap'
import { addPuck, updatePuck } from '../actions/pucks'
import Disconnected from './Disconnected'
import { PuckTable } from './PuckTable'

export class Pucks extends Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(
      this, arguments
    )
  }
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
  addPuck () {
    if (!this.state.newPuckText) return
    this.props.addPuck({name: this.state.newPuckText})
    this.setState({newPuckText: ''})
  }
  render () {
    if (!this.props.connected) return (<Disconnected />)
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
                     buttonAfter={
                       <Button onClick={this.addPuck.bind(this)}>Add puck</Button>
                     }
              />
            </form>
          </Col>
        </Row>
        <PuckTable pucks={pucks} updatePuck={this.props.updatePuck} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    connected: state.app.get('connected'),
    pucks: state.pucks,
  }
}

export const ConnectedPucks = connect(
  mapStateToProps,
  {addPuck, updatePuck}
)(Pucks)
