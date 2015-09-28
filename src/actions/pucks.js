export function setPucks(pucks) {
  return {
    type: 'SET_PUCKS',
    pucks,
  }
}

export function setPuckContainer(puck, containerType, container) {
  return {
    type: 'SET_PUCK_CONTAINER',
    puck,
    containerType,
    container,
    broadcast: true,
  }
}
