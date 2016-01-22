export function setConnected (connected) {
  return {
    type: 'SET_CONNECTED',
    connected,
  }
}

export function setDatabaseConnected (connected) {
  return {
    type: 'SET_DATABASE_CONNECTED',
    connected,
  }
}

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
