import React, { Component } from 'react/addons'
import { connect } from 'react-redux'
import { Input, Button, Table } from 'react-bootstrap'
import { addDewar, updateDewar, setDewarOffsite } from '../actions/dewars'
import { DewarTable } from './DewarTable'

export class Dewars extends Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  constructor (props) {
    super(props)
    this.state = {newDewarText: ''}
  }
  onNewDewarChange (event) {
    this.setState({newDewarText: event.target.value})
  }
  addDewar () {
    if (!this.state.newDewarText) return
    this.props.addDewar({name: this.state.newDewarText, onsite: true})
    this.setState({newDewarText: ''})
  }
  render () {
    return (
      <div>
        <h1>Dewars</h1>
        <form style={{maxWidth: '300px'}} onSubmit={this.addDewar.bind(this)}>
          <Input type="text"
                 value={this.state.newDewarText}
                 placeholder="New dewar name"
                 onChange={this.onNewDewarChange.bind(this)}
                 buttonAfter={
                   <Button onClick={this.addDewar.bind(this)}>Add dewar</Button>
                 }
          />
        </form>
        <h2>On Site</h2>
        <DewarTable
          dewars={this.props.dewars.filter(dewar => dewar.onsite)}
          updateDewar={this.props.updateDewar}
          setDewarOffsite={this.props.setDewarOffsite}
        />
        <h2>Off Site</h2>
        <DewarTable
          dewars={this.props.dewars.filter(dewar => !dewar.onsite)}
          updateDewar={this.props.updateDewar}
          setDewarOffsite={this.props.setDewarOffsite}
        />
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
  {addDewar, updateDewar, setDewarOffsite}
)(Dewars)
