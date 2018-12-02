"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var public_api_1 = require("../public-api");
var test_helper_1 = require("./test-helper");
function noproto(properties) {
    return Object.assign(Object.create(null), properties);
}
describe('test interpolate object', function () {
    it('interpolateObject(a, b) interpolates defined properties in a and b', function () {
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ a: 2, b: 12 }, { a: 4, b: 24 })(0.5), { a: 3, b: 18 });
    });
    it('interpolateObject(a, b) interpolates inherited properties in a and b', function () {
        function a(a) { this.a = a; } // tslint:disable-line
        a.prototype.b = 12;
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject(new a(2), { a: 4, b: 12 })(0.5), { a: 3, b: 12 });
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ a: 2, b: 12 }, new a(4))(0.5), { a: 3, b: 12 });
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject(new a(4), new a(2))(0.5), { a: 3, b: 12 });
    });
    it('interpolateObject(a, b) interpolates color properties as rgb', function () {
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ background: 'red' }, { background: 'green' })(0.5), { background: 'rgb(128, 64, 0)' });
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ fill: 'red' }, { fill: 'green' })(0.5), { fill: 'rgb(128, 64, 0)' });
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ stroke: 'red' }, { stroke: 'green' })(0.5), { stroke: 'rgb(128, 64, 0)' });
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ color: 'red' }, { color: 'green' })(0.5), { color: 'rgb(128, 64, 0)' });
    });
    it('interpolateObject(a, b) interpolates nested objects and arrays', function () {
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ foo: [2, 12] }, { foo: [4, 24] })(0.5), { foo: [3, 18] });
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ foo: { bar: [2, 12] } }, { foo: { bar: [4, 24] } })(0.5), { foo: { bar: [3, 18] } });
    });
    it('interpolateObject(a, b) ignores properties in a that are not in b', function () {
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ foo: 2, bar: 12 }, { foo: 4 })(0.5), { foo: 3 });
    });
    it('interpolateObject(a, b) uses constant properties in b that are not in a', function () {
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ foo: 2 }, { foo: 4, bar: 12 })(0.5), { foo: 3, bar: 12 });
    });
    it('interpolateObject(a, b) treats undefined as an empty object', function () {
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject(NaN, { foo: 2 })(0.5), { foo: 2 });
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ foo: 2 }, undefined)(0.5), {});
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject(undefined, { foo: 2 })(0.5), { foo: 2 });
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject({ foo: 2 }, null)(0.5), {});
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject(null, { foo: 2 })(0.5), { foo: 2 });
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject(null, NaN)(0.5), {});
    });
    it('interpolateObject(a, b) interpolates objects without prototype', function () {
        test_helper_1.expectObjectEqual(public_api_1.interpolateObject(noproto({ foo: 0 }), noproto({ foo: 2 }))(0.5), { foo: 1 });
    });
});
//# sourceMappingURL=object.spec.js.map