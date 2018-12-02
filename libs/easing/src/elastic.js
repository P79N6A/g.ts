"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Tau = 2 * Math.PI, Amplitude = 1, Period = 0.3;
/**
 * @private
 */
var ElasticIn = /** @class */ (function () {
    function ElasticIn(amplitude, period) {
        if (amplitude === void 0) { amplitude = Amplitude; }
        if (period === void 0) { period = Period; }
        this.amplitude = amplitude;
        this.period = period;
        this._p3 = Math.asin(1 / (amplitude = Math.max(1, amplitude))) * (period /= Tau);
    }
    ElasticIn.prototype.getRatio = function (p) {
        return -(this.amplitude * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * Tau / this.period));
    };
    ElasticIn.create = function (amplitude, period) {
        return new ElasticIn(amplitude, period);
    };
    return ElasticIn;
}());
exports.ElasticIn = ElasticIn;
/**
 * @private
 */
var ElasticOut = /** @class */ (function () {
    function ElasticOut(amplitude, period) {
        if (amplitude === void 0) { amplitude = Amplitude; }
        if (period === void 0) { period = Period; }
        this.amplitude = amplitude;
        this.period = period;
        this._p3 = Math.asin(1 / (amplitude = Math.max(1, amplitude))) * (period /= Tau);
    }
    ElasticOut.prototype.getRatio = function (p) {
        return this.amplitude * Math.pow(2, -10 * p) * Math.sin((p - this._p3) * Tau / this.period) + 1;
    };
    ElasticOut.create = function (amplitude, period) {
        return new ElasticOut(amplitude, period);
    };
    return ElasticOut;
}());
exports.ElasticOut = ElasticOut;
/**
 * @private
 */
var ElasticInOut = /** @class */ (function () {
    function ElasticInOut(amplitude, period) {
        if (amplitude === void 0) { amplitude = Amplitude; }
        if (period === void 0) { period = Period; }
        this.amplitude = amplitude;
        this.period = period;
        this._p3 = Math.asin(1 / (amplitude = Math.max(1, amplitude))) * (period /= Tau);
    }
    ElasticInOut.prototype.getRatio = function (p) {
        if ((p *= 2) < 1) {
            return -(this.amplitude * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * Tau / this.period)) / 2;
        }
        else {
            return (this.amplitude * Math.pow(2, -10 * (p -= 1)) * Math.sin((p - this._p3) * Tau / this.period) + 2) / 2;
        }
    };
    ElasticInOut.create = function (amplitude, period) {
        return new ElasticInOut(amplitude, period);
    };
    return ElasticInOut;
}());
exports.ElasticInOut = ElasticInOut;
var EasingElastic = /** @class */ (function () {
    function EasingElastic() {
    }
    EasingElastic.easingIn = new ElasticIn();
    EasingElastic.easingOut = new ElasticOut();
    EasingElastic.easingInOut = new ElasticInOut();
    return EasingElastic;
}());
exports.EasingElastic = EasingElastic;
//# sourceMappingURL=elastic.js.map