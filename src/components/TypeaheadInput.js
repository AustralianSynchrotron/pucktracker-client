import React, { Component, PropTypes } from 'react/addons'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Input } from 'react-bootstrap'

export default class TypeaheadInput extends Component {
  constructor (props) {
    super(props)
    this.state = {hideSelect: true}
  }
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
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
      option => option.includes(this.props.value)
    ).slice(0, 4).toList()
  }
  render () {
    const hide = (this.state.hideSelect || this.props.value.length === 0)
    return (
      <form>
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

TypeaheadInput.propTypes = {
  value: PropTypes.string.isRequired,
  options: ImmutablePropTypes.map,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  buttonAfter: PropTypes.object,
}
