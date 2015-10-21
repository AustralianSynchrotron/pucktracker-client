import React, { Component, PropTypes } from 'react/addons'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { Port as PortModel } from '../reducers/ports'

export class Port extends Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  handleClick () {
    this.props.onPortClick(this.props.port)
  }
  render () {
    const { slotName, port } = this.props
    var classString = classNames('puck-port', `puck-port-${port.number}`,
                                 `puck-port-${port.state}`)
    return (
      <div className={classString} onClick={this.handleClick.bind(this)}>
        {slotName}{port.number}
      </div>
    )
  }
}

Port.propTypes = {
  port: PropTypes.instanceOf(PortModel),
  slotName: PropTypes.string,
  onPortClick: PropTypes.func,
}
