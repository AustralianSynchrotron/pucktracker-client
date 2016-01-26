import jsdom from 'jsdom'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import sinonChai from 'sinon-chai'

global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>')
global.window = document.defaultView
global.navigator = window.navigator

chai.use(chaiImmutable)
chai.use(sinonChai)
