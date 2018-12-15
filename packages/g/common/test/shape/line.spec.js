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
div.id = 'canvas-line';
document.body.appendChild(div);
describe('Line', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'canvas-line',
        width: 200,
        height: 200,
        pixelRatio: 1
    });
    var line = new Line({
        attrs: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0
        }
    });
    it('init attrs', function () {
        expect(line.attr('x1')).toBe(0);
        expect(line.attr('y1')).toBe(0);
        expect(line.attr('x2')).toBe(0);
        expect(line.attr('y2')).toBe(0);
        expect(line.attr('lineWidth')).toBe(1);
        expect(line.attr('stroke')).toBeUndefined();
        expect(line.attr('fill')).toBeUndefined();
        expect(line.attr('startArrow')).toBe(false);
        expect(line.attr('endArrow')).toBe(false);
        var box = line.getBBox();
        expect(box.minX).toBe(-0.5);
        expect(box.maxX).toBe(0.5);
        expect(box.minY).toBe(-0.5);
        expect(box.maxY).toBe(0.5);
    });
    it('x1', function () {
        line.attr('x1', 10);
        expect(line.attr('x1')).toBe(10);
        var box = line.getBBox();
        expect(box.minX).toBe(-0.5);
        expect(box.maxX).toBe(10.5);
    });
    it('y1', function () {
        line.attr('y1', 15);
        expect(line.attr('y1')).toBe(15);
        var box = line.getBBox();
        expect(box.minY).toBe(-0.5);
        expect(box.maxY).toBe(15.5);
    });
    it('x2', function () {
        line.attr('x2', 59);
        expect(line.attr('x2')).toBe(59);
        var box = line.getBBox();
        expect(box.minX).toBe(9.5);
        expect(box.maxX).toBe(59.5);
    });
    it('y2', function () {
        line.attr('y2', 80);
        expect(line.attr('y2')).toBe(80);
        var box = line.getBBox();
        expect(box.minY).toBe(14.5);
        expect(box.maxY).toBe(80.5);
    });
    it('lineWidth', function () {
        expect(line.attr('lineWidth')).toBe(1);
        line.attr('lineWidth', 2);
        expect(line.attr('lineWidth')).toBe(2);
        var box = line.getBBox();
        expect(box.minX).toBe(9);
        expect(box.maxX).toBe(60);
        expect(box.minY).toBe(14);
        expect(box.maxY).toBe(81);
    });
    it('stroke', function () {
        line.attr('stroke', 'l (0) 0.1:#0fedae 1:#6542da');
        expect(line.attr('stroke')).toBe('l (0) 0.1:#0fedae 1:#6542da');
        canvas.add(line);
        canvas.draw();
    });
    it('isHit', function () {
        expect(line.isHit(9, 14)).toBe(true);
        expect(line.isHit(34.5, 47.5)).toBe(true);
        expect(line.isHit(8, 11)).toBe(false);
        var line1 = new Line({
            attrs: {
                x1: 0,
                y1: 0,
                x2: 100,
                y2: 100
            }
        });
        expect(line1.isHit(101, 101)).toBe(false);
        expect(line1.isHit(100, 100)).toBe(false);
        line1.attr('stroke', 'red');
        expect(line1.isHit(101, 101)).toBe(false);
        expect(line1.isHit(100, 100)).toBe(true);
    });
    it('arrow', function () {
        line.attr({
            startArrow: true,
            endArrow: new Marker({
                attrs: {
                    symbol: 'triangle'
                }
            })
        });
        canvas.addShape('line', {
            attrs: {
                startArrow: new Marker({
                    attrs: {
                        symbol: 'triangle'
                    }
                }),
                endArrow: new Marker({
                    attrs: {
                        symbol: 'triangle'
                    }
                }),
                arrowLength: 15,
                x1: 80,
                y1: 80,
                x2: 150,
                y2: 60,
                stroke: 'l (0) 0.1:#0fedae 1:#6542da',
                lineWidth: 8
            }
        });
        canvas.addShape('line', {
            attrs: {
                startArrow: new Marker({
                    attrs: {
                        symbol: 'circle'
                    }
                }),
                endArrow: new Marker({
                    attrs: {
                        symbol: 'square'
                    }
                }),
                arrowLength: 15,
                x1: 180,
                y1: 60,
                x2: 180,
                y2: 150,
                stroke: '#000',
                lineWidth: 2
            }
        });
        canvas.addShape('line', {
            attrs: {
                startArrow: new Marker({
                    attrs: {
                        symbol: 'triangle'
                    }
                }),
                endArrow: true,
                arrowLength: 15,
                x1: 30,
                y1: 30,
                x2: 180,
                y2: 30,
                stroke: '#000',
                lineWidth: 2
            }
        });
        canvas.draw();
    });
    it('getPoint', function () {
        var line = new Line({
            attrs: {
                x1: 0,
                y1: 0,
                x2: 200,
                y2: 300
            }
        });
        var point = line.getPoint(0.5);
        expect(point.x).toBe(100);
        expect(point.y).toBe(150);
    });
});
