/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

let it = require('tape'),
    color = require('d3-color'),
    interpolate = require('../');

it('interpolate(a, b) interpolates strings if b is a string and not a color', function (test) {
  expect(interpolate.interpolate('foo', 'bar')(0.5)).toBeStrictEqual( 'bar');

});

it('interpolate(a, b) interpolates strings if b is a string and not a color, even if b is coercible to a number', function (test) {
  expect(interpolate.interpolate('1', '2')(0.5)).toBeStrictEqual( '1.5');
  expect(interpolate.interpolate(' 1', ' 2')(0.5)).toBeStrictEqual( ' 1.5');

});

it('interpolate(a, b) interpolates RGB colors if b is a string and a color', function (test) {
  expect(interpolate.interpolate('red', 'blue')(0.5)).toBeStrictEqual( 'rgb(128, 0, 128)');
  expect(interpolate.interpolate('#ff0000', '#0000ff')(0.5)).toBeStrictEqual( 'rgb(128, 0, 128)');
  expect(interpolate.interpolate('#f00', '#00f')(0.5)).toBeStrictEqual( 'rgb(128, 0, 128)');
  expect(interpolate.interpolate('rgb(255, 0, 0)', 'rgb(0, 0, 255)')(0.5)).toBeStrictEqual( 'rgb(128, 0, 128)');
  expect(interpolate.interpolate('rgba(255, 0, 0, 1.0)', 'rgba(0, 0, 255, 1.0)')(0.5)).toBeStrictEqual( 'rgb(128, 0, 128)');
  expect(interpolate.interpolate('rgb(100%, 0%, 0%)', 'rgb(0%, 0%, 100%)')(0.5)).toBeStrictEqual( 'rgb(128, 0, 128)');
  expect(interpolate.interpolate('rgba(100%, 0%, 0%, 1.0)', 'rgba(0%, 0%, 100%, 1.0)')(0.5)).toBeStrictEqual( 'rgb(128, 0, 128)');
  expect(interpolate.interpolate('rgba(100%, 0%, 0%, 0.5)', 'rgba(0%, 0%, 100%, 0.7)')(0.5)).toBeStrictEqual( 'rgba(128, 0, 128, 0.6)');

});

it('interpolate(a, b) interpolates RGB colors if b is a color', function (test) {
  expect(interpolate.interpolate('red', color.rgb('blue'))(0.5)).toBeStrictEqual( 'rgb(128, 0, 128)');
  expect(interpolate.interpolate('red', color.hsl('blue'))(0.5)).toBeStrictEqual( 'rgb(128, 0, 128)');

});

it('interpolate(a, b) interpolates arrays if b is an array', function (test) {
  expect(interpolate.interpolate(['red'], ['blue'])(0.5)).toBeDeepEqual( ['rgb(128, 0, 128)']);

});

it('interpolate(a, b) interpolates arrays if b is an array, even if b is coercible to a number', function (test) {
  expect(interpolate.interpolate([1], [2])(0.5)).toBeDeepEqual( [1.5]);

});

it('interpolate(a, b) interpolates numbers if b is a number', function (test) {
  expect(interpolate.interpolate(1, 2)(0.5)).toBeStrictEqual( 1.5);
  expect(isNaN(interpolate.interpolate(1, NaN)(0.5)), FFokFF);

});

it('interpolate(a, b) interpolates objects if b is an object that is not coercible to a number', function (test) {
  expect(interpolate.interpolate({ color: 'red' }, { color: 'blue' })(0.5)).toBeDeepEqual( { color: 'rgb(128, 0, 128)' });

});

it('interpolate(a, b) interpolates numbers if b is an object that is coercible to a number', function (test) {
  expect(interpolate.interpolate(1, new Number(2))(0.5)).toBeStrictEqual( 1.5);
  expect(interpolate.interpolate(1, new String('2'))(0.5)).toBeStrictEqual( 1.5);

});

it('interpolate(a, b) interpolates dates if b is a date', function (test) {
  let i = interpolate.interpolate(new Date(2000, 0, 1), new Date(2000, 0, 2)),
      d = i(0.5);
  expect(d instanceof Date).toBeEqual( true);
  expect(+i(0.5)).toBeStrictEqual( +new Date(2000, 0, 1, 12));

});

it('interpolate(a, b) returns the constant b if b is null, undefined or a boolean', function (test) {
  expect(interpolate.interpolate(0, null)(0.5)).toBeStrictEqual( null);
  expect(interpolate.interpolate(0, undefined)(0.5)).toBeStrictEqual( undefined);
  expect(interpolate.interpolate(0, true)(0.5)).toBeStrictEqual( true);
  expect(interpolate.interpolate(0, false)(0.5)).toBeStrictEqual( false);

});

it('interpolate(a, b) interpolates objects without prototype', function (test) {
  expect(interpolate.interpolate(noproto({ foo: 0 }), noproto({ foo: 2 }))(0.5)).toBeDeepEqual( { foo: 1 });

});

it('interpolate(a, b) interpolates objects with numeric valueOf as numbers', function (test) {
  let proto = { valueOf: foo };
  expect(interpolate.interpolate(noproto({ foo: 0 }, proto), noproto({ foo: 2 }, proto))(0.5)).toBeDeepEqual( 1);

});

it('interpolate(a, b) interpolates objects with string valueOf as numbers if valueOf result is coercible to number', function (test) {
  let proto = { valueOf: fooString };
  expect(interpolate.interpolate(noproto({ foo: 0 }, proto), noproto({ foo: 2 }, proto))(0.5)).toBeDeepEqual( 1);

});

// valueOf appears here as object because:
// - we use for-in loop and it will ignore only fields coming from built-in prototypes;
// - we replace functions with objects.
it('interpolate(a, b) interpolates objects with string valueOf as objects if valueOf result is not coercible to number', function (test) {
  let proto = { valueOf: fooString };
  expect(interpolate.interpolate(noproto({ foo: 'bar' }, proto), noproto({ foo: 'baz' }, proto))(0.5)).toBeDeepEqual( {
    foo: 'baz',
    valueOf: {} });


});

it('interpolate(a, b) interpolates objects with toString as numbers if toString result is coercible to number', function (test) {
  let proto = { toString: fooString };
  expect(interpolate.interpolate(noproto({ foo: 0 }, proto), noproto({ foo: 2 }, proto))(0.5)).toBeDeepEqual( 1);

});

// toString appears here as object because:
// - we use for-in loop and it will ignore only fields coming from built-in prototypes;
// - we replace functions with objects.
it('interpolate(a, b) interpolates objects with toString as objects if toString result is not coercible to number', function (test) {
  let proto = { toString: fooString };
  expect(interpolate.interpolate(noproto({ foo: 'bar' }, proto), noproto({ foo: 'baz' }, proto))(0.5)).toBeDeepEqual( {
    foo: 'baz',
    toString: {} });


});

function noproto(properties, proto = null) {
  return Object.assign(Object.create(proto), properties);
}

function foo() {
  return this.foo;
}

function fooString() {
  return String(this.foo);
}
