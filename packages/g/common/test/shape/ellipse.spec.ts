/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */


import { Canvas } from '../../../src/canvas/canvas';

const div = document.createElement('div');
div.id    = 'canvas-ellipse';
document.body.appendChild(div);


describe('Ellipse', function () {

  const canvas = new Canvas({
    containerId: 'canvas-ellipse',
    width      : 200,
    height     : 200,
    pixelRatio : 1
  });

  const ellipse = new Ellipse({
    attrs: {
      x : 0,
      y : 0,
      rx: 1,
      ry: 1
    }
  });

  it('init attr', function () {
    expect(ellipse.attr('x')).toBe(0);
    expect(ellipse.attr('y')).toBe(0);
    expect(ellipse.attr('rx')).toBe(1);
    expect(ellipse.attr('ry')).toBe(1);
    expect(ellipse.attr('lineWidth')).toBe(1);
    expect(ellipse.attr('stroke')).toBeUndefined();
    expect(ellipse.attr('fill')).toBeUndefined();
    const box = ellipse.getBBox();
    expect(box.minX).toBe(-1.5);
    expect(box.maxX).toBe(1.5);
    expect(box.minY).toBe(-1.5);
    expect(box.maxY).toBe(1.5);
  });

  it('x', function () {
    ellipse.attr('x', 20);
    expect(ellipse.attr('x')).toBe(20);
    const box = ellipse.getBBox();
    expect(box.minX).toBe(18.5);
    expect(box.maxX).toBe(21.5);
    expect(box.minY).toBe(-1.5);
    expect(box.maxY).toBe(1.5);
  });

  it('y', function () {
    ellipse.attr('y', 30);
    expect(ellipse.attr('y')).toBe(30);
    const box = ellipse.getBBox();
    expect(box.minX).toBe(18.5);
    expect(box.maxX).toBe(21.5);
    expect(box.minY).toBe(28.5);
    expect(box.maxY).toBe(31.5);
  });

  it('rx', function () {
    expect(ellipse.attr('rx')).toBe(1);
    ellipse.attr('rx', 5);
    expect(ellipse.attr('rx')).toBe(5);
    const box = ellipse.getBBox();
    expect(box.minX).toBe(14.5);
    expect(box.maxX).toBe(25.5);
    expect(box.minY).toBe(28.5);
    expect(box.maxY).toBe(31.5);
  });

  it('ry', function () {
    expect(ellipse.attr('ry')).toBe(1);
    ellipse.attr('ry', 10);
    expect(ellipse.attr('ry')).toBe(10);
    const box = ellipse.getBBox();
    expect(box.minX).toBe(14.5);
    expect(box.maxX).toBe(25.5);
    expect(box.minY).toBe(19.5);
    expect(box.maxY).toBe(40.5);
  });


  it('lineWidth', function () {
    expect(ellipse.attr('lineWidth')).toBe(1);
    ellipse.attr('lineWidth', 2);
    expect(ellipse.attr('lineWidth')).toBe(2);
    const box = ellipse.getBBox();
    expect(box.minX).toBe(14);
    expect(box.maxX).toBe(26);
    expect(box.minY).toBe(19);
    expect(box.maxY).toBe(41);
  });

  it('stroke', function () {
    ellipse.attr('stroke', 'l (0) 0:#959231 1:#00cd54');
    expect(ellipse.attr('stroke')).toBe('l (0) 0:#959231 1:#00cd54');
    canvas.add(ellipse);
    canvas.draw();
  });

  it('fill', function () {
    ellipse.attr('fill', 'l (90) 0:#959231 1:#00cd54');
    expect(ellipse.attr('fill')).toBe('l (90) 0:#959231 1:#00cd54');
    canvas.draw();
  });


  it('isHit', function () {
    const ellipse1 = new Ellipse({
      attrs: {
        x : 50,
        y : 50,
        rx: 200,
        ry: 100
      }
    });

    expect(ellipse1.isHit(-150, 50)).toBe(false);
    expect(ellipse1.isHit(50, -50)).toBe(false);
    expect(ellipse1.isHit(250, 50)).toBe(false);
    expect(ellipse1.isHit(50, 150)).toBe(false);

    ellipse1.attr('stroke', 'red');
    expect(ellipse1.isHit(-150, 50)).toBe(true);
    expect(ellipse1.isHit(50, -50)).toBe(true);
    expect(ellipse1.isHit(250, 50)).toBe(true);
    expect(ellipse1.isHit(50, 150)).toBe(true);

    const ellipse2 = new Ellipse({
      attrs: {
        x : 100,
        y : 200,
        rx: 50,
        ry: 80
      }
    });

    expect(ellipse2.isHit(70, 200)).toBe(false);
    expect(ellipse2.isHit(100, 150)).toBe(false);
    expect(ellipse2.isHit(130, 200)).toBe(false);
    expect(ellipse2.isHit(100, 230)).toBe(false);

    ellipse2.attr('fill', 'green');

    expect(ellipse2.isHit(70, 200)).toBe(true);
    expect(ellipse2.isHit(100, 150)).toBe(true);
    expect(ellipse2.isHit(130, 200)).toBe(true);
    expect(ellipse2.isHit(100, 230)).toBe(true);

    const ellipse3 = new Ellipse({
      attrs: {
        x : 200,
        y : 200,
        rx: 50,
        ry: 100
      }
    });

    expect(ellipse3.isHit(150, 200)).toBe(false);
    expect(ellipse3.isHit(250, 200)).toBe(false);
    expect(ellipse3.isHit(200, 100)).toBe(false);
    expect(ellipse3.isHit(200, 300)).toBe(false);
    expect(ellipse3.isHit(170, 200)).toBe(false);
    ellipse3.attr({
      fill  : 'green',
      stroke: 'red'
    });
    expect(ellipse3.isHit(150, 200)).toBe(true);
    expect(ellipse3.isHit(250, 200)).toBe(true);
    expect(ellipse3.isHit(200, 100)).toBe(true);
    expect(ellipse3.isHit(200, 300)).toBe(true);
    expect(ellipse3.isHit(170, 200)).toBe(true);
  });
});
