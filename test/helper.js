import jsdom from 'jsdom'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'

global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>')
global.window = document.defaultView
global.navigator = window.navigator
window.getSelection = () => {}

chai.use(chaiImmutable)
chai.use(sinonChai)
chai.use(chaiEnzyme())
