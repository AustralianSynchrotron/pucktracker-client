export function setPorts(ports) {
  return {
    type: 'SET_PORTS',
    ports,
  }
}

export function setPortState(container, number, state) {
  return {
    type: 'SET_PORT_STATE',
    container,
    number,
    state,
    broadcast: true,
  }
}

export function setMultiplePortStates(container, numbers, state) {
  return {
    type: 'SET_MULTIPLE_PORT_STATES',
    container,
    numbers,
    state,
    broadcast: true,
  }
}
