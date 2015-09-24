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
