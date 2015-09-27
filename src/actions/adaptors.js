export function setAdaptors (adaptors) {
  return {
    type: 'SET_ADAPTORS',
    adaptors,
  }
}

export function addAdaptor (adaptor={}) {
  return {
    type: 'ADD_ADAPTOR',
    adaptor,
  }
}

export function setAdaptorPlace (adaptor, place) {
  return {
    type: 'SET_ADAPTOR_PLACE',
    adaptor,
    place,
    broadcast: true,
  }
}
