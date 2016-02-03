var SplineEmitter = require('../index');
// var d3 = require('d3-selection');


var rootEl = document.body;

var board = document.createElement('div');
board.style.width = '100%';
board.style.height = '500px';
board.style.backgroundColor = 'green';
rootEl.appendChild(board);

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

function logSpline(pathCommands) {
  console.log(pathCommands);
}
