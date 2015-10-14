import React, { Component } from 'react/addons'
import { Input, Button, Table } from 'react-bootstrap'
import EditableCell from './EditableCell'

class Row extends Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  attributeChange (attribute, value) {
    const { name } = this.props.dewar
    this.props.updateDewar(name, {[attribute]: value})
  }
  changeDewarSite (onsite) {
    const { name } = this.props.dewar
    if (onsite) {
      this.props.updateDewar(name, {onsite})
    } else {
      this.props.setDewarOffsite(name)
    }
  }
  onDewarClick (e) {
    const query = {
      left: 'dewar',
      right: 'adaptor',
      leftDewar: this.props.dewar.name,
    }
    this.context.history.pushState(null, '/puck-transfer', query)
    e.preventDefault()
  }
  render () {
    const { dewar } = this.props
    return (
      <tr key={dewar.name}>
        <th><a href="#" onClick={this.onDewarClick.bind(this)}>{dewar.name}</a></th>
        <EditableCell value={dewar.epn}
          onChange={this.attributeChange.bind(this, 'epn')} />
        <EditableCell value={dewar.owner}
          onChange={this.attributeChange.bind(this, 'owner')} />
        <EditableCell value={dewar.institute}
          onChange={this.attributeChange.bind(this, 'institute')}/>
        <EditableCell value={dewar.containerType}
          onChange={this.attributeChange.bind(this, 'containerType')}/>
        <EditableCell value={dewar.expectedContainers}
          onChange={this.attributeChange.bind(this, 'expectedContainers')}/>
        <EditableCell value={dewar.note}
          onChange={this.attributeChange.bind(this, 'note')} />
        <td>
          <Button block
            onClick={this.changeDewarSite.bind(this, !dewar.onsite)}>
            { dewar.onsite ? 'Move Off Site' : 'Move On Site' }
          </Button>
        </td>
      </tr>
    )
  }
}

Row.contextTypes = {
  history: React.PropTypes.object.isRequired,
}

export class DewarTable extends Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  render () {
    return (
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Dewar</th>
              <th>EPN</th>
              <th>Name</th>
              <th>Institute</th>
              <th>Type</th>
              <th>Expected Pucks</th>
              <th>Notes</th>
              <th>Ship</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dewars.toList().map(dewar =>
              <Row key={dewar.name} dewar={dewar}
                updateDewar={this.props.updateDewar}
                setDewarOffsite={this.props.setDewarOffsite}
              />
            )}
          </tbody>
        </Table>
    )
  }
}
