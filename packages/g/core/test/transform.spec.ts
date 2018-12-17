import Element from '../../../src/core/element';
import { mat3, vec3 } from '../../../src/util/matrix';
import { isNumberEqual } from '@gradii/g/util';

describe('Transform', function() {

  it('translate and apply', function() {
    const e = new Element();
    const point = vec3.fromValues(0, 0, 1);
    e.translate(10, 4);
    e.apply(point);
    expect(isNumberEqual(point[0], 10)).toBe(true);
    expect(isNumberEqual(point[1], 4)).toBe(true);
  });

  it('rotate', function() {
    const e = new Element();
    const point = vec3.fromValues(10, 0, 0);
    e.rotate(45 / 180 * Math.PI);
    e.apply(point);
    expect(isNumberEqual(point[0], 5 * Math.sqrt(2))).toBe(true);
    expect(isNumberEqual(point[1], 5 * Math.sqrt(2))).toBe(true);
    e.apply(point);
    expect(isNumberEqual(point[0], 0)).toBe(true);
    expect(isNumberEqual(point[1], 10)).toBe(true);
    e.rotate(-135 / 180 * Math.PI);
    e.apply(point);
    expect(isNumberEqual(point[0], 10)).toBe(true);
    expect(isNumberEqual(point[1], 0)).toBe(true);
  });

  it('scale', function() {
    const e = new Element();
    const point = vec3.fromValues(10, 10, 1);
    e.scale(0.5, 0.5);
    e.apply(point);
    expect(isNumberEqual(point[0], 5)).toBe(true);
    expect(isNumberEqual(point[1], 5)).toBe(true);
    e.scale(4, 2);
    e.apply(point);
    expect(isNumberEqual(point[0], 10)).toBe(true);
    expect(isNumberEqual(point[1], 5)).toBe(true);
  });

  it('complex', function() {
    const e = new Element();
    const point1 = vec3.fromValues(10, 10, 1);
    e.translate(10, 10);
    e.rotate(Math.PI / 2);
    e.translate(-10, -10);
    e.scale(0.5, 0.5);
    e.apply(point1);

    expect(isNumberEqual(point1[0], -15)).toBe(true);
    expect(isNumberEqual(point1[1], 5)).toBe(true);
  });

  it('transform', function() {
    const e = new Element();
    e.transform([[ 'r', Math.PI / 2 ], [ 't', 10, 10 ], [ 'r', -Math.PI / 2 ]]);
    const point = vec3.fromValues(0, 0, 1);
    e.apply(point);
    expect(isNumberEqual(point[0], 10)).toBe(true);
    expect(isNumberEqual(point[1], -10)).toBe(true);
  });

  it('setTransform and invert', function() {
    const e = new Element();
    e.translate(10, 10);
    e.setTransform([[ 'r', Math.PI / 2 ], [ 't', 10, 10 ], [ 'r', -Math.PI / 2 ], [ 's', 0.5, 0.3 ]]);
    const point = vec3.fromValues(0, 0, 1);
    e.apply(point);
    expect(isNumberEqual(point[0], 5)).toBe(true);
    expect(isNumberEqual(point[1], -3)).toBe(true);
    e.invert(point);
    expect(isNumberEqual(point[0], 0)).toBe(true);
    expect(isNumberEqual(point[1], 0)).toBe(true);
    const e1 = new Element();
    e1.setTransform([[ 'm', e.attr('matrix') ]]);
    e1.apply(point);
    expect(isNumberEqual(point[0], 5)).toBe(true);
    expect(isNumberEqual(point[1], -3)).toBe(true);
    e1.invert(point);
    expect(isNumberEqual(point[0], 0)).toBe(true);
    expect(isNumberEqual(point[1], 0)).toBe(true);
  });

  it('getMatrix', function() {
    const e = new Element();
    const m = e.getMatrix();
    const m1 = mat3.create();
    expect(mat3.exactEquals(m, m1)).toBe(true);
  });
});

