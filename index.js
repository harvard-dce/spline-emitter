var curry = require('lodash.curry');
var d3 = require('d3-shape');

function SplineEmitter(createOpts) {
  var updateInterval = 500;
  var doc;
  var root;

  if (createOpts) {
    updateInterval = createOpts.updateInterval;

    if (createOpts.bindToDOM) {
      doc = createOpts.bindToDOM.document;
      root = createOpts.bindToDOM.root;
    }
  }

  var points = [];
  var recording = false;
  var listeners = [];
  var splineCount = 0;

  var line = d3.line();
  line.curve(d3.curveBasis);

  if (doc && root) {
    root.addEventListener('mousedown', onMouseDown);
    root.addEventListener('mousemove', onMouseMove);
    doc.addEventListener('mouseup', onMouseUp);
  }

  function start(coords) {
    recording = true;
    setTimeout(emitCurrentSpline, updateInterval);
    move(coords);
  }

  // coords expected to be [x, y].
  function move(coords) {
    if (recording) {
      points.push(coords);
    }
  }

  function stop(coords) {
    move(coords);
    recording = false;
    cutPath();
  }

  function onMouseDown(e) {
    start(mouseEventToCoords(e));
  }

  function onMouseMove(e) {
    move(mouseEventToCoords(e));
  }

  function onMouseUp(e) {
    stop(mouseEventToCoords(e));
  }

  function cutPath() {
    if (points.length > 0) {
      emitCurrentSpline(true);
      points.length = 0;
      splineCount += 1;
    }
  }

  function emitCurrentSpline(completed) {
    if (!completed) {
      completed = false;
    }
    if (points.length > 0) {
      emitSplineToListeners({
        id: getCurrentSplineId(),
        completed: completed,
        path: line(points)
      });
    }
    if (recording) {
      setTimeout(emitCurrentSpline, updateInterval);
    }
  }

  function getCurrentSplineId() {
    return 'spline-' + splineCount;
  }

  function addEventListener(eventType, listener) {
    if (eventType === 'spline') {
      listeners.push(listener);
    }
  }

  function removeEventListener(eventType, listener) {
    if (eventType === 'spline') {
      listeners.splice(listeners.indexOf(listener), 1);
    }
  }

  function emitSplineToListeners(spline) {
    var emitSpline = curry(emitSplineToListener)(spline);
    listeners.forEach(emitSpline);
  }

  function emitSplineToListener(spline, listener) {
    listener(spline);
  }

  return {
    start: start,
    move: move,
    stop: stop,
    onMouseDown: onMouseDown,
    onMouseMove: onMouseMove,
    onMouseUp: onMouseUp,
    on: addEventListener,
    removeEventListener: removeEventListener
  }
}

function mouseEventToCoords(mouseEvent) {
  return [mouseEvent.offsetX, mouseEvent.offsetY];
}

module.exports = SplineEmitter;
