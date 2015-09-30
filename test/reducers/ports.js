import {Map, List} from 'immutable'
import {expect} from 'chai'
import reducer, {Port} from '../../src/reducers/ports'

describe('ports reducer', () => {

  it('sets ports', () => {
    const initialState = Map()
    const action = {
      type: 'SET_PORTS',
      ports: [
        {containerType: 'puck', container: 'ASP001', number: 1, state: 'unknown'}
      ]
    }
    const state = reducer(initialState, action)
    expect(state.size).to.equal(1)
    const port = state.get(List.of('ASP001', 1))
    expect(port.containerType).to.equal('puck')
    expect(port.container).to.equal('ASP001')
    expect(port.number).to.equal(1)
    expect(port.state).to.equal('unknown')
  })

  it('set port states', () => {
    const initialState = Map([
      [ List.of('ASP001', 1), new Port({state: 'unknown'}) ],
      [ List.of('ASP001', 2), new Port({state: 'unknown'}) ],
    ])
    const action = {
      type: 'SET_PORT_STATE',
      container: 'ASP001',
      number: 1,
      state: 'full',
    }
    const state = reducer(initialState, action)
    expect(state.getIn([List.of('ASP001', 1), 'state'])).to.equal('full')
    expect(state.getIn([List.of('ASP001', 2), 'state'])).to.equal('unknown')
  })

  it('sets multiple port states', () => {
    const initialState = Map([
      [ List.of('ASP001', 1), new Port({state: 'unknown'}) ],
      [ List.of('ASP001', 2), new Port({state: 'unknown'}) ],
      [ List.of('ASP001', 3), new Port({state: 'unknown'}) ],
    ])
    const action = {
      type: 'SET_MULTIPLE_PORT_STATES',
      container: 'ASP001',
      numbers: [1, 2],
      state: 'full',
    }
    const state = reducer(initialState, action)
    expect(state.getIn([List.of('ASP001', 1), 'state'])).to.equal('full')
    expect(state.getIn([List.of('ASP001', 2), 'state'])).to.equal('full')
    expect(state.getIn([List.of('ASP001', 3), 'state'])).to.equal('unknown')
  })

  it('adds ports when a puck is added', () => {
    const initialState = Map()
    const action = {
      type: 'ADD_PUCK',
      puck: {name: 'ASP001'},
    }
    const state = reducer(initialState, action)
    expect(state.size).to.equal(16)
    const firstPort = state.get(List.of('ASP001', 1))
    expect(firstPort.containerType).to.equal('puck')
    expect(firstPort.container).to.equal('ASP001')
    expect(firstPort.number).to.equal(1)
    const lastPort = state.get(List.of('ASP001', 16))
    expect(lastPort.number).to.equal(16)
  })

})
