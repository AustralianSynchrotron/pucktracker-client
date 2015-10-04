import React from 'react'
import {ButtonInput} from 'react-bootstrap'

export class Holder extends React.Component {
  onSelection () {
    const checked = !this.isSelected()
    this.props.onSelection(this.props.type, this.props.name, checked)
  }
  isSelected () {
    return this.props.name === this.props.selectedHolder
  }
  render () {
    const checkbox = <input type="radio"
                            onChange={this.onSelection.bind(this)}
                            checked={this.isSelected()} />
    return (
      <ButtonInput className="form-control holder" standalone
                   onClick={this.onSelection.bind(this)} addonBefore={checkbox}>
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
