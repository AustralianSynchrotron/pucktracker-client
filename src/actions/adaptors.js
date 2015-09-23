export function add(name, data={}) {
  return {
    type: 'ADD_ADAPTOR',
    name,
    data,
  }
}

export function setPlace(adaptor, place) {
  return {
    type: 'SET_ADAPTOR_PLACE',
    adaptor,
    place,
  }
}
