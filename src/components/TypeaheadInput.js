import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Input } from 'react-bootstrap'

export default class TypeaheadInput extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  static propTypes = {
    value: PropTypes.string.isRequired,
    options: ImmutablePropTypes.map,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    buttonAfter: PropTypes.object,
  };
  constructor (props) {
    super(props)
    this.state = {hideSelect: true}
  }
  onInputChange (event) {
    this.setState({hideSelect: false})
    this.props.onChange(event.target.value)
  }
  onSelect (event) {
    this.setState({hideSelect: true})
    this.props.onChange(event.target.value)
  }
  filteredOptions () {
    return this.props.options.filter(
      option => option.indexOf(this.props.value) > -1
    ).slice(0, 4).toList()
  }
  onSubmit (event) {
    event.preventDefault()
    const options = this.filteredOptions()
    if (options.size < 1) return
    this.setState({hideSelect: true})
    this.props.onChange(options.first())
    setTimeout(this.props.onSubmit, 0)
  }
  render () {
    const hide = (this.state.hideSelect || this.props.value.length === 0)
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <Input type="text" value={this.props.value}
               placeholder={this.props.placeholder}
               onChange={this.onInputChange.bind(this)}
               buttonAfter={this.props.buttonAfter} standalone />
        <Input type="select" multiple value={[]} className={{hide}}
               onChange={this.onSelect.bind(this)} standalone>
          {this.filteredOptions().map(option => (
            <option key={option}>{option}</option>
          ))}
        </Input>
      </form>
    )
  }
}
