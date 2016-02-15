import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { browserHistory } from 'react-router'
import moment from 'moment'
import { Input, Button, ButtonGroup, Table, Glyphicon } from 'react-bootstrap'
import EditableCell from './EditableCell'

export class DewarTableRow extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
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
    browserHistory.push({pathname: '/puck-transfer', query})
    e.preventDefault()
  }
  handleRemoveClick (dewar) {
    const doDelete = confirm(`Permanently delete dewar ${dewar.name}?`)
    if (doDelete) {
      this.props.deleteDewar(dewar.name)
    }
  }
  render () {
    const { dewar } = this.props
    const expectedContainers = dewar.expectedContainers.replace(/,/g, ' ')
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
        <td className='expected-containers'>{expectedContainers}</td>
        <EditableCell value={dewar.note}
          onChange={this.attributeChange.bind(this, 'note')} />
        <td>
          <Time value={dewar.filledTime} format="YYYY-MM-DD HH:mm" />
        </td>
        <td style={{width: '150px'}}>
          <ButtonGroup>
            <Button className='dewar-filled'
                    onClick={() => this.props.setDewarFilled(dewar.name)}>
              <Glyphicon glyph='tint' />
            </Button>
            <Button onClick={this.changeDewarSite.bind(this, !dewar.onsite)}>
              <Glyphicon glyph={dewar.onsite ? 'export' : 'import'} />
            </Button>
            <Button onClick={this.handleRemoveClick.bind(this, dewar)}>
              <Glyphicon glyph="remove" />
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    )
  }
}

const Time = (props) => {
  if (!props.value) return <span/>
  return <time>{moment(props.value).format(props.format)}</time>
}

export class DewarTable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  render () {
    return (
      <Table striped bordered condensed hover style={{fontSize: '13px'}}>
        <thead>
          <tr>
            <th>Dewar</th>
            <th>EPN</th>
            <th>Name</th>
            <th>Institute</th>
            <th>Type</th>
            <th>Expected Pucks</th>
            <th>Notes</th>
            <th>Filled</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.dewars.toList().map(dewar =>
            <DewarTableRow key={dewar.name} dewar={dewar}
              deleteDewar={this.props.deleteDewar}
              updateDewar={this.props.updateDewar}
              setDewarOffsite={this.props.setDewarOffsite}
              setDewarFilled={this.props.setDewarFilled}
            />
          )}
        </tbody>
      </Table>
    )
  }
}
