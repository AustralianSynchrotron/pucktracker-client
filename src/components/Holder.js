import React from 'react'
import {ButtonInput} from 'react-bootstrap'

export default class Holder extends React.Component {

  isSelected () {
    return false
  }

  render () {
    const checkbox = <input type="checkbox" />
    return (
      <ButtonInput className="form-control" standalone
                   addonBefore={checkbox}>
        {this.props.adaptor}
      </ButtonInput>
    )
  }
}
