import React, { Component } from 'react/addons'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { ButtonInput, ButtonGroup, Button } from 'react-bootstrap'


export class PuckSelector extends Component {
  onSelection (event) {
    const selectedPuck = event.target.checked ? this.props.puck.get('name') : null
    this.props.setSelectedPuck(selectedPuck)
  }
  isSelected () {
    return this.props.puck.get('name') === this.props.selectedPuck
  }
  render () {
    const checkbox = (
      <input type="checkbox"
             onChange={this.onSelection.bind(this)}
             checked={this.isSelected()} />
    )
    return (
      <ButtonInput className="form-control" standalone addonBefore={checkbox}>
        {this.props.puck.get('name')}
      </ButtonInput>
    )
  }
}

PuckSelector.propTypes = {
  puck: ImmutablePropTypes.map,
  selectedPuck: React.PropTypes.string,
  setSelectedPuck: React.PropTypes.func,
}

