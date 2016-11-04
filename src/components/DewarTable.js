import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { browserHistory } from 'react-router'
import moment from 'moment'
import classNames from 'classnames'
import {
  Input, Button, ButtonGroup, Table, Glyphicon, OverlayTrigger, Tooltip
} from 'react-bootstrap'
import EditableCell from './EditableCell'

const MS_PER_DAY = 86400000
const MAX_TIME_BETWEEN_FILLS = 5 * MS_PER_DAY

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
  onDewarClick (event) {
    event.preventDefault()
    const query = {
      left: 'dewar',
      right: 'adaptor',
      leftDewar: this.props.dewar.name,
    }
    browserHistory.push({pathname: '/puck-transfer', query})
  }
  handleEditClick () {
    browserHistory.push({pathname: `/dewars/${this.props.dewar.name}`})
  }
  handleRemoveClick (dewar) {
    const doDelete = confirm(`Permanently delete dewar ${dewar.name}?`)
    if (doDelete) {
      this.props.deleteDewar(dewar.name)
    }
  }
  handleMissingClick () {
    this.props.setDewarMissing(this.props.dewar.name, !this.props.dewar.missing)
  }
  dewarRequiresFill () {
    const { dewar, onsite } = this.props
    if (!onsite) return false
    if (!dewar.filledTime) return true
    return new Date() - dewar.filledTime >= MAX_TIME_BETWEEN_FILLS
  }
  dewarOverdue () {
    const { dewar, onsite } = this.props
    if (!onsite || !dewar.experimentEndTime) return false
    return new Date() > dewar.experimentEndTime
  }
  render () {
    const { dewar, onsite } = this.props
    const { name } = dewar
    const requiresFill = this.dewarRequiresFill()
    const overdue = this.dewarOverdue()
    const rowClassNames = classNames({
      warning: requiresFill || overdue,
      danger: onsite && dewar.missing,
    })
    return (
      <tr key={dewar.name} className={rowClassNames}>
        <th style={{width: '94px'}}>
          <a href="#" onClick={this.onDewarClick.bind(this)}>{dewar.name}</a>
        </th>
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
        <td className={classNames({filledTime: 1, danger: requiresFill})}
          style={{width: '120px'}}>
          <Time value={dewar.filledTime} relative={true} />
        </td>
        <td className={classNames({experimentEndTime: 1, danger: overdue})}
          style={{width: '120px'}}>
          <Time value={dewar.experimentEndTime} format="YYYY-MM-DD HH:mm" />
        </td>
        <td style={{width: '210px'}}>
          <ButtonGroup>
            <Label text='Dewar filled' tipId={`${name}-filled`}>
              <Button className='dewar-filled'
                      onClick={() => this.props.setDewarFilled(dewar.name)}>
                <Glyphicon glyph='tint' />
              </Button>
            </Label>
            <Label text={`Set dewar ${dewar.onsite ? 'off site' : 'on site'}`}
                   tipId={`${name}-onsite`}>
              <Button onClick={this.changeDewarSite.bind(this, !dewar.onsite)}>
                <Glyphicon glyph={dewar.onsite ? 'export' : 'import'} />
              </Button>
            </Label>
            <Label text={`Flag dewar ${dewar.missing ? 'found' : 'missing'}`}
                   tipId={`${name}-missing`}>
              <Button className='dewar-missing'
                onClick={() => this.handleMissingClick()}>
                <Glyphicon glyph={dewar.missing ? 'ok-sign' : 'question-sign'} />
              </Button>
            </Label>
            <Label text='Edit dewar data' tipId={`${name}-edit`}>
              <Button onClick={() => this.handleEditClick()}>
                <Glyphicon glyph='edit' />
              </Button>
            </Label>
            <Label text='Delete dewar' tipId={`${name}-delete`}>
              <Button onClick={this.handleRemoveClick.bind(this, dewar)}>
                <Glyphicon glyph="remove" />
              </Button>
            </Label>
          </ButtonGroup>
        </td>
      </tr>
    )
  }
}

const Label = (props) => (
  <OverlayTrigger placement="top" overlay={
    <Tooltip id={props.tipId}>{props.text}</Tooltip>
  }>
    {props.children}
  </OverlayTrigger>
)

class Time extends Component {
  componentDidMount () {
    // Refresh every 10 seconds so relative time strings will update
    this.interval = setInterval(() => this.forceUpdate(), 10000)
  }
  componentWillUnmount () {
    clearInterval(this.interval)
  }
  render () {
    const { value, relative, format } = this.props
    if (!value) return <span/>
    const timeString = !!relative ? moment(value).fromNow()
                       : moment(value).format(format)
    return <time>{timeString}</time>
  }
}

export class DewarTable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  render () {
    const { dewars, displayDays } = this.props
    let dewarsToDisplay = dewars.toList().sortBy(dewar => dewar.addedTime).reverse()
    if (displayDays) {
      const now = new Date()
      dewarsToDisplay = dewarsToDisplay.filter(dewar =>
        /^s-/.test(dewar.name)  // Staff dewar
        || (dewar.addedTime && (now - dewar.addedTime) < displayDays * MS_PER_DAY)
      )
    }
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
            <th>Experiment Ends</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dewarsToDisplay.map(dewar =>
            <DewarTableRow key={dewar.name}
              onsite={this.props.onsite}
              dewar={dewar}
              deleteDewar={this.props.deleteDewar}
              updateDewar={this.props.updateDewar}
              setDewarOffsite={this.props.setDewarOffsite}
              setDewarFilled={this.props.setDewarFilled}
              setDewarMissing={this.props.setDewarMissing}
            />
          )}
        </tbody>
      </Table>
    )
  }
}
