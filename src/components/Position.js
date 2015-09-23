import React from 'react'
import {ButtonInput} from 'react-bootstrap'
import {fromJS} from 'immutable'
import Holder from './Holder'

const adaptors = fromJS({
  'AS-01': {
    'place': {'location': 'LS3000', 'position': 'B'},
  },
  'AS-02': {
    'place': null,
  },
})

export default class Position extends React.Component {
  onPositionClick () {
  }
  render () {
    const {location, position} = this.props
    const entry = adaptors.findEntry(adaptor => {
      const adaptorPlace = adaptor.get('place')
      if (!adaptorPlace) { return false }
      return (adaptorPlace.get('location') === location &&
              adaptorPlace.get('position') === position)
    })
    const [adaptorName, data] = entry ? entry : [null, null]
    return (
      <tr>
        <td>{this.props.position}</td>
        <td style={{width: '70%'}}>
          {adaptorName ? (
              <Holder adaptor={adaptorName}/>
            ) : (
              <ButtonInput block disabled standalone>Empty</ButtonInput>
            )
          }
        </td>
      </tr>
    )
  }
}
