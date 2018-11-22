/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { interpolateObject } from '../public-api';

function noproto(properties) {
  return Object.assign(Object.create(null), properties);
}

describe('test interpolate object', () => {
  it('interpolateObject(a, b) interpolates defined properties in a and b', () => {
    expect(interpolateObject({a: 2, b: 12}, {a: 4, b: 24})(0.5)).toEqual({a: 3, b: 18});
  });

  it('interpolateObject(a, b) interpolates inherited properties in a and b', () => {
    function a(a) {this.a = a;}

    a.prototype.b = 12;
    expect(interpolateObject(new a(2), {a: 4, b: 12})(0.5)).toEqual({a: 3, b: 12});
    expect(interpolateObject({a: 2, b: 12}, new a(4))(0.5)).toEqual({a: 3, b: 12});
    expect(interpolateObject(new a(4), new a(2))(0.5)).toEqual({a: 3, b: 12});
  });

  it('interpolateObject(a, b) interpolates color properties as rgb', () => {
    expect(interpolateObject({background: 'red'}, {background: 'green'})(0.5)).toEqual({background: 'rgb(128, 64, 0)'});
    expect(interpolateObject({fill: 'red'}, {fill: 'green'})(0.5)).toEqual({fill: 'rgb(128, 64, 0)'});
    expect(interpolateObject({stroke: 'red'}, {stroke: 'green'})(0.5)).toEqual({stroke: 'rgb(128, 64, 0)'});
    expect(interpolateObject({color: 'red'}, {color: 'green'})(0.5)).toEqual({color: 'rgb(128, 64, 0)'});
  });

  it('interpolateObject(a, b) interpolates nested objects and arrays', () => {
    expect(interpolateObject({foo: [2, 12]}, {foo: [4, 24]})(0.5)).toEqual({foo: [3, 18]});
    expect(interpolateObject({foo: {bar: [2, 12]}}, {foo: {bar: [4, 24]}})(0.5)).toEqual({foo: {bar: [3, 18]}});
  });

  it('interpolateObject(a, b) ignores properties in a that are not in b', () => {
    expect(interpolateObject({foo: 2, bar: 12}, {foo: 4})(0.5)).toEqual({foo: 3});
  });

  it('interpolateObject(a, b) uses constant properties in b that are not in a', () => {
    expect(interpolateObject({foo: 2}, {foo: 4, bar: 12})(0.5)).toEqual({foo: 3, bar: 12});
  });

  it('interpolateObject(a, b) treats undefined as an empty object', () => {
    expect(interpolateObject(NaN, {foo: 2})(0.5)).toEqual({foo: 2});
    expect(interpolateObject({foo: 2}, undefined)(0.5)).toEqual({});
    expect(interpolateObject(undefined, {foo: 2})(0.5)).toEqual({foo: 2});
    expect(interpolateObject({foo: 2}, null)(0.5)).toEqual({});
    expect(interpolateObject(null, {foo: 2})(0.5)).toEqual({foo: 2});
    expect(interpolateObject(null, NaN)(0.5)).toEqual({});
  });

  it('interpolateObject(a, b) interpolates objects without prototype', () => {
    expect(interpolateObject(noproto({foo: 0}), noproto({foo: 2}))(0.5)).toEqual({foo: 1});
  });
})


