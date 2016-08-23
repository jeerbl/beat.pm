var SPACE_KEY_CODE = 32
var MINUTE = 60 * 1000

var previousDate
var bpms = []

function newEntry (e) {
  if (e.keyCode === SPACE_KEY_CODE || e.type === 'click') {
    calculateBPM(new Date())
  }
}

function calculateBPM (date) {
  if (previousDate == null) {
    previousDate = date
    return
  }

  var bpm = Math.round(MINUTE / (date - previousDate) * 10) / 10

  document.getElementById('bpm').innerHTML = bpm

  bpms.push(bpm)

  previousDate = date
}

document.onkeydown = newEntry
document.onclick = newEntry
