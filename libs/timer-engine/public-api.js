"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-timer)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var timer_1 = require("./src/timer");
exports.now = timer_1.now;
exports.timer = timer_1.timer;
exports.timerFlush = timer_1.timerFlush;
var timeout_1 = require("./src/timeout");
exports.timeout = timeout_1.zTimeout;
var interval_1 = require("./src/interval");
exports.interval = interval_1.zInterval;
//# sourceMappingURL=public-api.js.map