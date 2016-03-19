import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { connect } from 'react-redux'
import { Input } from 'react-bootstrap'
import { updateDewar } from '../actions/dewars'

class DewarInput extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  onInputChange (event) {
    const { dewar, updateDewar, field } = this.props
    const { value } = event.target
    updateDewar(dewar.name, {[field]: value})
  }
  render () {
    const { dewar, field, label } = this.props
    const value = dewar[field]
    return (
      <Input type="text" labelClassName="col-xs-3" wrapperClassName="col-xs-6"
        label={label} value={value} onChange={this.onInputChange.bind(this)} />
    )
  }
}

class DewarCheckbox extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  onInputChange (event) {
    const { dewar, updateDewar, field } = this.props
    const { checked } = event.target
    updateDewar(dewar.name, {[field]: checked})
  }
  render () {
    const { dewar, field, label } = this.props
    const value = dewar[field]
    return (
      <Input type="checkbox" wrapperClassName="col-xs-offset-3 col-xs-9"
        id={this.props.id} label={label} checked={value}
        onChange={this.onInputChange.bind(this)} />
    )
  }
}

export class DewarDetails extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  render () {
    const { dewar, updateDewar } = this.props
    if (!dewar) return <h1>Dewar not found</h1>
    return (
      <div>
        <h1>Dewar {dewar.name}</h1>
        <form className="form-horizontal">
          <DewarInput field='epn' label='EPN' {...this.props} />
          <DewarInput field='owner' label='Owner' {...this.props} />
          <DewarInput field='institute' label='Institute' {...this.props} />
          <DewarInput field='note' label='Note' {...this.props} />
          <DewarInput field='containerType' label='Type' {...this.props} />
          <DewarInput field='expectedContainers' label='Containers'
                      {...this.props} />
          <DewarInput field='department' label='Department' {...this.props} />
          <DewarInput field='streetAddress' label='Address' {...this.props} />
          <DewarInput field='city' label='City' {...this.props} />
          <DewarInput field='state' label='State' {...this.props} />
          <DewarInput field='postcode' label='Postcode' {...this.props} />
          <DewarInput field='country' label='Country' {...this.props} />
          <DewarInput field='phone' label='Phone' {...this.props} />
          <DewarInput field='email' label='Email' {...this.props} />
          <DewarInput field='courier' label='Courier' {...this.props} />
          <DewarInput field='courierAccount' label='Courier account'
                      {...this.props} />
          <DewarCheckbox id="returnDewar" field="returnDewar" label="Return dewar"
                         {...this.props} />
        </form>
      </div>
    )
  }
}

export const ConnectedDewarDetails = connect(
  (state, ownProps) => ({dewar: state.dewars.get(ownProps.params.dewarId)}),
  { updateDewar }
)(DewarDetails)
