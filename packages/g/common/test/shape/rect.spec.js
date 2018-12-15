"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
exports.__esModule = true;
var canvas_1 = require("../../../src/canvas/canvas");
var div = document.createElement('div');
div.id = 'canvas-rect';
document.body.appendChild(div);
describe('Rect', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'canvas-rect',
        width: 200,
        height: 200,
        pixelRatio: 1
    });
    var rect = new Rect({
        attrs: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    });
    it('init attrs', function () {
        expect(rect.attr('x')).toBe(0);
        expect(rect.attr('y')).toBe(0);
        expect(rect.attr('width')).toBe(0);
        expect(rect.attr('height')).toBe(0);
        expect(rect.attr('radius')).toBe(0);
        expect(rect.attr('lineWidth')).toBe(1);
        expect(rect.attr('stroke')).toBeUndefined();
        expect(rect.attr('fill')).toBeUndefined();
        var box = rect.getBBox();
        expect(box.minX).toBe(-0.5);
        expect(box.minY).toBe(-0.5);
        expect(box.maxX).toBe(0.5);
        expect(box.maxY).toBe(0.5);
    });
    it('width', function () {
        expect(rect.attr('width')).toBe(0);
        rect.attr('width', 10);
        expect(rect.attr('width')).toBe(10);
        var box = rect.getBBox();
        expect(box.minX).toBe(-0.5);
        expect(box.maxX).toBe(10.5);
        var rect1 = new Rect({
            attrs: {
                x: 0,
                y: 0,
                height: 1,
                width: 15
            }
        });
        expect(rect1.attr('width')).toBe(15);
        box = rect1.getBBox();
        expect(box.minX).toBe(-0.5);
        expect(box.maxX).toBe(15.5);
        var rect2 = new Rect({
            attrs: {
                x: 10,
                y: 0,
                width: 15,
                height: 1
            }
        });
        expect(rect2.attr('width')).toBe(15);
        box = rect2.getBBox();
        expect(box.minX).toBe(9.5);
        expect(box.maxX).toBe(25.5);
    });
    it('height', function () {
        expect(rect.attr('height')).toBe(0);
        rect.attr('height', 20);
        expect(rect.attr('height')).toBe(20);
        var box = rect.getBBox();
        expect(box.minY).toBe(-0.5);
        expect(box.maxY).toBe(20.5);
        var rect1 = new Rect({
            attrs: {
                x: 0,
                y: 0,
                height: 25,
                width: 1
            }
        });
        expect(rect1.attr('height')).toBe(25);
        box = rect1.getBBox();
        expect(box.minY).toBe(-0.5);
        expect(box.maxY).toBe(25.5);
        var rect2 = new Rect({
            attrs: {
                x: 0,
                y: 10,
                height: 25,
                width: 1
            }
        });
        expect(rect2.attr('height')).toBe(25);
        box = rect2.getBBox();
        expect(box.minY).toBe(9.5);
        expect(box.maxY).toBe(35.5);
    });
    it('x', function () {
        rect.attr('x', 10);
        expect(rect.attr('x')).toBe(10);
        var box = rect.getBBox();
        expect(box.minX).toBe(9.5);
        expect(box.maxX).toBe(20.5);
        var rect1 = new Rect({
            attrs: {
                x: 10,
                y: 0,
                width: 0,
                height: 0
            }
        });
        expect(rect1.attr('x')).toBe(10);
        box = rect1.getBBox();
        expect(box.minX).toBe(9.5);
        expect(box.maxX).toBe(10.5);
        var rect2 = new Rect({
            attrs: {
                x: 20,
                y: 0,
                width: 15,
                height: 0
            }
        });
        expect(rect2.attr('x')).toBe(20);
        box = rect2.getBBox();
        expect(box.minX).toBe(19.5);
        expect(box.maxX).toBe(35.5);
    });
    it('y', function () {
        rect.attr('y', 20);
        expect(rect.attr('y')).toBe(20);
        var box = rect.getBBox();
        expect(box.minY).toBe(19.5);
        expect(box.maxY).toBe(40.5);
        var rect1 = new Rect({
            attrs: {
                x: 0,
                y: 12,
                height: 0,
                width: 0
            }
        });
        expect(rect1.attr('y')).toBe(12);
        box = rect1.getBBox();
        expect(box.minY).toBe(11.5);
        expect(box.maxY).toBe(12.5);
        var rect2 = new Rect({
            attrs: {
                x: 0,
                y: 12,
                height: 20,
                width: 0
            }
        });
        expect(rect2.attr('y')).toBe(12);
        box = rect2.getBBox();
        expect(box.minY).toBe(11.5);
        expect(box.maxY).toBe(32.5);
    });
    it('lineWidth', function () {
        expect(rect.attr('lineWidth')).toBe(1);
        rect.attr('lineWidth', 2);
        expect(rect.attr('lineWidth')).toBe(2);
        var box = rect.getBBox();
        expect(box.minY).toBe(19);
        expect(box.minX).toBe(9);
        expect(box.maxX).toBe(21);
        expect(box.maxY).toBe(41);
        var rect1 = new Rect({
            attrs: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                lineWidth: 2
            }
        });
        expect(rect1.attr('lineWidth')).toBe(2);
        box = rect1.getBBox();
        expect(box.minY).toBe(-1);
        expect(box.minX).toBe(-1);
        expect(box.maxX).toBe(1);
        expect(box.maxY).toBe(1);
        var rect2 = new Rect({
            attrs: {
                x: 30,
                y: 40,
                width: 200,
                height: 100,
                lineWidth: 2
            }
        });
        expect(rect2.attr('lineWidth')).toBe(2);
        box = rect2.getBBox();
        expect(box.minX).toBe(29);
        expect(box.minY).toBe(39);
        expect(box.maxX).toBe(231);
        expect(box.maxY).toBe(141);
    });
    it('radius', function () {
        expect(rect.attr('radius')).toBe(0);
        rect.attr('radius', 3);
        expect(rect.attr('radius')).toBe(3);
    });
    it('stroke', function () {
        rect.attr('stroke', 'l (0) 0:#ff00ff 1:#00ff00');
        expect(rect.attr('stroke')).toBe('l (0) 0:#ff00ff 1:#00ff00');
        canvas.add(rect);
        canvas.draw();
    });
    it('fill', function () {
        rect.attr('fill', 'l (90) 0:#00ffff 1:#ffff00');
        expect(rect.attr('fill')).toBe('l (90) 0:#00ffff 1:#ffff00');
        canvas.draw();
    });
    it('isHit', function () {
        var rect1 = new Rect({
            attrs: {
                x: 40,
                y: 40,
                width: 50,
                height: 70
            }
        });
        expect(rect1.isHit(39.5, 39.5)).toBe(false);
        expect(rect1.isHit(40.5, 40.5)).toBe(false);
        expect(rect1.isHit(41, 41)).toBe(false);
        expect(rect1.isHit(70, 39)).toBe(false);
        expect(rect1.isHit(90.5, 110.5)).toBe(false);
        expect(rect1.isHit(43, 43)).toBe(false);
        rect1.attr('stroke', 'red');
        expect(rect1.isHit(39.5, 39.5)).toBe(true);
        expect(rect1.isHit(40.5, 40.5)).toBe(true);
        expect(rect1.isHit(41, 41)).toBe(false);
        expect(rect1.isHit(70, 39)).toBe(false);
        expect(rect1.isHit(70, 39.5)).toBe(true);
        expect(rect1.isHit(90.5, 110.5)).toBe(true);
        expect(rect1.isHit(43, 43)).toBe(false);
        rect1.attr('lineWidth', 2);
        expect(rect1.isHit(70, 39)).toBe(true);
        expect(rect1.isHit(41, 41)).toBe(true);
        rect1.attr('radius', 6);
        expect(rect1.isHit(41, 41)).toBe(false);
        var rect2 = new Rect({
            attrs: {
                x: 50,
                y: 50,
                width: 40,
                height: 50
            }
        });
        expect(rect2.isHit(50, 50)).toBe(false);
        expect(rect2.isHit(49.5, 50)).toBe(false);
        expect(rect2.isHit(50, 51)).toBe(false);
        expect(rect2.isHit(51, 51)).toBe(false);
        expect(rect2.isHit(90, 100)).toBe(false);
        expect(rect2.isHit(89, 99)).toBe(false);
        rect2.attr('fill', 'blue');
        expect(rect2.isHit(50, 50)).toBe(false);
        expect(rect2.isHit(49.5, 50)).toBe(false);
        expect(rect2.isHit(50, 51)).toBe(false);
        expect(rect2.isHit(51, 51)).toBe(false);
        expect(rect2.isHit(90, 100)).toBe(false);
        expect(rect2.isHit(89, 99)).toBe(false);
        canvas.add(rect2);
        expect(rect2.isHit(50, 50)).toBe(true);
        expect(rect2.isHit(49.5, 50)).toBe(false);
        expect(rect2.isHit(50, 51)).toBe(true);
        expect(rect2.isHit(51, 51)).toBe(true);
        expect(rect2.isHit(90, 100)).toBe(true);
        expect(rect2.isHit(89, 99)).toBe(true);
        rect2.attr('radius', 5);
        expect(rect2.isHit(50, 50)).toBe(false);
        expect(rect2.isHit(89, 99)).toBe(false);
        var rect3 = new Rect({
            attrs: {
                x: 20,
                y: 30,
                width: 100,
                height: 120,
                stroke: 'red',
                fill: 'green',
                lineWidth: 4
            }
        });
        canvas.add(rect3);
        expect(rect3.isHit(18, 28)).toBe(true);
        expect(rect3.isHit(50, 70)).toBe(true);
    });
});
