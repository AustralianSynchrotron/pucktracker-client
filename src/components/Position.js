import React from 'react'
import { ButtonInput } from 'react-bootstrap'
import { fromJS } from 'immutable'
import { HolderContainer } from './Holder'

const adaptors = fromJS({
  'AS-01': {
    'place': {'location': 'LS3000', 'position': 'B'},
  },
  'AS-02': {
    'place': null,
  },
  'AS-03': {
    'place': {'location': 'MX1', 'position': 'Left'},
  },
})

export default class Position extends React.Component {
  render () {
    const {holderLocation, holderPosition} = this.props
    const entry = adaptors.findEntry(adaptor => {
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
              <HolderContainer
                type='adaptor'
                name={adaptorName}
                {...this.props}
              />
            ) : (
              <ButtonInput block disabled standalone>Empty</ButtonInput>
            )
          }
        </td>
      </tr>
    )
  }
}
