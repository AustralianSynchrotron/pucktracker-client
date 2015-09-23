import React from 'react'
import { ButtonInput } from 'react-bootstrap'
import { Map, fromJS } from 'immutable'
import { HolderContainer } from './Holder'

class EmptyPosition extends React.Component {
  onClick () {
    const {selectedHolder, holderLocation, holderPosition} = this.props
    this.props.setAdaptorPlace(selectedHolder, {
      location: holderLocation,
      position: holderPosition,
    })
    this.props.setSelectedHolder(null)
  }
  isDisabled () {
    return !this.props.selectedHolder
  }
  render () {
    return (
      <ButtonInput block disabled={this.isDisabled()} standalone
                   onClick={this.onClick.bind(this)}>
        Empty
      </ButtonInput>
    )
  }
}

export default class Position extends React.Component {
  render () {
    const {holderLocation, holderPosition} = this.props
    const entry = this.props.adaptors.findEntry(adaptor => {
      const adaptorPlace = adaptor.get('place')
      if (!adaptorPlace) { return false }
      return (adaptorPlace.get('location') === holderLocation &&
              adaptorPlace.get('position') === holderPosition)
    })
    const [adaptorName, data] = entry ? entry : [null, null]
    return (
      <tr>
        <td>{this.props.holderPosition}</td>
        <td style={{width: '70%'}}>
          {adaptorName ? (
            <HolderContainer type='adaptor' name={adaptorName}
                             {...this.props}/>
          ) : (
            <EmptyPosition {...this.props}/>
          )}
        </td>
      </tr>
    )
  }
}
Position.defaultProps = {adaptors: Map()}
