"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ɵ0 = function (f) { setTimeout(f, 17); };
exports.ɵ0 = ɵ0;
var frame = 0, // is an animation frame pending?
timeout = 0, // is a timeout pending?
interval = 0, // are any timers active?
pokeDelay = 1000, // how frequently we check for clock skew
taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === 'object' && performance.now ? performance : Date, setFrame = typeof window === 'object' && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : ɵ0;
function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
exports.now = now;
function clearNow() {
    clockNow = 0;
}
function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
}
exports.timer = timer;
function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
        if ((e = clockNow - t._time) >= 0) {
            t._call.call(null, e);
        }
        t = t._next;
    }
    --frame;
}
exports.timerFlush = timerFlush;
var Timer = /** @class */ (function () {
    function Timer() {
        this._call = null;
        this._time = null;
        this._next = null;
    }
    Timer.prototype.wake = function () {
        clockNow = (clockLast = clock.now()) + clockSkew;
        frame = timeout = 0;
        try {
            timerFlush();
        }
        finally {
            frame = 0;
            this.nap();
            clockNow = 0;
        }
    };
    Timer.prototype.poke = function () {
        var now = clock.now(), delay = now - clockLast;
        if (delay > pokeDelay) {
            clockSkew -= delay, clockLast = now;
        }
    };
    Timer.prototype.nap = function () {
        var t0, t1 = taskHead, t2, time = Infinity;
        while (t1) {
            if (t1._call) {
                if (time > t1._time) {
                    time = t1._time;
                }
                t0 = t1, t1 = t1._next;
            }
            else {
                t2 = t1._next, t1._next = null;
                t1 = t0 ? t0._next = t2 : taskHead = t2;
            }
        }
        taskTail = t0;
        this.sleep(time);
    };
    Timer.prototype.sleep = function (time) {
        if (frame) {
            return;
        } // Soonest alarm already set, or will be.
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
        if (delay > 24) {
            if (time < Infinity) {
                timeout = +setTimeout(this.wake.bind(this), time - clock.now() - clockSkew);
            }
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }
        else {
            if (!interval) {
                clockLast = clock.now(), interval = +setInterval(this.poke.bind(this), pokeDelay);
            }
            frame = 1, setFrame(this.wake);
        }
    };
    Timer.prototype.restart = function (callback, delay, time) {
        if (typeof callback !== 'function') {
            throw new TypeError('callback is not a function');
        }
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
            if (taskTail) {
                taskTail._next = this;
            }
            else {
                taskHead = this;
            }
            taskTail = this;
        }
        this._call = callback;
        this._time = time;
        this.sleep();
    };
    Timer.prototype.stop = function () {
        if (this._call) {
            this._call = null;
            this._time = Infinity;
            this.sleep();
        }
    };
    return Timer;
}());
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map