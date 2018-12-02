"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Quad = /** @class */ (function () {
    function Quad(_point0, _point1, _point2, _point3) {
        this._point0 = _point0;
        this._point1 = _point1;
        this._point2 = _point2;
        this._point3 = _point3;
    }
    Object.defineProperty(Quad.prototype, "point0", {
        get: function () {
            return this._point0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quad.prototype, "point1", {
        get: function () {
            return this._point1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quad.prototype, "point2", {
        get: function () {
            return this._point2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quad.prototype, "point3", {
        get: function () {
            return this._point3;
        },
        enumerable: true,
        configurable: true
    });
    Quad.prototype.copyFrom = function (other) {
        this._point0.setFrom(other._point0);
        this._point1.setFrom(other._point1);
        this._point2.setFrom(other._point2);
        this._point3.setFrom(other._point3);
        return this;
    };
    Quad.prototype.copyNormalInto = function (normal) {
        var v0 = this._point0.clone().sub(this._point1);
        normal
            .setFrom(this._point2)
            .sub(this._point1)
            .cross(v0)
            .normalize();
    };
    /// Copies the two triangles that define [this].
    Quad.prototype.copyTriangles = function (triangle0, triangle1) {
        triangle0._point0.setFrom(this._point0);
        triangle0._point1.setFrom(this._point1);
        triangle0._point2.setFrom(this._point2);
        triangle1._point0.setFrom(this._point0);
        triangle1._point1.setFrom(this._point3);
        triangle1._point2.setFrom(this._point2);
    };
    /// Transform [this] by the transform [t].
    Quad.prototype.transform = function (t) {
        t.transform3(this._point0);
        t.transform3(this._point1);
        t.transform3(this._point2);
        t.transform3(this._point3);
        return this;
    };
    /// Translate [this] by [offset].
    Quad.prototype.translate = function (offset) {
        this._point0.add(offset);
        this._point1.add(offset);
        this._point2.add(offset);
        this._point3.add(offset);
        return this;
    };
    Quad.copy = function (other) {
        return new Quad(other._point0, other._point1, other._point2, other._point3);
    };
    Quad.points = function (point0, point1, point2, point3) {
        return new Quad(point0.clone(), point1.clone(), point2.clone(), point3.clone());
    };
    return Quad;
}());
exports.Quad = Quad;
//# sourceMappingURL=quad.js.map