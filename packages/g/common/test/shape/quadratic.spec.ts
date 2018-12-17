/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */


import { Canvas } from '../../src/canvas/canvas';

const div = document.createElement('div');
div.id    = 'canvas-quadratic';
document.body.appendChild(div);


describe('Quadratic line', function () {

  const canvas = new Canvas({
    containerId: 'canvas-quadratic',
    width      : 200,
    height     : 200,
    pixelRatio : 1
  });

  const quadratic = new Quadratic();
  it('init quadratic', function () {
    expect(quadratic.attr('p1')).toBeUndefined();
    expect(quadratic.attr('p2')).toBeUndefined();
    expect(quadratic.attr('p3')).toBeUndefined();
    expect(quadratic.attr('lineWidth')).toBe(1);
    expect(quadratic.attr('startArrow')).toBe(false);
    expect(quadratic.attr('endArrow')).toBe(false);

    expect(quadratic.getBBox()).toBeNull();
  });

  it('p1, p2, p3', function () {
    quadratic.attr({
      p1: [50, 50],
      p2: [80, 12],
      p3: [120, 150]
    });
    expect(quadratic.attr('p1')[0]).toBe(50);
    expect(quadratic.attr('p2')[1]).toBe(12);
    expect(quadratic.attr('p3')[0]).toBe(120);

    const box = quadratic.getBBox('box');
    expect(Util.isNumberEqual(box.minX, 49.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxX, 120.5)).toBe(true);
    expect(Util.isNumberEqual(box.minY, 41.29545454545454)).toBe(true);
    expect(Util.isNumberEqual(box.maxY, 150.5)).toBe(true);
  });

  it('stroke', function () {
    quadratic.attr('stroke', 'l (0) 0:#ff00ff 1:#00ffff');
    expect(quadratic.attr('stroke')).toBe('l (0) 0:#ff00ff 1:#00ffff');

    canvas.add(quadratic);
    canvas.draw();
  });

  it('p1', function () {
    quadratic.attr('p1', [70, 39]);
    expect(quadratic.attr('p1')[0]).toBe(70);
    expect(quadratic.attr('p1')[1]).toBe(39);
    const box = quadratic.getBBox();
    expect(Util.isNumberEqual(box.minX, 69.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxX, 120.5)).toBe(true);
    expect(Util.isNumberEqual(box.minY, 34.081818181818186)).toBe(true);
    expect(Util.isNumberEqual(box.maxY, 150.5)).toBe(true);
    canvas.draw();
  });

  it('p2', function () {
    quadratic.attr('p2', [90, 80]);
    expect(quadratic.attr('p2')[0]).toBe(90);
    expect(quadratic.attr('p2')[1]).toBe(80);
    const box = quadratic.getBBox();
    expect(Util.isNumberEqual(box.minX, 69.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxX, 120.5)).toBe(true);
    expect(Util.isNumberEqual(box.minY, 38.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxY, 150.5)).toBe(true);
    canvas.draw();
  });

  it('p3', function () {
    quadratic.attr('p3', [110, 10]);
    expect(quadratic.attr('p3')[0]).toBe(110);
    expect(quadratic.attr('p3')[1]).toBe(10);
    const box = quadratic.getBBox();
    expect(Util.isNumberEqual(box.minX, 69.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxX, 110.5)).toBe(true);
    expect(Util.isNumberEqual(box.minY, 9.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxY, 54.644144144144136)).toBe(true);
    canvas.draw();
  });

  it('lineWidth', function () {
    quadratic.attr('lineWidth', 2);
    expect(quadratic.attr('lineWidth')).toBe(2);
    const box = quadratic.getBBox();
    expect(Util.isNumberEqual(box.minX, 69)).toBe(true);
    expect(Util.isNumberEqual(box.maxX, 111)).toBe(true);
    expect(Util.isNumberEqual(box.minY, 9)).toBe(true);
    expect(Util.isNumberEqual(box.maxY, 55.144144144144136)).toBe(true);
    canvas.draw();
  });

  it('arrow', function () {
    quadratic.attr('startArrow', true);
    quadratic.attr('endArrow', true);
    // quadratic.attr('arrowLength', 15);
    quadratic.attr('arrowAngle', 45);
    expect(quadratic.attr('startArrow')).toBe(true);
    expect(quadratic.attr('endArrow')).toBe(true);
    expect(quadratic.attr('arrowLength')).toBeUndefined();
    expect(quadratic.attr('arrowAngle')).toBe(45);
    canvas.draw();
  });


  it('isHit', function () {
    expect(quadratic.isHit(70, 39)).toBe(true);
    expect(quadratic.isHit(90, 52.2)).toBe(true);
    expect(quadratic.isHit(110, 10)).toBe(true);
  });

  it('getPoint', function () {
    const quadratic = new Quadratic({
      attrs: {
        p1: [100, 100],
        p2: [200, 200],
        p3: [300, 100]
      }
    });

    const point1 = quadratic.getPoint(0);
    expect(point1.x).toBe(100);
    expect(point1.y).toBe(100);
    const point2 = quadratic.getPoint(1);
    expect(point2.x).toBe(300);
    expect(point2.y).toBe(100);
    const point3 = quadratic.getPoint(0.5);
    expect(point3.x).toBe(200);
    expect(point3.y).toBe(150);
    const point4 = quadratic.getPoint(0.3);
    expect(point4.x).toBe(160);
    expect(point4.y).toBe(142);
    expect(quadratic.isHit(160, 142)).toBe(true);
  });
});
