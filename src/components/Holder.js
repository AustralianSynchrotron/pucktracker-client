import React from 'react'
import {ButtonInput} from 'react-bootstrap'

export class Holder extends React.Component {

  onSelection (event) {
    this.props.onSelection(this.props.type,
                           this.props.name,
                           event.target.checked)
  }

  isSelected () {
    return this.props.name === this.props.selectedHolder
  }

  render () {
    const checkbox = <input type="checkbox"
                            onChange={this.onSelection.bind(this)}
                            checked={this.isSelected()} />
    return (
      <ButtonInput className="form-control" standalone
                   addonBefore={checkbox}>
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
