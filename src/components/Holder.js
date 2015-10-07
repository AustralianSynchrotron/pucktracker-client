import React from 'react'
import { ButtonInput, Button, Glyphicon } from 'react-bootstrap'

export class Holder extends React.Component {
  onSelection () {
    const checked = !this.isSelected()
    this.props.onSelection(this.props.type, this.props.name, checked)
  }
  isSelected () {
    return this.props.name === this.props.selectedHolder
  }
  goToAdaptor () {
    const query = { left: 'adaptor', leftAdaptor: this.props.name }
    this.props.history.pushState(null, '/puck-transfer', query)
  }
  render () {
    const checkbox = (
      <input type="radio"
        onChange={this.onSelection.bind(this)}
        checked={this.isSelected()} />
    )
    const editButton = (
      <Button onClick={this.goToAdaptor.bind(this)}>
        <Glyphicon glyph="edit" />
      </Button>
    )
    return (
      <ButtonInput className="form-control holder" standalone
        onClick={this.onSelection.bind(this)}
        addonBefore={checkbox}
        buttonAfter={editButton}>
        {this.props.name}
      </ButtonInput>
    )
  }
}

export class HolderContainer extends React.Component {
  onSelection (type, name, checked) {
    this.props.setSelectedHolder(checked ? name : null)
  }
  render () {
    return <Holder onSelection={this.onSelection.bind(this)}
                   {...this.props} />
  }
}
