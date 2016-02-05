var SplineEmitter = require('../index');

var svgNS = 'http://www.w3.org/2000/svg';

var rootEl = document.body;

var board = document.createElementNS(svgNS, 'svg');
board.style.width = '100%';
board.style.height = '500px';
board.style.border = '1px darkblue solid';
rootEl.appendChild(board);

var emitter = SplineEmitter({
  updateInterval: 100,
  bindToDOM: {
    document: document,
    root: rootEl
  }
});

emitter.on('spline', logSpline);
emitter.on('spline', renderSpline);

function logSpline(spline) {
  if (spline.completed) {
    console.log('Spline completed:', spline.path);
  }
}

function renderSpline(spline) {
  var path = document.querySelector('#' + spline.id);
  if (!path) {
    path = document.createElementNS(svgNS, 'path');
    path.id = spline.id;
    path.style.fill = 'none';
    path.style.strokeWidth = '1';
    path.style.stroke = 'black';
    board.appendChild(path);
  }
  path.setAttribute('d', spline.path);
}
