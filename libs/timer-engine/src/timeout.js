"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var timer_1 = require("./timer");
function zTimeout(callback, delay, time) {
    var t = new timer_1.Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(function (elapsed) {
        t.stop();
        callback(elapsed + delay);
    }, delay, time);
    return t;
}
exports.zTimeout = zTimeout;
//# sourceMappingURL=timeout.js.map