import { mat3, vec2, vec3 } from '../../../src/util/matrix';

describe('Matrix', () => {
  it('vec2.direction(v1, v2)', () => {
    const v1        = vec2.fromValues(0, 1);
    const v2        = vec2.fromValues(1, 0);
    const direction = vec2.direction(v1, v2);
    expect(direction < 0).toBe(true);
  });
  it('vec2.angle(v1, v2)', () => {
    const v1    = vec2.fromValues(0, 1);
    const v2    = vec2.fromValues(1, 0);
    const angle = vec2.angle(v1, v2);
    expect(Util.isNumberEqual(angle, Math.PI / 2)).toBe(true);
  });
  it('vec2.angleTo(v1, v2)', () => {
    const v1 = vec2.fromValues(0, -1);
    const v2 = vec2.fromValues(1, 0);
    expect(Util.isNumberEqual(vec2.angleTo(v1, v2), Math.PI / 2)).toBe(true);
  });
  it('vec2.angleTo(v1, v2, true)', () => {
    const v1 = vec2.fromValues(0, 1);
    const v2 = vec2.fromValues(-1, 0);
    expect(Util.isNumberEqual(vec2.angleTo(v1, v2, true), Math.PI / 2 * 3)).toBe(true);
  });

  it('mat3.translate(out, a, v)', () => {
    const m = mat3.create();
    mat3.translate(m, m, [30, 40]);
    const v = vec3.fromValues(50, 50, 1);
    vec3.transformMat3(v, v, m);
    expect(Util.isNumberEqual(v[0], 80)).toBe(true);
    expect(Util.isNumberEqual(v[1], 90)).toBe(true);
  });

  it('mat3.rotate(out, a, v)', () => {
    const m = mat3.create();
    mat3.rotate(m, m, Math.PI / 2);
    const v = vec3.fromValues(100, 0, 1);
    vec3.transformMat3(v, v, m);
    expect(Util.isNumberEqual(v[0], 0)).toBe(true);
    expect(Util.isNumberEqual(v[1], 100)).toBe(true);
  });

  it('mat3.scale(out, a, v)', () => {
    const m = mat3.create();
    mat3.scale(m, m, [2, 2]);
    const v = vec3.fromValues(50, 50, 1);
    vec3.transformMat3(v, v, m);
    expect(Util.isNumberEqual(v[0], 100)).toBe(true);
    expect(Util.isNumberEqual(v[1], 100)).toBe(true);
  });
});
