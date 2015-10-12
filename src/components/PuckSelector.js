import React, { Component, PropTypes } from 'react/addons'
import { ButtonInput, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'
import { Puck } from '../reducers/pucks'


export class PuckSelector extends Component {
  onSelection (event) {
    let selectedPuck = null
    if (this.props.selectedPuck !== this.props.puck.name) {
      selectedPuck = this.props.puck.name
    }
    this.props.setSelectedPuck(selectedPuck)
  }
  isSelected () {
    return this.props.puck.name === this.props.selectedPuck
  }
  render () {
    const checkbox = (
      <input type="radio"
             onChange={this.onSelection.bind(this)}
             checked={this.isSelected()} />
    )
    return (
      <ButtonInput onClick={this.onSelection.bind(this)}
        className="form-control" standalone addonBefore={checkbox}
        active={this.isSelected()}
        buttonAfter={
          <Button onClick={this.props.onDelete}>
            <Glyphicon glyph="remove" />
          </Button>
        }>
        {this.props.puck.name}
      </ButtonInput>
    )
  }
}

PuckSelector.propTypes = {
  puck: PropTypes.instanceOf(Puck),
  selectedPuck: PropTypes.string,
  setSelectedPuck: PropTypes.func,
  onDelete: PropTypes.func,
}
