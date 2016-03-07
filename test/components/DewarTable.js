import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Map } from 'immutable'
import { Glyphicon } from 'react-bootstrap'
import { DewarTable, DewarTableRow } from '../../src/components/DewarTable'
import { Dewar } from '../../src/reducers/dewars'


describe('DewarTable', () => {

  let clock
  const TIME = new Date('2016-01-03T00:00:00')
  before(() => { clock = sinon.useFakeTimers(TIME.getTime()) })
  after(() => { clock.restore() })

  it('only renders dewars added within "displayDays"', () => {
    const dewars = Map({
      'd-old': Dewar({name: 'd-old', addedTime: new Date(2016, 0, 2)}),
      'd-new': Dewar({name: 'd-new', addedTime: new Date(2016, 0, 3)}),
      'd-oldest': Dewar({name: 'd-oldest', addedTime: new Date(2016, 0, 1)}),
    })
    const wrapper = render(<DewarTable dewars={dewars} displayDays={2}/>)
    expect(wrapper.text()).to.contain('d-old')
    expect(wrapper.text()).to.contain('d-new')
    expect(wrapper.text()).not.to.contain('d-oldest')
  })

  it('always displays staff dewars', () => {
    const dewars = Map({
      's-staff': Dewar({name: 's-staff', addedTime: new Date(2016, 0, 1)}),
      'd-pqrs-1': Dewar({name: 'd-pqrs-1', addedTime: new Date(2016, 0, 1)}),
    })
    const wrapper = render(<DewarTable dewars={dewars} displayDays={2}/>)
    expect(wrapper.text()).to.contain('s-staff')
    expect(wrapper.text()).not.to.contain('d-pqrs-1')
  })

})


describe('DewarTableRow', () => {

  const NAME_CELL = 0
  const EPN_CELL = 1
  const OWNER_CELL = 2
  const INSTITUTE_CELL = 3
  const CONTAINER_TYPE_CELL = 4
  const EXPECTED_CONTAINERS_CELL = 5
  const NOTES_CELL = 6
  const FILLED_CELL = 7
  const SHIP_CELL = 8

  let clock
  const TIME = new Date('2016-01-20T00:00:00')
  before(() => { clock = sinon.useFakeTimers(TIME.getTime()) })
  after(() => { clock.restore() })

  it('shows the dewar name', () => {
    const wrapper = render(<DewarTableRow dewar={Dewar({name: 'd-123a-1'})}/>)
    const cell = wrapper.find('tr').children().eq(NAME_CELL)
    expect(cell.text()).to.equal('d-123a-1')
  })

  it('shows the owner name', () => {
    const wrapper = render(<DewarTableRow dewar={Dewar({owner: 'Jane'})}/>)
    const cell = wrapper.find('tr').children().eq(OWNER_CELL)
    expect(cell.text()).to.equal('Jane')
  })

  describe('filled time cell', () => {

    it('is empty when filledTime is null', () => {
      const wrapper = render(<DewarTableRow dewar={Dewar()}/>)
      const cell = wrapper.find('tr').children().eq(FILLED_CELL)
      expect(cell.text()).to.equal('')
    })

    it('shows time since last fill', () => {
      const filledTime = new Date('2016-01-19T21:00:00')
      const wrapper = render(<DewarTableRow dewar={Dewar({filledTime})}/>)
      const cell = wrapper.find('tr').children().eq(FILLED_CELL)
      expect(cell.text()).to.equal('3 hours ago')
    })

  })

  it('clicking dewar filled button should call dewarFilled', () => {
    const setDewarFilled = sinon.spy()
    const wrapper = mount(
      <table>
        <tbody>
          <DewarTableRow dewar={Dewar({name: 'd-123a-1'})}
                         setDewarFilled={setDewarFilled} />
        </tbody>
      </table>
    )
    wrapper.find('.dewar-filled').simulate('click')
    expect(setDewarFilled).to.have.been.calledWith('d-123a-1')
  })

  describe('missing button', () => {

    it('has a "set missing" icon when dewar is not missing', () => {
      const wrapper = shallow(<DewarTableRow dewar={Dewar({missing: false})}/>)
      expect(wrapper.contains(<Glyphicon glyph="question-sign"/>)).to.equal(true)
    })

    it('has a "set icon" icon when dewar is missing', () => {
        const wrapper = shallow(<DewarTableRow dewar={Dewar({missing: true})}/>)
        expect(wrapper.contains(<Glyphicon glyph="ok-sign"/>)).to.equal(true)
    })

    it('sets dewars missing if they are presently labeled not missing', () => {
      const setDewarMissing = sinon.spy()
      const wrapper = mount(
        <table>
          <tbody>
            <DewarTableRow dewar={Dewar({name: 'd-123a-1', missing: false})}
                           setDewarMissing={setDewarMissing} />
          </tbody>
        </table>
      )
      wrapper.find('.dewar-missing').simulate('click')
      expect(setDewarMissing).to.have.been.calledWith('d-123a-1', true)
    })

    it('sets dewars not missing if they are presently labeled missing', () => {
      const setDewarMissing = sinon.spy()
      const wrapper = mount(
        <table>
          <tbody>
            <DewarTableRow dewar={Dewar({name: 'd-123a-1', missing: true})}
                           setDewarMissing={setDewarMissing} />
          </tbody>
        </table>
      )
      wrapper.find('.dewar-missing').simulate('click')
      expect(setDewarMissing).to.have.been.calledWith('d-123a-1', false)
    })

  })

  describe('fill warning', () => {

    it('is present if dewars have not been filled in 5 days', () => {
      const filledTime = new Date('2016-01-15T00:00:00')
      const dewar = Dewar({name: 'd-123a-1', filledTime})
      const wrapper = render(<DewarTableRow dewar={dewar} onsite={true}/>)
      expect(wrapper.find('tr').hasClass('warning')).to.equal(true)
      expect(wrapper.find('.filledTime').hasClass('danger')).to.equal(true)
    })

    it('is present if dewars have not been filled at all', () => {
      const dewar = Dewar({name: 'd-123a-1'})
      const wrapper = render(<DewarTableRow dewar={dewar} onsite={true}/>)
      expect(wrapper.find('tr').hasClass('warning')).to.equal(true)
    })

    it('is present if dewars have not been filled at all', () => {
      const dewar = Dewar({name: 'd-123a-1'})
      const wrapper = render(<DewarTableRow dewar={dewar} onsite={false}/>)
      expect(wrapper.find('tr').hasClass('warning')).to.equal(false)
    })

    it('is not present if dewars have not been filled in 5 days', () => {
      const filledTime = new Date('2016-01-15T00:00:01')
      const dewar = Dewar({name: 'd-123a-1', filledTime})
      const wrapper = render(<DewarTableRow dewar={dewar} onsite={true}/>)
      expect(wrapper.find('tr').hasClass('warning')).to.equal(false)
    })

  })

  describe('overdue warning', () => {
    it('is present if dewars are onsite past their experimentEndTime', () => {
      const filledTime = TIME
      const experimentEndTime = new Date('2016-01-17T00:00:00')
      const dewar = Dewar({name: 'd-123a-1', filledTime, experimentEndTime})
      const wrapper = render(<DewarTableRow dewar={dewar} onsite={true}/>)
      expect(wrapper.find('tr').hasClass('warning')).to.equal(true)
      expect(wrapper.find('.experimentEndTime').hasClass('danger')).to.equal(true)
    })
  })

})
