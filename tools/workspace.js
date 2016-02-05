var SplineEmitter = require('../index');
// var d3 = require('d3-selection');

var svgNS = 'http://www.w3.org/2000/svg';

var rootEl = document.body;

var board = document.createElementNS(svgNS, 'svg');
board.style.width = '100%';
board.style.height = '500px';
board.style.border = '1px darkblue solid';
rootEl.appendChild(board);

var emitter = SplineEmitter({
  cutInterval: 400,
  bindToDOM: {
    document: document,
    root: rootEl
  }
});

// rootEl.addEventListener('mousedown', emitter.onMouseDown);
// rootEl.addEventListener('mousemove', emitter.onMouseMove);
// rootEl.addEventListener('mouseup', emitter.onMouseUp);

// function logEvent(e) {
//   console.log(e.type, ':', e.offsetX, e.offsetY);
// }

emitter.on('spline', logSpline);
emitter.on('spline', renderSpline);

function logSpline(pathCommands) {
  console.log(pathCommands);
}

function renderSpline(spline) {
  var path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', spline);
  path.style.fill = 'none';
  path.style.strokeWidth = '1';
  path.style.stroke = 'black';
  board.appendChild(path);
}
