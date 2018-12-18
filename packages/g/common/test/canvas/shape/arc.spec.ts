/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */


import { Canvas } from '../../../src/canvas/canvas';
import { Arc } from '../../../src/canvas/shape/arc';

const div = document.createElement('div');
div.id    = 'canvas-arc';
document.body.appendChild(div);
const ratio = Util.getRatio();
describe('Arc line', () => {

  const canvas = new Canvas({
    containerId: 'canvas-arc',
    width      : 200,
    height     : 200
  });

  canvas.on('canvas-click', ev => {
    console.log(ev);
  });
  const arc = new Arc();
  it('init attrs', () => {
    expect(arc.attr('x')).toBe(0);
    expect(arc.attr('y')).toBe(0);
    expect(arc.attr('r')).toBe(0);
    expect(arc.attr('startAngle')).toBe(0);
    expect(arc.attr('endAngle')).toBe(0);
    expect(arc.attr('clockwise')).toBe(false);
    expect(arc.attr('lineWidth')).toBe(1);
    expect(arc.attr('stroke')).toBeUndefined();

    const box = arc.getBBox();
    expect(box.minX).toBe(-0.5);
    expect(box.maxX).toBe(0.5);
    expect(box.minY).toBe(-0.5);
    expect(box.maxY).toBe(0.5);
  });

  it('x', () => {
    arc.attr('x', 10);
    expect(arc.attr('x')).toBe(10);
    const box = arc.getBBox();
    expect(box.minX).toBe(9.5);
    expect(box.maxX).toBe(10.5);
  });

  it('y', () => {
    arc.attr('y', 20);
    expect(arc.attr('y')).toBe(20);
    const box = arc.getBBox();
    expect(box.minY).toBe(19.5);
    expect(box.maxY).toBe(20.5);
  });

  it('r', () => {
    arc.attr('r', 30);
    const box = arc.getBBox();
    expect(box.minX).toBe(39.5);
    expect(box.maxX).toBe(40.5);
    expect(box.minY).toBe(19.5);
    expect(box.maxY).toBe(20.5);
  });

  it('startAngle', () => {
    arc.attr('startAngle', 1 / 3 * Math.PI);
    expect(arc.attr('startAngle')).toBeCloseTo(1 / 3 * Math.PI);
    const box = arc.getBBox();
    expect(box.minX).toBe(-20.5);
    expect(box.maxX).toBe(40.5);
    expect(box.minY).toBe(-10.5);
    expect(box.maxY).toBe(50.5);
  });

  it('endAngle', () => {
    arc.attr('endAngle', 120 / 180 * Math.PI);
    expect(arc.attr('endAngle').toBeCloseTo(120 / 180 * Math.PI)).toBe(true);
    const box = arc.getBBox();
    expect(box.minX).toBeCloseTo(-5.5);
    expect(box.maxX).toBeCloseTo(25.5);
    expect(box.minY).toBeCloseTo(45.48076211353316);
    expect(box.maxY).toBeCloseTo(50.5);
  });

  it('clockwise', () => {
    expect(arc.attr('clockwise')).toBe(false);
    arc.attr('clockwise', true);
    expect(arc.attr('clockwise')).toBe(true);
    const box = arc.getBBox();
    expect(box.minX).toBeCloseTo(-20.5);
    expect(box.maxX).toBeCloseTo(40.5);
    expect(box.minY).toBeCloseTo(-10.5);
    expect(box.maxY).toBeCloseTo(46.48076211353316);
  });

  it('lineWidth', () => {
    expect(arc.attr('lineWidth')).toBe(1);
    arc.attr('lineWidth', 2);
    expect(arc.attr('lineWidth')).toBe(2);
    const box = arc.getBBox();
    expect(box.minX).toBeCloseTo(-21);
    expect(box.maxX).toBeCloseTo(41);
    expect(box.minY).toBeCloseTo(-11);
    expect(box.maxY).toBeCloseTo(46.98076211353316);
  });

  it('stroke', () => {
    arc.attr({
      startAngle: -Math.PI,
      endAngle  : Math.PI / 2,
      clockwise : false,
      x         : 60,
      y         : 60,
      r         : 20
    });
    arc.attr('stroke', 'l (0) 0:#ff00ff 1:#00ffff');
    expect(arc.attr('stroke')).toBe('l (0) 0:#ff00ff 1:#00ffff');
    canvas.add(arc);
    canvas.draw();
  });

  it('arrow', () => {
    arc.attr('startArrow', true);
    arc.attr('endArrow', true);
    arc.attr('arrowLength', 5);
    arc.attr('lineWidth', 1);
    arc.attr('arrowAngle', 90);
    expect(arc.attr('startArrow')).toBe(true);
    expect(arc.attr('endArrow')).toBe(true);
    expect(arc.attr('arrowLength')).toBe(5);
    expect(arc.attr('arrowAngle')).toBe(90);
    canvas.draw();
  });

  it('isHit', () => {
    expect(arc.isHit(60 * ratio, 80 * ratio)).toBe(true);
  });

  it('normal', () => {
    const arc = new Arc({
      attrs: {
        x         : 50,
        y         : 50,
        r         : 40,
        startAngle: 0,
        endAngle  : 110 / 180 * Math.PI,
        stroke    : 'red'
      }
    });
    canvas.add(arc);
    canvas.draw();
  });
});
