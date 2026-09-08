export function getNextQuarterLabel(date = new Date()) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const currentQuarterStartMonth = Math.floor(date.getMonth() / 3) * 3 // 0, 3, 6, or 9
  const nextQuarterStartMonth = currentQuarterStartMonth + 3
  const year = date.getFullYear() + (nextQuarterStartMonth > 11 ? 1 : 0)
  return `${monthNames[nextQuarterStartMonth % 12]} ${year}`
}

export function getUrgencyText(date = new Date()) {
  return `Next quarter's client slots open ${getNextQuarterLabel(date)}. Booking now secures this quarter's remaining spot.`
}
