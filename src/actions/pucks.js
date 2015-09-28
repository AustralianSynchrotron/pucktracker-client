export function setPucks(pucks) {
  return {
    type: 'SET_PUCKS',
    pucks,
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
