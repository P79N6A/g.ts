/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */


import {Circle} from '../../src/canvas/shape/circle';

const div = document.createElement('div');
div.id = 'canvas-circle';
document.body.appendChild(div);

describe('Circle', function() {
  const canvas = new Canvas({
    containerId: 'canvas-circle',
    width: 200,
    height: 200,
    pixelRatio: 1
  });

  const circle = new Circle({
    attrs: {
      x: 0,
      y: 0,
      r: 0
    }
  });

  it('init attr', function() {
    expect(circle.attr('lineWidth')).toBe(1);
    expect(circle.attr('stroke')).toBeUndefined();
    expect(circle.attr('fill')).toBeUndefined();
    const box = circle.getBBox();
    expect(box.minX).toBe(-0.5);
    expect(box.maxX).toBe(0.5);
    expect(box.minY).toBe(-0.5);
    expect(box.maxY).toBe(0.5);
  });

  it('x', function() {
    circle.attr('x', 10);
    expect(circle.attr('x')).toBe(10);
    const box = circle.getBBox();
    expect(box.minX).toBe(9.5);
    expect(box.maxX).toBe(10.5);
    expect(box.minY).toBe(-0.5);
    expect(box.maxY).toBe(0.5);
  });

  it('y', function() {
    circle.attr('y', 20);
    expect(circle.attr('y')).toBe(20);
    const box = circle.getBBox();
    expect(box.minX).toBe(9.5);
    expect(box.maxX).toBe(10.5);
    expect(box.minY).toBe(19.5);
    expect(box.maxY).toBe(20.5);
  });

  it('r', function() {
    expect(circle.attr('r')).toBe(0);
    circle.attr('r', 10);
    expect(circle.attr('r')).toBe(10);
    const box = circle.getBBox();
    expect(box.minX).toBe(-0.5);
    expect(box.maxX).toBe(20.5);
    expect(box.minY).toBe(9.5);
    expect(box.maxY).toBe(30.5);
  });

  it('lineWidth', function() {
    expect(circle.attr('lineWidth')).toBe(1);
    circle.attr('lineWidth', 2);
    expect(circle.attr('lineWidth')).toBe(2);
    const box = circle.getBBox();
    expect(box.minX).toBe(-1);
    expect(box.maxX).toBe(21);
    expect(box.minY).toBe(9);
    expect(box.maxY).toBe(31);
  });

  it('stroke', function() {
    circle.attr('stroke', 'l (30) 0:#00ffff 1:#ff00ff');
    expect(circle.attr('stroke')).toBe('l (30) 0:#00ffff 1:#ff00ff');
    canvas.add(circle);
    canvas.draw(circle);
  });

  it('fill', function() {
    circle.attr('fill', 'r (0.5, 0.5, 0) 0:#00ffff 1:#ffff00');
    expect(circle.attr('fill')).toBe('r (0.5, 0.5, 0) 0:#00ffff 1:#ffff00');
    canvas.draw(circle);
  });

  it('isHit', function() {
    const circle1 = new Circle({
      attrs: {
        x: 50,
        y: 50,
        r: 50
      }
    });

    expect(circle1.isHit(0, 50)).toBe(false);
    expect(circle1.isHit(50, 0)).toBe(false);
    expect(circle1.isHit(100, 50)).toBe(false);
    expect(circle1.isHit(50, 100)).toBe(false);
    circle1.attr('stroke', 'red');

    expect(circle1.isHit(0, 50)).toBe(true);
    expect(circle1.isHit(50, 0)).toBe(true);
    expect(circle1.isHit(100, 50)).toBe(true);
    expect(circle1.isHit(50, 100)).toBe(true);
    expect(circle1.isHit(20, 50)).toBe(false);
    expect(circle1.isHit(50, 20)).toBe(false);
    expect(circle1.isHit(80, 50)).toBe(false);
    expect(circle1.isHit(50, 80)).toBe(false);

    const circle2 = new Circle({
      attrs: {
        x: 50,
        y: 50,
        r: 50
      }
    });

    expect(circle2.isHit(20, 50)).toBe(false);
    expect(circle2.isHit(50, 20)).toBe(false);
    expect(circle2.isHit(80, 50)).toBe(false);
    expect(circle2.isHit(50, 80)).toBe(false);
    circle2.attr('fill', 'green');
    expect(circle2.isHit(20, 50)).toBe(true);
    expect(circle2.isHit(50, 20)).toBe(true);
    expect(circle2.isHit(80, 50)).toBe(true);
    expect(circle2.isHit(50, 80)).toBe(true);

    circle2.attr('stroke', 'red');
    expect(circle2.isHit(0, 50)).toBe(true);
    expect(circle2.isHit(50, 0)).toBe(true);
    expect(circle2.isHit(100, 50)).toBe(true);
    expect(circle2.isHit(50, 100)).toBe(true);
    expect(circle2.isHit(20, 50)).toBe(true);
    expect(circle2.isHit(50, 20)).toBe(true);
    expect(circle2.isHit(80, 50)).toBe(true);
    expect(circle2.isHit(50, 80)).toBe(true);
  });

  it('strokeOpactiy', function() {
    const circle = new Circle({
      attrs: {
        x: 150,
        y: 150,
        r: 100,
        stroke: 'red',
        strokeOpactiy: 0.4
      }
    });

    canvas.add(circle);
    canvas.draw();
  });

});

