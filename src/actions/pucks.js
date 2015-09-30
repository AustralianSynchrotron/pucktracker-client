export function setPucks (pucks) {
  return {
    type: 'SET_PUCKS',
    pucks,
  }
}

export function addPuck (puck) {
  return {
    type: 'ADD_PUCK',
    puck,
    broadcast: true,
  }
}

export function setPuckReceptacle(puck, receptacleType, receptacle, slot=null) {
  return {
    type: 'SET_PUCK_RECEPTACLE',
    puck,
    receptacleType,
    receptacle,
    slot,
    broadcast: true,
  }
}

export function updatePuck (puck, update) {
  return {
    type: 'UPDATE_PUCK',
    puck,
    update,
    broadcast: true,
  }
}
