"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix2_1 = require("../src/matrix2");
var matrix3_1 = require("../src/matrix3");
var matrix4_1 = require("../src/matrix4");
var vector2_1 = require("../src/vector2");
var vector3_1 = require("../src/vector3");
var vector4_1 = require("../src/vector4");
var error_helpers_1 = require("./error-helpers");
function $v2(x, y) {
    return new vector2_1.Vector2(x, y);
}
exports.$v2 = $v2;
function $v3(x, y, z) {
    return new vector3_1.Vector3(x, y, z);
}
exports.$v3 = $v3;
function $v4(x, y, z, w) {
    return new vector4_1.Vector4(x, y, z, w);
}
exports.$v4 = $v4;
function relativeTest(output, expectedOutput) {
    var errorThreshold = 0.0005;
    var error = Math.abs(error_helpers_1.relativeError(output, expectedOutput));
    expect(error >= errorThreshold).toBe(false);
}
exports.relativeTest = relativeTest;
function absoluteTest(output, expectedOutput) {
    var errorThreshold = 0.0005;
    var error = Math.abs(error_helpers_1.absoluteError(output, expectedOutput));
    expect(error >= errorThreshold).toBe(false);
}
exports.absoluteTest = absoluteTest;
function makeMatrix(rows, cols) {
    if (rows != cols) {
        return null;
    }
    if (cols == 2) {
        return matrix2_1.Matrix2.zero();
    }
    if (cols == 3) {
        return matrix3_1.Matrix3.zero();
    }
    if (cols == 4) {
        return matrix4_1.Matrix4.zero();
    }
}
exports.makeMatrix = makeMatrix;
function parseMatrix(input) {
    input = input.trim();
    var rows = input.split('\n');
    var values = [];
    var colCount = 0;
    for (var i = 0; i < rows.length; i++) {
        rows[i] = rows[i].trim();
        var cols = rows[i].split(' ');
        for (var j = 0; j < cols.length; j++) {
            cols[j] = cols[j].trim();
        }
        for (var j = 0; j < cols.length; j++) {
            if (/^\s*$/.exec(cols[j]) != null) {
                continue;
            }
            if (i == 0) {
                colCount++;
            }
            values.push(parseFloat(cols[j]));
        }
    }
    var m = makeMatrix(rows.length, colCount);
    for (var j = 0; j < rows.length; j++) {
        for (var i = 0; i < colCount; i++) {
            m.setEntry(j, i, values[j * colCount + i]);
        }
    }
    return m;
}
exports.parseMatrix = parseMatrix;
function parseVector(v) {
    v = v.trim();
    var pattern = new RegExp('[\\s]+', 'mgi');
    var rows = v.split(pattern);
    var values = [];
    for (var i = 0; i < rows.length; i++) {
        rows[i] = rows[i].trim();
        if (/^\s*$/g.exec(rows[i]) != null) {
            continue;
        }
        values.push(parseFloat(rows[i]));
    }
    var r;
    if (values.length == 2) {
        r = new vector2_1.Vector2(values[0], values[1]);
    }
    else if (values.length == 3) {
        r = new vector3_1.Vector3(values[0], values[1], values[2]);
    }
    else if (values.length == 4) {
        r = new vector4_1.Vector4(values[0], values[1], values[2], values[3]);
    }
    return r;
}
exports.parseVector = parseVector;
//# sourceMappingURL=test-utils.js.map