/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */



const Canvas = require('../../../src/canvas');
const div = document.createElement('div');
div.id = 'canvas-polygon';
document.body.appendChild(div);


describe('Polygon', function() {

  const canvas = new Canvas({
    containerId: 'canvas-polygon',
    width: 200,
    height: 200,
    pixelRatio: 1
  });

  const polygon = new G.Polygon();
  it('init attr', function() {
    expect(polygon.attr('points')).toBeUndefined();
    expect(polygon.attr('lineWidth')).toBe(1);
    expect(polygon.attr('stroke')).toBeUndefined();
    expect(polygon.attr('fill')).toBeUndefined();
    expect(polygon.getBBox()).toBeNull();
  });

  it('points', function() {
    polygon.attr('points', []);
    expect(polygon.attr('points').length).toBe(0);
    expect(polygon.getBBox()).toBeNull();
    polygon.attr('points', [[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]]);
    expect(polygon.attr('points').length).toBe(4);
    let box = polygon.getBBox();
    expect(box.minX).toBe(29.5);
    expect(box.maxX).toBe(60.5);
    expect(box.minY).toBe(19.5);
    expect(box.maxY).toBe(100.5);

    const polygon1 = new G.Polygon({
      attrs: {
        points: [[ 58, 60 ], [ 80, 190 ], [ 32, 53 ], [ 45, 32 ]]
      }
    });
    box = polygon1.getBBox();
    expect(box.minX).toBe(31.5);
    expect(box.minY).toBe(31.5);
    expect(box.maxX).toBe(80.5);
    expect(box.maxY).toBe(190.5);
  });

  it('lineWidth', function() {
    expect(polygon.attr('lineWidth')).toBe(1);
    polygon.attr('lineWidth', 2);
    expect(polygon.attr('lineWidth')).toBe(2);
    let box = polygon.getBBox();
    expect(box.minX).toBe(29);
    expect(box.maxX).toBe(61);
    expect(box.minY).toBe(19);
    expect(box.maxY).toBe(101);

    const polygon1 = new G.Polygon({
      attrs: {
        points: [[ 58, 60 ], [ 80, 190 ], [ 32, 53 ], [ 45, 32 ]],
        lineWidth: 2
      }
    });
    box = polygon1.getBBox();
    expect(box.minX).toBe(31);
    expect(box.minY).toBe(31);
    expect(box.maxX).toBe(81);
    expect(box.maxY).toBe(191);
  });

  it('stroke', function() {
    polygon.attr('stroke', 'l (90) 0:#f0ff0f 1:#ff0e0d');
    expect(polygon.attr('stroke')).toBe('l (90) 0:#f0ff0f 1:#ff0e0d');
    canvas.add(polygon);
    canvas.draw();
  });

  it('fill', function() {
    polygon.attr('fill', 'r (0.3, 0.2, 0) 0:#edda2f 1:#23edfa');
    expect(polygon.attr('fill')).toBe('r (0.3, 0.2, 0) 0:#edda2f 1:#23edfa');
    canvas.draw();
  });

  it('isHit', function() {
    expect(polygon.isHit(30, 30)).toBe(true);
    expect(polygon.isHit(40, 20)).toBe(true);
    expect(polygon.isHit(30, 50)).toBe(true);
    expect(polygon.isHit(60, 100)).toBe(true);

    const polygon1 = new G.Polygon({
      attrs: {
        points: [[ 31, 23 ], [ 43, 12 ], [ 53, 23 ], [ 64, 33 ]],
        lineWidth: 2,
        stroke: 'red'
      }
    });
    expect(polygon1.isHit(30, 23)).toBe(true);
    expect(polygon1.isHit(31, 23)).toBe(true);
    expect(polygon1.isHit(43, 12)).toBe(true);
    expect(polygon1.isHit(53, 23)).toBe(true);
    expect(polygon1.isHit(64, 33)).toBe(true);
    expect(polygon1.isHit(37, 17.5)).toBe(true);
    expect(polygon1.isHit(48, 17.5)).toBe(true);
    expect(polygon1.isHit(47.5, 28)).toBe(true);
    expect(polygon1.isHit(42.5, 17.5)).toBe(false);

    const polygon2 = new G.Polygon({
      attrs: {
        points: [[ 31, 23 ], [ 43, 12 ], [ 53, 23 ], [ 64, 33 ]],
        lineWidth: 2,
        fill: 'red'
      }
    });
    canvas.add(polygon2);
    expect(polygon2.isHit(30, 23)).toBe(false);
    expect(polygon2.isHit(32, 23)).toBe(true);
    expect(polygon2.isHit(43, 13)).toBe(true);
    expect(polygon2.isHit(53, 23)).toBe(true);
    expect(polygon2.isHit(37, 17.5)).toBe(true);
    expect(polygon2.isHit(48, 17.5)).toBe(true);
    expect(polygon2.isHit(47.5, 28)).toBe(true);
    expect(polygon2.isHit(42.5, 17.5)).toBe(true);

    const polygon3 = new G.Polygon({
      attrs: {
        points: [[ 31, 23 ], [ 43, 12 ], [ 53, 23 ], [ 64, 33 ]],
        lineWidth: 2,
        stroke: 'green',
        fill: 'red'
      }
    });
    canvas.add(polygon3);
    expect(polygon3.isHit(30, 23)).toBe(true);
    expect(polygon3.isHit(31, 23)).toBe(true);
    expect(polygon3.isHit(43, 12)).toBe(true);
    expect(polygon3.isHit(53, 23)).toBe(true);
    expect(polygon3.isHit(64, 33)).toBe(true);
    expect(polygon3.isHit(37, 17.5)).toBe(true);
    expect(polygon3.isHit(48, 17.5)).toBe(true);
    expect(polygon3.isHit(47.5, 28)).toBe(true);
    expect(polygon3.isHit(42.5, 17.5)).toBe(true);
  });

});

