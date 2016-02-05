var SplineEmitter = require('../index');
// var d3 = require('d3-selection');


var rootEl = document.body;

var board = document.createElement('div');
board.style.width = '100%';
board.style.height = '500px';
board.style.backgroundColor = 'green';
rootEl.appendChild(board);

var svgNS = 'http://www.w3.org/2000/svg';

var feedbackBoard = document.createElementNS(svgNS, 'svg');
feedbackBoard.style.width = '100%';
feedbackBoard.style.height = '500px';
rootEl.appendChild(feedbackBoard);

var emitter = SplineEmitter({
  cutInterval: 10000,
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
  feedbackBoard.appendChild(path);
}
