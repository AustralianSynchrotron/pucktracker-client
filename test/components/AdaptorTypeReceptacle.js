import React, {findDOMNode} from 'react/addons'
import { fromJS } from 'immutable'
import { expect } from 'chai'
import { AdaptorTypeReceptacle } from '../../src/components/AdaptorTypeReceptacle'

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = React.addons.TestUtils

describe('AdaptorTypeReceptacle', () => {

  it('should render the adaptor names in a select box', () => {
    const adaptors = fromJS([{name: 'AS-01'}, {name: 'AS-02'}])
    const component = renderIntoDocument(
      <AdaptorTypeReceptacle adaptors={adaptors}/>
    )
    const options = scryRenderedDOMComponentsWithTag(component, 'option')
    expect(options).to.have.length(3)
    expect(findDOMNode(options[0]).textContent).to.equal('')
    expect(findDOMNode(options[1]).textContent).to.equal('AS-01')
  })

})
