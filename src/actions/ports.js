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
