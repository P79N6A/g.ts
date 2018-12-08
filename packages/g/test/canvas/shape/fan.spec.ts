/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */


div.id = 'canvas-fan';
document.body.appendChild(div);


describe('CFan', function() {
  const canvas = new Canvas({
    containerId: 'canvas-fan',
    width: 200,
    heigth: 200,
    pixelRatio: 1
  });

  const fan = new G.Fan({
    attrs: {
      x: 0,
      y: 0,
      rs: 0,
      re: 0,
      startAngle: 0,
      endAngle: 0,
      clockwise: false
    }
  });
  it('init attr', function() {
    expect(fan.attr('x')).toBe(0);
    expect(fan.attr('y')).toBe(0);
    expect(fan.attr('rs')).toBe(0);
    expect(fan.attr('re')).toBe(0);
    expect(fan.attr('startAngle')).toBe(0);
    expect(fan.attr('endAngle')).toBe(0);
    expect(fan.attr('clockwise')).toBe(false);
    expect(fan.attr('lineWidth')).toBe(1);
    const box = fan.getBBox();
    expect(box.minX).toBe(-0.5);
    expect(box.maxX).toBe(0.5);
    expect(box.minY).toBe(-0.5);
    expect(box.maxY).toBe(0.5);
  });

  it('x', function() {
    fan.attr('x', 10);
    expect(fan.attr('x')).toBe(10);
    const box = fan.getBBox();
    expect(box.minX).toBe(9.5);
    expect(box.maxX).toBe(10.5);
  });

  it('y', function() {
    fan.attr('y', 20);
    expect(fan.attr('y')).toBe(20);
    const box = fan.getBBox();
    expect(box.minY).toBe(19.5);
    expect(box.maxY).toBe(20.5);
  });

  it('startAngle', function() {
    fan.attr('startAngle', Math.PI);
    expect(Util.isNumberEqual(fan.attr('startAngle'), Math.PI)).toBe(true);
  });

  it('endAngle', function() {
    fan.attr('endAngle', Math.PI * 3 / 2);
    expect(Util.isNumberEqual(fan.attr('endAngle'), Math.PI * 3 / 2)).toBe(true);
  });

  it('rs', function() {
    expect(fan.attr('rs')).toBe(0);
    fan.attr('rs', 10);
    expect(fan.attr('rs')).toBe(10);
    const box = fan.getBBox();
    expect(Util.isNumberEqual(box.minX, -0.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxX, 10.5)).toBe(true);
    expect(Util.isNumberEqual(box.minY, 9.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxY, 20.5)).toBe(true);
  });

  it('re', function() {
    expect(fan.attr('re')).toBe(0);
    fan.attr('re', 30);
    expect(fan.attr('re')).toBe(30);
    canvas.draw();
    const box = fan.getBBox();
    expect(Util.isNumberEqual(box.minX, -20.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxX, 10.5)).toBe(true);
    expect(Util.isNumberEqual(box.minY, -10.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxY, 20.5)).toBe(true);
  });

  it('clockwise', function() {
    expect(fan.attr('clockwise')).toBe(false);
    fan.attr('clockwise', true);
    expect(fan.attr('clockwise')).toBe(true);
    const box = fan.getBBox();
    expect(Util.isNumberEqual(box.minX, -20.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxX, 40.5)).toBe(true);
    expect(Util.isNumberEqual(box.minY, -10.5)).toBe(true);
    expect(Util.isNumberEqual(box.maxY, 50.5)).toBe(true);
  });

  it('lineWidth', function() {
    expect(fan.attr('lineWidth')).toBe(1);
    fan.attr('lineWidth', 2);
    expect(fan.attr('lineWidth')).toBe(2);
    const box = fan.getBBox();
    expect(Util.isNumberEqual(box.minX, -21)).toBe(true);
    expect(Util.isNumberEqual(box.maxX, 41)).toBe(true);
    expect(Util.isNumberEqual(box.minY, -11)).toBe(true);
    expect(Util.isNumberEqual(box.maxY, 51)).toBe(true);
  });

  it('stroke', function() {
    fan.attr({
      x: 40,
      y: 40
    });
    fan.attr('stroke', 'l (210) 0:#ff0000 1:#ffffff');
    expect(fan.attr('stroke')).toBe('l (210) 0:#ff0000 1:#ffffff');
    canvas.add(fan);
    canvas.draw();
  });

  it('fill', function() {
    fan.attr('fill', 'l (130) 0:#0000ff 1:#ffffff');
    expect(fan.attr('fill')).toBe('l (130) 0:#0000ff 1:#ffffff');
    canvas.draw();
  });

  it('isHit', function() {
    expect(fan.isHit(40, 40)).toBe(false);
    expect(fan.isHit(40, 60)).toBe(true);
  });
});

