import { OrderedMap, Record } from 'immutable'

export const Dewar = Record({
  name: null,
  epn: '',
  owner: '',
  institute: '',
  note: '',
  containerType: '',
  expectedContainers: '',
  onsite: null,
  department: '',
  streetAddress: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  phone: '',
  email: '',
  returnDewar: null,
  courier: '',
  courierAccount: '',
  addedTime: null,
  arrivedTime: null,
  departedTime: null,
  experimentStartTime: null,
  experimentEndTime: null,
  filledTime: null,
  missing: false,
})

const TIME_FIELDS = [
  'addedTime', 'arrivedTime', 'departedTime','experimentStartTime',
  'experimentEndTime', 'filledTime'
]

function parseTimeFields(obj) {
  TIME_FIELDS.forEach(field => parseDateString(obj, field))
}

function parseDateString(obj, field) {
  if (obj[field]) { obj[field] = new Date(obj[field]) }
}

export default function reducer(state=OrderedMap(), action) {
  switch (action.type) {
    case 'SET_DEWARS': {
      return OrderedMap().withMutations(state => {
        action.dewars.forEach(dewar => {
          parseTimeFields(dewar)
          state.set(dewar.name, new Dewar(dewar))
        })
      })
    }
    case 'ADD_DEWAR': {
      if (state.has(action.dewar.name)) { return state }
      if (!action.dewar.addedTime) { action.dewar.addedTime = new Date() }
      parseTimeFields(action.dewar)
      return state.set(action.dewar.name, new Dewar(action.dewar))
    }
    case 'DELETE_DEWAR': {
      return state.delete(action.dewar)
    }
    case 'UPDATE_DEWAR': {
      return state.mergeIn([action.dewar], action.update)
    }
    case 'SET_DEWAR_OFFSITE': {
      return state.setIn([action.dewar, 'onsite'], false)
    }
    case 'DEWAR_FILLED': {
      const filledTime = action.time || new Date()
      return state.setIn([action.dewar, 'filledTime'], filledTime)
    }
  }
  return state
}
