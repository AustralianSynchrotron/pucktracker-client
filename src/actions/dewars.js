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
  }
}
