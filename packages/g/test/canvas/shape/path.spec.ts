/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */


const { resolve } = require('path');

const Canvas = require('../../../src/canvas');
const div = document.createElement('div');
div.id = 'canvas-path';
document.body.appendChild(div);

describe('Path', function() {

  const canvas = new Canvas({
    containerId: 'canvas-path',
    width: 800,
    height: 800,
    pixelRatio: 1
  });

  const img = document.createElement('img');
  img.src = resolve(process.cwd(), './test/fixtures/test1.jpg');
  img.id = 'img';
  document.body.appendChild(img);

  const path = new G.Path();

  it('init attrs', function() {
    expect(path.attr('path')).toBeUndefined();
    expect(path.attr('lineWidth')).toBe(1);
    expect(path.getBBox()).toBeNull();
    canvas.add(path);
    canvas.draw();
  });

  it('path', function() {
    path.attr('path', null);
    expect(path.getBBox()).toBeNull();
    path.attr('path', []);
    expect(path.getBBox()).toBeNull();
    path.attr('path', [
      [ 'a' ]
    ]);
    expect(path.getBBox()).toBeNull();
    path.attr('path', [
      [ 'M', 200, 200 ],
      [ 'L', 300, 300 ]
    ]);

    expect(path.get('segments').length).toBe(2);
    const box = path.getBBox();
    expect(box.minX).toBe(199.5);
    expect(box.maxX).toBe(300.5);
    expect(box.minY).toBe(199.5);
    expect(box.maxY).toBe(300.5);
  });

  it('lineWidth', function() {
    expect(path.attr('lineWidth')).toBe(1);
    path.attr('lineWidth', 2);
    expect(path.attr('lineWidth')).toBe(2);
    const box = path.getBBox();
    expect(box.minX).toBe(199);
    expect(box.maxX).toBe(301);
    expect(box.minY).toBe(199);
    expect(box.maxY).toBe(301);
  });

  it('stroke', function() {
    path.attr('stroke', 'l (0) 0:#fff000 1:#000fff');
    expect(path.attr('stroke')).toBe('l (0) 0:#fff000 1:#000fff');
    canvas.add(path);
    canvas.draw();
  });

  it('arrow', function() {
    path.attr({
      // startArrow: true,
      endArrow: true,
      arrowAngle: 90,
      arrowLength: 30
    });
    expect(path.attr('endArrow')).toBe(true);
    expect(path.attr('arrowAngle')).toBe(90);
    expect(path.attr('arrowLength')).toBe(30);

    canvas.add(path);
    canvas.draw();
  });

  it('fill', function() {
    const path = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 200 ],
          [ 'L', 300, 200 ],
          [ 'L', 300, 300 ],
          [ 'Z' ]
        ],
        fill: 'red'
      }
    });
    expect(path.attr('fill')).toBe('red');
    canvas.add(path);
    canvas.draw();
  });

  it('path string', function() {
    const path = new G.Path({
      attrs: {
        path: 'M100,600' +
              'l 50,-25' +
              'a25,25 -30 0,1 50,-25' +
              'l 50,-25' +
              'a25,50 -30 0,1 50,-25' +
              'l 50,-25' +
              'a25,75 -30 0,1 50,-25' +
              'l 50,-25' +
              'a25,100 -30 0,1 50,-25' +
              'l 50,-25' +
              'l 0, 200',
        lineWidth: 10,
        lineJoin: 'round',
        stroke: 'red',
        endArrow: new G.Marker({
          attrs: {
            symbol: 'diamond'
          }
        })
      }
    });

    canvas.add(path);
    canvas.draw();
  });

  it('l and L', function() {
    const path = new G.Path({
      attrs: {
        path: [
          [ 'M', 400, 400 ],
          [ 'L', 400, 500 ],
          [ 'l', 50, 50 ],
          [ 'Z' ]
        ],
        stroke: 'red',
        fill: 'green',
        startArrow: true
      }
    });
    expect(path.isHit(400, 400)).toBe(true);
    expect(path.isHit(400, 500)).toBe(true);
    expect(path.isHit(450, 550)).toBe(true);
    expect(path.isHit(405, 450)).toBe(false);
    canvas.add(path);
    expect(path.isHit(405, 450)).toBe(true);
    canvas.draw();
  });

  it('h and H', function() {
    const path = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'H', 400 ],
          [ 'h', 100 ]
        ],
        stroke: 'red',
        startArrow: true
      }
    });
    expect(path.isHit(200, 400)).toBe(true);
    expect(path.isHit(300, 400)).toBe(true);
    expect(path.isHit(400, 400)).toBe(true);
    expect(path.isHit(500, 400)).toBe(true);
    canvas.add([ path ]);
    canvas.draw();
  });

  it('v and V', function() {
    const path = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'V', 600 ],
          [ 'v', 100 ]
        ],
        stroke: 'red',
        arrow: true
      }
    });
    expect(path.isHit(200, 400)).toBe(true);
    expect(path.isHit(200, 500)).toBe(true);
    expect(path.isHit(200, 600)).toBe(true);
    expect(path.isHit(200, 700)).toBe(true);
    canvas.add([ path ]);
    canvas.draw();
  });

  it('q and Q', function() {
    const path = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'Q', 300, 300, 400, 400 ]
        ],
        stroke: 'red',
        endArrow: true,
        startArrow: true
      }
    });
    expect(path.isHit(200, 400)).toBe(true);
    expect(path.isHit(300, 350)).toBe(true);
    expect(path.isHit(400, 400)).toBe(true);

    const path1 = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'q', 50, 50, 100, 0 ]
        ],
        stroke: 'red',
        arrow: true
      }
    });

    expect(path1.isHit(200, 400)).toBe(true);
    expect(path1.isHit(250, 425)).toBe(true);
    expect(path1.isHit(300, 400)).toBe(true);
    canvas.add([ path, path1 ]);
    canvas.draw();
  });

  it('t and T', function() {
    const path = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'Q', 300, 300, 400, 400 ],
          [ 'T', 600, 400 ]
        ],
        stroke: 'red',
        endArrow: true,
        startArrow: true
      }
    });
    expect(path.isHit(200, 400)).toBe(true);
    expect(path.isHit(300, 350)).toBe(true);
    expect(path.isHit(400, 400)).toBe(true);
    expect(path.isHit(500, 450)).toBe(true);
    expect(path.isHit(600, 400)).toBe(true);

    const path1 = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'Q', 300, 300, 400, 400 ],
          [ 't', 100, 0 ]
        ],
        stroke: 'red',
        endArrow: true,
        startArrow: true
      }
    });
    expect(path1.isHit(200, 400)).toBe(true);
    expect(path1.isHit(300, 350)).toBe(true);
    expect(path1.isHit(400, 400)).toBe(true);
    expect(path1.isHit(475, 450)).toBe(true);
    expect(path1.isHit(500, 400)).toBe(true);


    const path2 = new G.Path({
      attrs: {
        path: [
          [ 'M', 300, 500 ],
          [ 'L', 500, 500 ],
          [ 't', 200, 0 ]
        ],
        stroke: 'red',
        arrow: true
      }
    });
    expect(path2.isHit(300, 500)).toBe(true);
    expect(path2.isHit(500, 500)).toBe(true);
    expect(path2.isHit(575, 550)).toBe(false);
    expect(path2.isHit(600, 500)).toBe(true);
    canvas.add([ path ]);
    canvas.draw();
  });

  it('c and C', function() {
    const path = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'C', 300, 300, 400, 500, 500, 400 ]
        ],
        stroke: 'red',
        startArrow: true,
        endArrow: true
      }
    });

    expect(path.isHit(200, 400)).toBe(true);
    expect(path.isHit(350, 400)).toBe(true);
    expect(path.isHit(500, 400)).toBe(true);

    const path1 = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'c', 100, -100, 200, 100, 300, 0 ]
        ],
        stroke: 'red',
        startArrow: true
      }
    });

    expect(path1.isHit(200, 400)).toBe(true);
    expect(path1.isHit(350, 400)).toBe(true);
    expect(path1.isHit(500, 400)).toBe(true);
    canvas.add([ path, path1 ]);
    canvas.draw();
  });

  it('s and S', function() {
    const path = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'C', 300, 300, 400, 500, 500, 400 ],
          [ 'S', 700, 500, 800, 400 ]
        ],
        stroke: 'red',
        startArrow: true,
        endArrow: true
      }
    });
    expect(path.isHit(200, 400)).toBe(true);
    expect(path.isHit(350, 400)).toBe(true);
    expect(path.isHit(500, 400)).toBe(true);
    expect(path.isHit(650, 400)).toBe(true);
    expect(path.isHit(800, 400)).toBe(true);

    const path1 = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'C', 300, 300, 400, 500, 500, 400 ],
          [ 's', 200, 100, 300, 0 ]
        ],
        stroke: 'blue'
      }
    });
    expect(path1.isHit(200, 400)).toBe(true);
    expect(path1.isHit(350, 400)).toBe(true);
    expect(path1.isHit(500, 400)).toBe(true);
    expect(path1.isHit(650, 400)).toBe(true);
    expect(path1.isHit(800, 400)).toBe(true);

    const path2 = new G.Path({
      attrs: {
        path: [
          [ 'M', 200, 400 ],
          [ 'L', 500, 400 ],
          [ 's', 200, 100, 300, 0 ]
        ],
        stroke: 'red',
        startArrow: true,
        endArrow: true
      }
    });
    expect(path2.isHit(200, 400)).toBe(true);
    expect(path2.isHit(500, 400)).toBe(true);
    expect(path2.isHit(650, 400)).toBe(false);
    expect(path2.isHit(675, 450)).toBe(true);
    expect(path2.isHit(800, 400)).toBe(true);
    canvas.add([ path, path1, path2 ]);
    canvas.draw();
  });

  it('a And A', function() {
    const path = new G.Path({
      attrs: {
        path: [
          [ 'M', 50, 50 ],
          [ 'A', 50, 100, 0, 1, 1, 50, 150 ]
        ],
        stroke: 'red',
        startArrow: true,
        endArrow: true
      }
    });

    const path1 = new G.Path({
      attrs: {
        path: [
          [ 'M', 50, 50 ],
          [ 'A', 50, 100, 0, 0, 0, 50, 150 ]
        ],
        stroke: 'red',
        startArrow: true,
        endArrow: true
      }
    });
    expect(path.isHit(50, 50)).toBe(true);
    expect(path.isHit(50, 150)).toBe(true);

    const path2 = new G.Path({
      attrs: {
        path: [
          [ 'M', 250, 50 ],
          [ 'A', 50, 100, 0, 1, 0, 250, 150 ]
        ],
        stroke: 'red',
        startArrow: true,
        endArrow: true
      }
    });
    const path3 = new G.Path({
      attrs: {
        path: [
          [ 'M', 250, 50 ],
          [ 'A', 50, 100, 0, 0, 1, 250, 150 ]
        ],
        stroke: 'red',
        startArrow: true,
        endArrow: true
      }
    });
    expect(path.isHit(50, 50)).toBe(true);
    expect(path.isHit(50, 150)).toBe(true);

    canvas.add([ path, path1, path2, path3 ]);
    canvas.draw();
  });

  it('getPoint', function() {
    const path = [
      [ 'M', 300, 300 ],
      [ 'L', 300, 50 ],
      [ 'L', 50, 50 ],
      [ 'L', 50, 300 ]
    ];
    const path7 = new G.Path({
      attrs: {
        path,
        stroke: 'red'
      }
    });
    const point0 = path7.getPoint(0);
    const point1 = path7.getPoint(0.5);
    const point2 = path7.getPoint(1);
    const point3 = path7.getPoint(0.225);
    canvas.add(path7);
    canvas.draw();
    expect(point0).toEqual({ x: 300, y: 300 });
    expect(point1).toEqual({ x: 174.99999999999997, y: 50 });
    expect(point2).toEqual({ x: 50, y: 300 });
    expect(point3).toEqual({ x: 300, y: 112.0546875 });
  });

  it('appendWidth', function() {
    const path = [
      [ 'M', 200, 200 ],
      [ 'L', 200, 50 ],
      [ 'L', 50, 50 ],
      [ 'L', 50, 300 ]
    ];

    const path8 = new G.Path({
      attrs: {
        path,
        lineAppendWidth: 10,
        stroke: 'blue'
      }
    });

    expect(path8.isHit(196, 200)).toBe(true);
    expect(path8.isHit(52, 250)).toBe(true);

    canvas.add(path8);
    canvas.draw();
  });

});
