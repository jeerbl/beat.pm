window.onload = function () {
  var SPACE_KEY_CODE = 32
  var ENTER_KEY_CODE = 13
  var MINUTE = 60 * 1000

  /**
   * Elements
   */
  var bpmDisplay = document.getElementById('bpm')
  var moreButton = document.getElementById('more')
  var dropdown = document.getElementById('dropdown')
  var adjustCheckbox = document.getElementById('adjust')

  /**
   * Options
   */
  var options = {
    adjust: !!adjustCheckbox.checked,
    previousBpmsToTake: 3
  }

  var previousDate
  var bpms = []
  var dropdownOpened = false
  var started = false

  function updateOptions () {
    options.adjust = !!adjustCheckbox.checked
  }

  function toggleDropdown (e) {
    e.stopPropagation();
    if (dropdownOpened) dropdown.style.maxHeight = '0'
    else dropdown.style.maxHeight = '3rem'
    dropdownOpened = !dropdownOpened
  }

  function stopPropagation (e) {
    e.stopPropagation();
  }

  function newEntry (e) {
    if (dropdownOpened) {
      toggleDropdown(e)
      return
    }
    if (e.keyCode === SPACE_KEY_CODE || e.type === 'click') {
      started = true
      calculateBPM(new Date())
    }
    if (e.keyCode === ENTER_KEY_CODE) {
      endSession()
    }
  }

  function endSession () {
    if (!started) return

    started = false
    alert('oihioioh')
  }

  function calculateBPM (date) {
    if (previousDate == null) {
      previousDate = date
      return
    }

    var bpm = Math.round((MINUTE / (date - previousDate)) * 10) / 10
    if (options.adjust) {
      var numberOfBpms = 1
      while (numberOfBpms < 3) {
        if (bpms[bpms.length - numberOfBpms] != null) bpm += bpms[bpms.length - numberOfBpms]
        else break
        numberOfBpms++
      }
      bpm = Math.round((bpm / numberOfBpms) * 10) / 10
    }

    bpmDisplay.innerHTML = bpm.toFixed(1)

    bpms.push(bpm)

    previousDate = date
  }

  moreButton.onclick = toggleDropdown
  dropdown.onclick = stopPropagation
  adjust.onchange = updateOptions

  document.onkeydown = newEntry
  document.onclick = newEntry
}
