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
function zInterval(callback, delay, time) {
    var t = new timer_1.Timer, total = delay;
    if (delay == null) {
        return t.restart(callback, delay, time), t;
    }
    delay = +delay, time = time == null ? timer_1.now() : +time;
    t.restart(function tick(elapsed) {
        elapsed += total;
        t.restart(tick, total += delay, time);
        callback(elapsed);
    }, delay, time);
    return t;
}
exports.zInterval = zInterval;
//# sourceMappingURL=interval.js.map