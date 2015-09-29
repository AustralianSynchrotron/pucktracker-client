export function setSelectedHolder (holder) {
  return {
    type: 'SET_SELECTED_HOLDER',
    holder,
  }
}

export function setSelectedReceptacle (side, receptacleType, receptacleName) {
  return {
      type: 'SET_SELECTED_RECEPTACLE',
      side,
      receptacleType,
      receptacleName,
    }
}

export function setSelectedPuck (puck) {
  return {
      type: 'SET_SELECTED_PUCK',
      puck,
    }
}

export function setNewDewarText (text) {
  return {
    type: 'SET_NEW_DEWAR_TEXT',
    text,
  }
}
