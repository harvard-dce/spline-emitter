spline-emitter
==============

Generate splines from mouse movements.

Given start, move, and stop commands (as in 'mousedown', 'mousemove', and 'mouseup'), emits splines that result from interpolating that movement.

Installation
------------

    npm install spline-emitter

For development:

- Clone this repo.
- `npm install`
- `npm install -g wzrd`.

Usage
-----

    var SplineEmitter = require('spline-emitter');
    var emitter = SplineEmitter({
      cutInterval: 500
    });

    emitter.on('spline', logSpline);

    emitter.start(200, 300);
    emitter.move(400, 400);
    emitter.stop(1000, 300);

    function logSpline(pathCommands) {
      console.log(pathCommands);
    }

Output:

    M200,300 L400,50 L600,300 L800,550 L1000,300

API
---

**Constructor opts**: 
  - cutInterval: In milliseconds, how often should a spline be cut?

TODO

**start**

Note event listeners should be named functions in order to be removable.

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2016 President and Fellows of Harvard College

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
