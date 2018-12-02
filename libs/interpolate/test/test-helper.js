"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function expectObjectEqual(obj1, obj2) {
    var k1 = Object.keys(obj1).sort();
    var k2 = Object.keys(obj2).sort();
    expect(k1).toEqual(k2);
    for (var _i = 0, k2_1 = k2; _i < k2_1.length; _i++) {
        var k = k2_1[_i];
        var type = typeof Reflect.get(k2, k);
        if (type === 'string') {
            expect("" + Reflect.get(k1, k)).toBe(Reflect.get(k2, k));
        }
        else if (type === 'number') {
            expect(+Reflect.get(k1, k)).toBe(Reflect.get(k2, k));
        }
        else {
            expect(Reflect.get(k1, k)).toEqual(Reflect.get(k2, k));
        }
    }
}
exports.expectObjectEqual = expectObjectEqual;
//# sourceMappingURL=test-helper.js.map