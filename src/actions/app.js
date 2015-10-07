export function setSelectedHolder (holder) {
  return {
    type: 'SET_SELECTED_HOLDER',
    holder,
  }
}

export function setSelectedPuck (puck) {
  return {
      type: 'SET_SELECTED_PUCK',
      puck,
  }
}
