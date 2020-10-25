function getMaxID(array) {
  let maxID = 0
  if (array === undefined) return maxID
  Array.from(array).forEach(item => {
      if (item.id > maxID)
        maxID = item.id
    }
  )
  return maxID
}

function makeID(array) {
  return getMaxID(array) + 1
}

export default makeID