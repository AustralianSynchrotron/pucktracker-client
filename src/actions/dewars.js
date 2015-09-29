export function setDewars (dewars) {
  return {
    type: 'SET_DEWARS',
    dewars,
  }
}

export function addDewar (dewar) {
  return {
    type: 'ADD_DEWAR',
    dewar,
    broadcast: true,
  }
}

export function setDewarEpn (dewar, epn) {
  return {
    type: 'UPDATE_DEWAR',
    dewar,
    update: {epn},
    broadcast: true,
  }
}
