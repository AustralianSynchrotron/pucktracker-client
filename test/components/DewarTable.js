import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Map } from 'immutable'
import { Glyphicon } from 'react-bootstrap'
import { DewarTableRow } from '../../src/components/DewarTable'
import { Dewar } from '../../src/reducers/dewars'

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

    it('shows the filled time', () => {
      const filledTime = new Date(2016, 0, 11, 8, 23)
      const wrapper = render(<DewarTableRow dewar={Dewar({filledTime})}/>)
      const cell = wrapper.find('tr').children().eq(FILLED_CELL)
      expect(cell.text()).to.equal('2016-01-11 08:23')
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

})
