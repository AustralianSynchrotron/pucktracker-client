import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { ButtonInput, Button, Input, Glyphicon } from 'react-bootstrap'
import { Puck } from '../reducers/pucks'


export class PuckSelector extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  static propTypes = {
    puck: PropTypes.instanceOf(Puck),
    selectedPuck: PropTypes.string,
    setSelectedPuck: PropTypes.func,
    onDelete: PropTypes.func,
  };
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
  onNoteChange (event) {
    const { value } = event.target
    const { name } = this.props.puck
    this.props.updatePuck(name, {note: value})
  }
  render () {
    const checkbox = (
      <input type="radio"
             onChange={this.onSelection.bind(this)}
             checked={this.isSelected()} />
    )
    let buttonText = this.props.puck.name
    const { lastDewar } = this.props.puck
    if (lastDewar) { buttonText += ` [${lastDewar}]` }
    const { note } = this.props.puck
    return (
      <div style={{paddingBottom: '6px'}}>
        <ButtonInput onClick={this.onSelection.bind(this)}
          className="form-control" standalone
          addonBefore={checkbox}
          active={this.isSelected()}
          buttonAfter={
            <Button onClick={this.props.onDelete}>
              <Glyphicon glyph="remove" />
            </Button>
          }>
          {buttonText}
        </ButtonInput>
        <Input
          type="text" standalone style={{marginTop: '6px'}}
          value={note} placeholder="Notes"
          onChange={this.onNoteChange.bind(this)}
        />
      </div>
    )
  }
}
