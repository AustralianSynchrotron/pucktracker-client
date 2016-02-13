export function setDewars (dewars) {
  return {
    type: 'SET_DEWARS',
    dewars,
  }
}

export function addDewar (dewar) {
  if (!dewar.addedTime) {
    dewar.addedTime = new Date()
  }
  return {
    type: 'ADD_DEWAR',
    dewar,
    broadcast: true,
  }
}

export function deleteDewar (dewar) {
  return {
    type: 'DELETE_DEWAR',
    dewar,
    broadcast: true,
  }
}

export function updateDewar (dewar, update) {
  return {
    type: 'UPDATE_DEWAR',
    dewar,
    update,
    broadcast: true,
  }
}

export function setDewarOffsite (dewar) {
  return {
    type: 'SET_DEWAR_OFFSITE',
    dewar,
    broadcast: true,
  }
}

export function setDewarFilled (dewar) {
  return {
    type: 'DEWAR_FILLED',
    dewar,
    time: new Date(),
    broadcast: true,
  }
}
