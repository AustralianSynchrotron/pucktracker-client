import React, { Component } from 'react/addons'
import { Input, Button, Table } from 'react-bootstrap'
import EditableCell from './EditableCell'

class Row extends Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  attributeChange (dewar, attribute, value) {
    this.props.updateDewar(dewar, {[attribute]: value})
  }
  changeDewarSite (dewarName, onsite) {
    if (onsite) {
      this.props.updateDewar(dewarName, {onsite})
    } else {
      this.props.setDewarOffsite(dewarName)
    }
  }
  render () {
    const { dewar } = this.props
    return (
      <tr key={dewar.name}>
        <th>{dewar.name}</th>
        <EditableCell value={dewar.epn}
          onChange={this.attributeChange.bind(this, dewar.name, 'epn')} />
        <EditableCell value={dewar.owner}
          onChange={this.attributeChange.bind(this, dewar.name, 'owner')} />
        <EditableCell value={dewar.note}
          onChange={this.attributeChange.bind(this, dewar.name, 'note')} />
        <td>
          <Button block
            onClick={this.changeDewarSite.bind(this, dewar.name, !dewar.onsite)}>
            { dewar.onsite ? 'Move Off Site' : 'Move On Site' }
          </Button>
        </td>
      </tr>
    )
  }
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
              <th>Owner</th>
              <th>Note</th>
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
