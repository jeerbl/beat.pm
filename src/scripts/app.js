window.onload = function () {
  var SPACE_KEY_CODE = 32;
  var ENTER_KEY_CODE = 13;
  var MINUTE = 60 * 1000;

  var GRAPH_HEIGHT = 300;
  var GRAPH_WIDTH = 500;

  /**
   * Elements
   */
  var bpmDisplay = document.getElementById('bpm');
  var moreButton = document.getElementById('more');
  var dropdown = document.getElementById('dropdown');
  var adjustCheckbox = document.getElementById('adjust');
  var graphElement = document.getElementById('graph');

  /**
   * Options
   */
  var options = {
    adjust: !!adjustCheckbox.checked,
    previousBpmsToTake: 3
  };

  var previousDate;
  var bpms = [];
  var dropdownOpened = false;
  var started = false;

  function init () {
    graphElement.style.display = 'none';
    bpms = [];
    previousDate = null;
    bpmDisplay.innerHTML = 0;
    started = true;
  }

  function updateOptions () {
    options.adjust = !!adjustCheckbox.checked;
  }

  function toggleDropdown (e) {
    e.stopPropagation();
    if (dropdownOpened) dropdown.style.maxHeight = '0';
    else dropdown.style.maxHeight = '3rem';
    dropdownOpened = !dropdownOpened;
  }

  function stopPropagation (e) {
    e.stopPropagation();
  }

  function newEntry (e) {
    if (dropdownOpened) {
      toggleDropdown(e);
      return;
    }
    if (e.keyCode === SPACE_KEY_CODE || e.type === 'click') {
      if (!started) init();
      calculateBPM(new Date());
    }
    if (e.keyCode === ENTER_KEY_CODE) {
      endSession();
    }
  }

  function endSession () {
    if (!started) return;

    started = false;

    var graph = '' +
      '<svg viewBox="0 0 500 300">' +
        '<path fill="none" stroke="#000" stroke-width="1" stroke-dasharray="5" d="M0 0 L0 ' + GRAPH_HEIGHT + '"></path>' +
        '<path fill="none" stroke="#000" stroke-width="1" stroke-dasharray="5" d="M0 ' + GRAPH_HEIGHT + ' L' + GRAPH_WIDTH + ' ' + GRAPH_HEIGHT + '"></path>' +
        '<path fill="none" stroke="#000" stroke-width="2" d="' + generatePath() + '"></path>' +
      '</svg>';

    graphElement.innerHTML = graph;
    graphElement.style.display = 'block';
  }

  function generatePath () {
    var path = '';

    var x, y;
    var minBpm = Math.min.apply(null, bpms);
    var maxBpm = Math.max.apply(null, bpms);

    for (var i = 0; i < bpms.length; i++) {
      x = i * GRAPH_WIDTH / (bpms.length - 1);
      y = GRAPH_HEIGHT - (bpms[i] - minBpm) * GRAPH_HEIGHT / (maxBpm - minBpm);

      if (i === 0) path += 'M' + x + ' ' + y;
      else path += ' L' + x + ' ' + y;
    }

    return path;
  }

  function calculateBPM (date) {
    if (previousDate == null) {
      previousDate = date;
      return;
    }

    var bpm = Math.round((MINUTE / (date - previousDate)) * 10) / 10;
    if (options.adjust) {
      var numberOfBpms = 1;
      while (numberOfBpms < 3) {
        if (bpms[bpms.length - numberOfBpms] != null) bpm += bpms[bpms.length - numberOfBpms];
        else break;
        numberOfBpms++;
      }
      bpm = Math.round((bpm / numberOfBpms) * 10) / 10;
    }

    bpmDisplay.innerHTML = bpm.toFixed(1);

    bpms.push(bpm);

    previousDate = date;
  }

  moreButton.onclick = toggleDropdown;
  dropdown.onclick = stopPropagation;
  adjust.onchange = updateOptions;

  document.onkeydown = newEntry;
  document.onclick = newEntry;
}
