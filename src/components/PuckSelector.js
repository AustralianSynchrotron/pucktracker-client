import React, { Component, PropTypes } from 'react/addons'
import { ButtonInput, ButtonGroup, Button } from 'react-bootstrap'
import { Puck } from '../reducers/pucks'

export class PuckSelector extends Component {
  onSelection (event) {
    const selectedPuck = event.target.checked ? this.props.puck.name : null
    this.props.setSelectedPuck(selectedPuck)
  }
  isSelected () {
    return this.props.puck.name === this.props.selectedPuck
  }
  render () {
    const checkbox = (
      <input type="checkbox"
             onChange={this.onSelection.bind(this)}
             checked={this.isSelected()} />
    )
    return (
      <ButtonInput className="form-control" standalone addonBefore={checkbox}>
        {this.props.puck.name}
      </ButtonInput>
    )
  }
}

PuckSelector.propTypes = {
  puck: PropTypes.instanceOf(Puck),
  selectedPuck: PropTypes.string,
  setSelectedPuck: PropTypes.func,
}
