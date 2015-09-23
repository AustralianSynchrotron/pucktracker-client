export function setAdaptors (adaptors) {
  return {
    type: 'SET_ADAPTORS',
    adaptors,
  }
}

export function addAdaptor (name, data={}) {
  return {
    type: 'ADD_ADAPTOR',
    name,
    data,
  }
}

export function setAdaptorPlace (adaptor, place) {
  return {
    type: 'SET_ADAPTOR_PLACE',
    adaptor,
    place,
  }
}
