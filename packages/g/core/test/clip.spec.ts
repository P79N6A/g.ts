import { Circle } from '../../common/src/canvas/shape/circle';

const div = document.createElement('div');
div.id = 'canvas-clip';
document.body.appendChild(div);

describe('clip', function() {

  const canvas = new Canvas({
    containerId: 'canvas-clip',
    width: 200,
    height: 200,
    pixelRatio: 1
  });

  const shape = new Circle({
    attrs: {
      x: 100,
      y: 100,
      r: 50,
      fill: 'black'
    }
  });

  canvas.add(shape);

  it('shape rect', function() {
    const rect = new Rect({
      attrs: {
        x: 50,
        y: 50,
        width: 50,
        height: 50
      }
    });
    shape.attr('clip', rect);
    canvas.draw();

    expect(shape.isHit(50, 50)).toBe(false);
    expect(shape.isHit(100, 100)).toBe(true);
    expect(shape.isHit(101, 100)).toBe(false);
  });

  it('shape circle', function() {
    const circle = new Circle({
      attrs: {
        x: 50,
        y: 100,
        r: 50
      }
    });

    shape.attr('clip', circle);
    canvas.draw();

    expect(shape.isHit(100, 100)).toBe(true);
    expect(shape.isHit(101, 100)).toBe(false);
    expect(shape.isHit(50, 100)).toBe(true);
    expect(shape.isHit(49, 100)).toBe(false);
    expect(shape.isHit(51, 100)).toBe(true);
  });

  it('shape ellipse', function() {
    const ellipse = new Ellipse({
      attrs: {
        x: 100,
        y: 100,
        rx: 50,
        ry: 20
      }
    });

    shape.attr('clip', ellipse);
    canvas.draw();
    expect(shape.isHit(50, 100)).toBe(true);
    expect(shape.isHit(49, 100)).toBe(false);
    expect(shape.isHit(100, 80)).toBe(true);
    expect(shape.isHit(100, 79)).toBe(false);
  });

  it('shape fan', function() {
    const fan = new Fan({
      attrs: {
        x: 100,
        y: 0,
        rs: 60,
        re: 100,
        startAngle: 0,
        endAngle: 360
      }
    });
    shape.attr('clip', fan);
    canvas.draw();

    expect(shape.isHit(100, 50)).toBe(false);
    expect(shape.isHit(100, 59)).toBe(false);
    expect(shape.isHit(100, 60)).toBe(true);
    expect(shape.isHit(100, 100)).toBe(true);
    expect(shape.isHit(100, 101)).toBe(false);
  });

  it('shape ploygon', function() {
    const polygon = new Polygon({
      attrs: {
        points: [
          [ 100, 40 ],
          [ 40, 100 ],
          [ 100, 160 ],
          [ 160, 100 ]
        ]
      }
    });

    shape.attr('clip', polygon);
    canvas.draw();

    expect(shape.isHit(70, 70)).toBe(true);
    expect(shape.isHit(69, 69)).toBe(false);
  });

  it('shape path', function() {
    const path = new Path({
      attrs: {
        path: [
          [ 'M', 50, 50 ],
          [ 'L', 100, 50 ],
          [ 'A', 25, 25, 0, 1, 1, 100, 100 ],
          [ 'A', 25, 25, 0, 1, 0, 100, 150 ],
          [ 'L', 50, 150 ],
          [ 'Z' ]
        ]
      }
    });

    shape.attr('clip', path);
    canvas.draw();
    expect(shape.isHit(125, 75)).toBe(true);
    expect(shape.isHit(126, 75)).toBe(false);
    expect(shape.isHit(75, 125)).toBe(true);
    expect(shape.isHit(76, 125)).toBe(false);
  });

  const group = new Group();

  const fan = new Fan({
    attrs: {
      x: 150,
      y: 100,
      rs: 30,
      re: 50,
      startAngle: 0,
      endAngle: Math.PI * 2 / 3,
      fill: 'green'
    }
  });
  group.add([ shape, fan ]);
  canvas.add(group);

  it('group rect', function() {
    const rect = new Rect({
      attrs: {
        x: 80,
        y: 75,
        width: 100,
        height: 100
      }
    });
    group.attr('clip', rect);
    canvas.draw();

    // expect(canvas.getShape(100, 70)).to.be.undefined;
    expect(canvas.getShape(125, 75)).toEqual(shape);
    expect(canvas.getShape(100, 80)).toEqual(shape);

    // expect(canvas.getShape(150, 150)).to.be(fan);
  });

  it('group circle', function() {
    const circle = new Circle({
      attrs: {
        x: 130,
        y: 100,
        r: 60
      }
    });

    group.attr('clip', circle);
    canvas.draw();
  });

  it('group ellipse', function() {
    const ellipse = new Ellipse({
      attrs: {
        x: 130,
        y: 100,
        rx: 60,
        ry: 30
      }
    });

    group.attr('clip', ellipse);
    canvas.draw();
  });

  it('group fan', function() {
    const fan = new Fan({
      attrs: {
        x: 130,
        y: 100,
        rs: 30,
        re: 60,
        startAngle: 0,
        endAngle: Math.PI * 2
      }
    });
    group.attr('clip', fan);
    canvas.draw();
  });

  it('group polygon', function() {
    const polygon = new Polygon({
      attrs: {
        points: [
          [ 120, 40 ],
          [ 60, 100 ],
          [ 120, 160 ],
          [ 180, 100 ]
        ]
      }
    });

    group.attr('clip', polygon);
    canvas.draw();
  });
});
