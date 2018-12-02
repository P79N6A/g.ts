"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var color_1 = require("@gradii/color");
var public_api_1 = require("../public-api");
var test_helper_1 = require("./test-helper");
function noproto(properties, proto) {
    if (proto === void 0) { proto = null; }
    return Object.assign(Object.create(proto), properties);
}
function foo() {
    return this.foo;
}
function fooString() {
    return String(this.foo);
}
describe('test interpolate value', function () {
    it('interpolate(a, b) interpolates strings if b is a string and not a color', function () {
        expect(public_api_1.interpolate('foo', 'bar')(0.5)).toEqual('bar');
    });
    it('interpolate(a, b) interpolates strings if b is a string and not a color, even if b is coercible to a number', function () {
        expect(public_api_1.interpolate('1', '2')(0.5).toString()).toBe('1.5');
        expect(public_api_1.interpolate(' 1', ' 2')(0.5).toString()).toBe(' 1.5');
    });
    it('interpolate(a, b) interpolates RGB colors if b is a string and a color', function () {
        expect(public_api_1.interpolate('red', 'blue')(0.5).toString()).toBe('rgb(128, 0, 128)');
        expect(public_api_1.interpolate('#ff0000', '#0000ff')(0.5).toString()).toBe('rgb(128, 0, 128)');
        expect(public_api_1.interpolate('#f00', '#00f')(0.5).toString()).toBe('rgb(128, 0, 128)');
        expect(public_api_1.interpolate('rgb(255, 0, 0)', 'rgb(0, 0, 255)')(0.5).toString()).toBe('rgb(128, 0, 128)');
        expect(public_api_1.interpolate('rgba(255, 0, 0, 1.0)', 'rgba(0, 0, 255, 1.0)')(0.5).toString()).toBe('rgb(128, 0, 128)');
        expect(public_api_1.interpolate('rgb(100%, 0%, 0%)', 'rgb(0%, 0%, 100%)')(0.5).toString()).toBe('rgb(128, 0, 128)');
        expect(public_api_1.interpolate('rgba(100%, 0%, 0%, 1.0)', 'rgba(0%, 0%, 100%, 1.0)')(0.5).toString()).toBe('rgb(128, 0, 128)');
        expect(public_api_1.interpolate('rgba(100%, 0%, 0%, 0.5)', 'rgba(0%, 0%, 100%, 0.7)')(0.5).toString()).toBe('rgba(128, 0, 128, 0.6)');
    });
    it('interpolate(a, b) interpolates RGB colors if b is a color', function () {
        expect(public_api_1.interpolate('red', color_1.Rgb.create('blue'))(0.5).toString()).toBe('rgb(128, 0, 128)');
        expect(public_api_1.interpolate('red', color_1.Hsl.create('blue'))(0.5).toString()).toBe('rgb(128, 0, 128)');
    });
    it('interpolate(a, b) interpolates arrays if b is an array', function () {
        expect(public_api_1.interpolate(['red'], ['blue'])(0.5).map(function (_) { return "" + _; })).toEqual(['rgb(128, 0, 128)']);
    });
    it('interpolate(a, b) interpolates arrays if b is an array, even if b is coercible to a number', function () {
        expect(public_api_1.interpolate([1], [2])(0.5)).toEqual([1.5]);
    });
    it('interpolate(a, b) interpolates numbers if b is a number', function () {
        expect(public_api_1.interpolate(1, 2)(0.5)).toEqual(1.5);
        expect(isNaN(public_api_1.interpolate(1, NaN)(0.5))).toBe(true);
    });
    it('interpolate(a, b) interpolates objects if b is an object that is not coercible to a number', function () {
        test_helper_1.expectObjectEqual(public_api_1.interpolate({ color: 'red' }, { color: 'blue' })(0.5), { color: 'rgb(128, 0, 128)' });
    });
    it('interpolate(a, b) interpolates numbers if b is an object that is coercible to a number', function () {
        expect(public_api_1.interpolate(1, new Number(2))(0.5)).toEqual(1.5); // tslint:disable-line
        expect(public_api_1.interpolate(1, new String('2'))(0.5)).toEqual(1.5); // tslint:disable-line
    });
    it('interpolate(a, b) interpolates dates if b is a date', function () {
        var i = public_api_1.interpolate(new Date(2000, 0, 1), new Date(2000, 0, 2)), d = i(0.5);
        expect(d instanceof Date).toBe(true);
        expect(+i(0.5)).toEqual(+new Date(2000, 0, 1, 12));
    });
    it('interpolate(a, b) returns the constant b if b is null, undefined or a boolean', function () {
        expect(public_api_1.interpolate(0, null)(0.5)).toEqual(null);
        expect(public_api_1.interpolate(0, undefined)(0.5)).toEqual(undefined);
        expect(public_api_1.interpolate(0, true)(0.5)).toEqual(true);
        expect(public_api_1.interpolate(0, false)(0.5)).toEqual(false);
    });
    it('interpolate(a, b) interpolates objects without prototype', function () {
        expect(public_api_1.interpolate(noproto({ foo: 0 }), noproto({ foo: 2 }))(0.5)).toEqual({ foo: 1 });
    });
    it('interpolate(a, b) interpolates objects with numeric valueOf as numbers', function () {
        var proto = { valueOf: foo };
        expect(public_api_1.interpolate(noproto({ foo: 0 }, proto), noproto({ foo: 2 }, proto))(0.5)).toBe(1);
    });
    it('interpolate(a, b) interpolates objects with string valueOf as numbers if valueOf result is coercible to number', function () {
        var proto = { valueOf: fooString };
        expect(public_api_1.interpolate(noproto({ foo: 0 }, proto), noproto({ foo: 2 }, proto))(0.5)).toBe(1);
    });
    // valueOf appears here as object because:
    // - we use for-in loop and it will ignore only fields coming from built-in prototypes;
    // - we replace functions with objects.
    it('interpolate(a, b) interpolates objects with string valueOf as objects if valueOf result is not coercible to number', function () {
        var proto = { valueOf: fooString };
        expect(public_api_1.interpolate(noproto({ foo: 'bar' }, proto), noproto({ foo: 'baz' }, proto))(0.5)).toEqual({
            foo: 'baz',
            valueOf: {}
        });
    });
    it('interpolate(a, b) interpolates objects with toString as numbers if toString result is coercible to number', function () {
        var proto = { toString: fooString };
        expect(public_api_1.interpolate(noproto({ foo: 0 }, proto), noproto({ foo: 2 }, proto))(0.5)).toBe(1);
    });
    // toString appears here as object because:
    // - we use for-in loop and it will ignore only fields coming from built-in prototypes;
    // - we replace functions with objects.
    it('interpolate(a, b) interpolates objects with toString as objects if toString result is not coercible to number', function () {
        var proto = { toString: fooString };
        expect(public_api_1.interpolate(noproto({ foo: 'bar' }, proto), noproto({ foo: 'baz' }, proto))(0.5)).toEqual({
            foo: 'baz',
            toString: {}
        });
    });
});
//# sourceMappingURL=value.spec.js.map