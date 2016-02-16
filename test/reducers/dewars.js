import { Map } from 'immutable'
import { expect } from 'chai'
import sinon from 'sinon'
import reducer, { Dewar } from '../../src/reducers/dewars'

describe('dewars reducer', () => {

  let clock
  const TIME = new Date(2016, 0, 2, 3, 4, 5)

  before(() => {
    clock = sinon.useFakeTimers(TIME.getTime())
  })

  after(() => {
    clock.restore()
  })

  it('sets dewars', () => {
    const initialState = Map()
    const action = {
      type: 'SET_DEWARS',
      dewars: [{name: '1001'}]
    }
    const state = reducer(initialState, action)
    expect(state.getIn(['1001', 'name'])).to.equal('1001')
  })

  describe('ADD_DEWAR', () => {

    it('adds dewars', () => {
      const now = new Date()
      const initialState = Map()
      const action = {
        type: 'ADD_DEWAR',
        dewar: {
          name: '1001',
          epn: '123a',
          owner: 'Jane',
          institute: 'Some University',
          note: 'Keep onsite',
          containerType: 'pucks',
          expectedContainers: 'ASP001,ASP002',
          onsite: true,
          department: 'Chemistry',
          streetAddress: '1 Main Rd',
          city: 'Melbourne',
          state: 'VIC',
          postcode: '3000',
          country: 'Australia',
          phone: '123-456-789',
          email: 'jane@example.com',
          returnDewar: true,
          courier: 'Fast Deliveries',
          courierAccount: '122333',
          addedTime: now,
          arrivedTime: now,
          departedTime: now,
          experimentStartTime: now,
          experimentEndTime: now,
          filledTime: now,
          missing: false,
        },
      }
      const state = reducer(initialState, action)
      const dewar = state.get('1001')
      expect(dewar.name).to.equal('1001')
      expect(dewar.epn).to.equal('123a')
      expect(dewar.owner).to.equal('Jane')
      expect(dewar.institute).to.equal('Some University')
      expect(dewar.note).to.equal('Keep onsite')
      expect(dewar.containerType).to.equal('pucks')
      expect(dewar.expectedContainers).to.equal('ASP001,ASP002')
      expect(dewar.onsite).to.equal(true)
      expect(dewar.department).to.equal('Chemistry')
      expect(dewar.streetAddress).to.equal('1 Main Rd')
      expect(dewar.city).to.equal('Melbourne')
      expect(dewar.state).to.equal('VIC')
      expect(dewar.postcode).to.equal('3000')
      expect(dewar.country).to.equal('Australia')
      expect(dewar.phone).to.equal('123-456-789')
      expect(dewar.email).to.equal('jane@example.com')
      expect(dewar.returnDewar).to.equal(true)
      expect(dewar.courier).to.equal('Fast Deliveries')
      expect(dewar.courierAccount).to.equal('122333')
      expect(dewar.addedTime).to.eql(now)
      expect(dewar.arrivedTime).to.eql(now)
      expect(dewar.departedTime).to.eql(now)
      expect(dewar.experimentStartTime).to.eql(now)
      expect(dewar.experimentEndTime).to.eql(now)
      expect(dewar.filledTime).to.eql(now)
      expect(dewar.missing).to.equal(false)
    })

    it('sets the addedTime if not given', () => {
      const initialState = Map()
      const action = {type: 'ADD_DEWAR', dewar: {name: '1001'}}
      const state = reducer(initialState, action)
      expect(state.get('1001').addedTime).to.eql(TIME)
    })

  })

  it('deletes dewars', () => {
    const initialState = Map({
      '1001': Dewar(),
    })
    const action = {
      type: 'DELETE_DEWAR',
      dewar: '1001',
    }
    const state = reducer(initialState, action)
    expect(state.size).to.equal(0)
  })

  it('updates dewars', () => {
    const initialState = Map({
      '1001': Dewar({name: '1001', epn: '123a'})
    })
    const action = {
      type: 'UPDATE_DEWAR',
      dewar: '1001',
      update: {epn: '456b'},
    }
    const state = reducer(initialState, action)
    expect(state.getIn(['1001', 'name'])).to.equal('1001')
    expect(state.getIn(['1001', 'epn'])).to.equal('456b')
  })

  it('sets dewars as offsite', () => {
    const initialState = Map({
      '1001': Dewar({onsite: true})
    })
    const action = {
      type: 'SET_DEWAR_OFFSITE',
      dewar: '1001',
    }
    const state = reducer(initialState, action)
    expect(state.getIn(['1001', 'onsite'])).to.equal(false)
  })

  it('sets dewar filled time when time is given', () => {
    const time = new Date(2016, 0, 10, 11, 12, 13)
    const action = {
      type: 'DEWAR_FILLED',
      dewar: '1001',
      time,
    }
    const initialState = Map({'1001': Dewar()})
    const state = reducer(initialState, action)
    expect(state.getIn(['1001', 'filledTime'])).to.eql(time)
  })

  it('sets dewar filled time when time is not given', () => {
    const action = {
      type: 'DEWAR_FILLED',
      dewar: '1001',
    }
    const initialState = Map({'1001': Dewar()})
    const state = reducer(initialState, action)
    expect(state.getIn(['1001', 'filledTime'])).to.eql(TIME)
  })

})
