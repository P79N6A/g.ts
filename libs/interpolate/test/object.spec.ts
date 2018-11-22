/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

let it = require('tape'),
    interpolate = require('../');

it('interpolateObject(a, b) interpolates defined properties in a and b', function (test) {
  expect(interpolate.interpolateObject({ a: 2, b: 12 }, { a: 4, b: 24 })(0.5)).toBeDeepEqual( { a: 3, b: 18 });

});

it('interpolateObject(a, b) interpolates inherited properties in a and b', function (test) {
  function a(a) {this.a = a;}

  a.prototype.b = 12;
  expect(interpolate.interpolateObject(new a(2), { a: 4, b: 12 })(0.5)).toBeDeepEqual( { a: 3, b: 12 });
  expect(interpolate.interpolateObject({ a: 2, b: 12 }, new a(4))(0.5)).toBeDeepEqual( { a: 3, b: 12 });
  expect(interpolate.interpolateObject(new a(4), new a(2))(0.5)).toBeDeepEqual( { a: 3, b: 12 });

});

it('interpolateObject(a, b) interpolates color properties as rgb', function (test) {
  expect(interpolate.interpolateObject({ background: 'red' }, { background: 'green' })(0.5)).toBeDeepEqual( { background: 'rgb(128, 64, 0)' });
  expect(interpolate.interpolateObject({ fill: 'red' }, { fill: 'green' })(0.5)).toBeDeepEqual( { fill: 'rgb(128, 64, 0)' });
  expect(interpolate.interpolateObject({ stroke: 'red' }, { stroke: 'green' })(0.5)).toBeDeepEqual( { stroke: 'rgb(128, 64, 0)' });
  expect(interpolate.interpolateObject({ color: 'red' }, { color: 'green' })(0.5)).toBeDeepEqual( { color: 'rgb(128, 64, 0)' });

});

it('interpolateObject(a, b) interpolates nested objects and arrays', function (test) {
  expect(interpolate.interpolateObject({ foo: [2, 12] }, { foo: [4, 24] })(0.5)).toBeDeepEqual( { foo: [3, 18] });
  expect(interpolate.interpolateObject({ foo: { bar: [2, 12] } }, { foo: { bar: [4, 24] } })(0.5)).toBeDeepEqual( { foo: { bar: [3, 18] } });

});

it('interpolateObject(a, b) ignores properties in a that are not in b', function (test) {
  expect(interpolate.interpolateObject({ foo: 2, bar: 12 }, { foo: 4 })(0.5)).toBeDeepEqual( { foo: 3 });

});

it('interpolateObject(a, b) uses constant properties in b that are not in a', function (test) {
  expect(interpolate.interpolateObject({ foo: 2 }, { foo: 4, bar: 12 })(0.5)).toBeDeepEqual( { foo: 3, bar: 12 });

});

it('interpolateObject(a, b) treats undefined as an empty object', function (test) {
  expect(interpolate.interpolateObject(NaN, { foo: 2 })(0.5)).toBeDeepEqual( { foo: 2 });
  expect(interpolate.interpolateObject({ foo: 2 }, undefined)(0.5)).toBeDeepEqual( {});
  expect(interpolate.interpolateObject(undefined, { foo: 2 })(0.5)).toBeDeepEqual( { foo: 2 });
  expect(interpolate.interpolateObject({ foo: 2 }, null)(0.5)).toBeDeepEqual( {});
  expect(interpolate.interpolateObject(null, { foo: 2 })(0.5)).toBeDeepEqual( { foo: 2 });
  expect(interpolate.interpolateObject(null, NaN)(0.5)).toBeDeepEqual( {});

});

it('interpolateObject(a, b) interpolates objects without prototype', function (test) {
  expect(interpolate.interpolateObject(noproto({ foo: 0 }), noproto({ foo: 2 }))(0.5)).toBeDeepEqual( { foo: 1 });

});

function noproto(properties) {
  return Object.assign(Object.create(null), properties);
}
