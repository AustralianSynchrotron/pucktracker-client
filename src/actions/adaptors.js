export function setAdaptors (adaptors) {
  return {
    type: 'SET_ADAPTORS',
    adaptors,
  }
}

export function addAdaptor (adaptor) {
  return {
    type: 'ADD_ADAPTOR',
    adaptor,
  }
}

export function setAdaptorPlace (adaptor, location, position) {
  return {
    type: 'SET_ADAPTOR_PLACE',
    adaptor,
    location,
    position,
    broadcast: true,
  }
}
