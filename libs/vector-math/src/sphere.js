"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sphere = /** @class */ (function () {
    function Sphere() {
    }
    Object.defineProperty(Sphere.prototype, "center", {
        get: function () {
            return this._center;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sphere.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
        },
        enumerable: true,
        configurable: true
    });
    Sphere.prototype.copyFrom = function (other) {
        this._center = other._center;
        this._radius = other._radius;
        return this;
    };
    Sphere.prototype.containsVector3 = function (other) {
        return other.distanceToSquared(this._center) < this._radius * this._radius;
    };
    Sphere.prototype.intersectsWithVector3 = function (other) {
        return other.distanceToSquared(this._center) <= this._radius * this._radius;
    };
    Sphere.prototype.intersectsWithSphere = function (other) {
        var radiusSum = this._radius + other._radius;
        return other._center.distanceToSquared(this._center) <= (radiusSum * radiusSum);
    };
    return Sphere;
}());
exports.Sphere = Sphere;
//# sourceMappingURL=sphere.js.map