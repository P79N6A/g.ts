"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
exports.__esModule = true;
var $ = require('jquery');
var canvas_1 = require("../../src/canvas/canvas");
var Simulate = require('event-simulate');
$('<div id="c1"></div>').appendTo('body');
describe('Canvas 容器操作', function () {
    it('new canvas', function () {
        var canvas = new canvas_1.Canvas({
            containerId: 'c1',
            width: 500,
            height: 500,
        });
        expect(canvas).toEqual(jasmine.any(canvas_1.Canvas));
        canvas.destroy();
    });
    it('changesize', function () {
        var canvas = new canvas_1.Canvas({
            containerId: 'c1',
            width: 500,
            height: 500,
        });
        canvas.changeSize(200, 200);
        expect(canvas.get('widthStyle')).toBe('200px');
        expect(canvas.get('heightStyle')).toBe('200px');
        canvas.destroy();
    });
    it('clear canvas', function () {
        var canvas = new canvas_1.Canvas({
            containerId: 'c1',
            width: 500,
            height: 500,
        });
        canvas.clear();
        expect(typeof canvas.get('children')).toBe('array').toBeDefined();
        canvas.destroy();
    });
});
describe('拓展图形 标记 Marker', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'c1',
        width: 500,
        height: 500,
    });
    it('diamond', function () {
        canvas.addShape('Marker', {
            attrs: {
                symbol: 'diamond',
                stroke: 'red',
                x: 10,
                y: 20,
                r: 10,
            },
        });
        canvas.draw();
    });
    it('circle', function () {
        canvas.addShape('Marker', {
            attrs: {
                symbol: 'circle',
                stroke: 'red',
                x: 30,
                y: 20,
                r: 10,
            },
        });
        canvas.draw();
    });
    it('square', function () {
        canvas.addShape('Marker', {
            attrs: {
                symbol: 'square',
                stroke: 'red',
                x: 50,
                y: 20,
                r: 10,
            },
        });
        canvas.draw();
    });
    it('triangle', function () {
        canvas.addShape('Marker', {
            attrs: {
                symbol: 'triangle',
                stroke: 'red',
                x: 70,
                y: 20,
                r: 10,
            },
        });
        canvas.draw();
    });
    it('triangle-down', function () {
        canvas.addShape('Marker', {
            attrs: {
                symbol: 'triangle-down',
                stroke: 'red',
                x: 90,
                y: 20,
                r: 10,
            },
        });
        canvas.draw();
    });
    it('custom', function () {
        canvas.addShape('Marker', {
            attrs: {
                symbol: function (x, y, r) {
                    return [
                        ['M', x - r, y],
                        ['L', x, y - r * 4],
                        ['L', x + r, y],
                        ['L', x, y + r],
                        ['z'],
                    ];
                },
                stroke: 'red',
                x: 90,
                y: 20,
                r: 10,
            },
        });
        canvas.draw();
        canvas.destroy();
    });
});
describe('组拓展方法', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'c1',
        width: 500,
        height: 500,
    });
    var circle = new Circle({
        attrs: {
            x: 10,
            y: 332,
            r: 30,
            fill: '#231',
        },
    });
    describe('查找元素', function () {
        it('通过方法查找元素 findAllBy', function () {
            var group = canvas.addGroup();
            var group1 = group.addGroup();
            var rect = group1.addShape('rect', {
                cls: 'heh',
                attrs: {
                    x: 0,
                    y: 0,
                    width: 21,
                    height: 33,
                    stroke: '#ff00ff',
                },
            });
            var rst = group.findAllBy(function (item) {
                if (item.get('cls') === 'heh') {
                    return true;
                }
                return false;
            });
            expect(rect === rst[0]).toBe(true);
        });
    });
    describe('判断是否是子元素', function () {
        it('非子元素', function () {
            expect(canvas.contain(circle)).toBe(false);
        });
        it('非元素', function () {
            expect(canvas.contain(12)).toBe(false);
        });
        canvas.draw();
    });
    describe('查找子元素', function () {
        var children = canvas.get('children');
        it('第N个子元素', function () {
            expect(canvas.getChildByIndex(2)).toEqual(children[2]);
            canvas.destroy();
        });
        canvas.draw();
    });
});
describe('元素拓展方法', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'c1',
        width: 500,
        height: 500,
    });
    canvas.addShape('Circle', {
        attrs: {
            x: 100,
            y: 100,
            r: 5,
            fill: 'red',
        },
    });
    it('测试BBox方法', function () {
        var rect = canvas.addShape('Rect', {
            attrs: {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                fill: '#FED23C',
                lineWidth: 0,
            },
        });
        var bbox = rect.getBBox();
        expect(bbox.x).toBe(0);
        expect(bbox.y).toBe(0);
        expect(bbox.width).toBe(100);
        expect(bbox.height).toBe(100);
    });
    it('测试BBox方法－无bbox', function () {
        var text = canvas.addShape('Text', {
            attrs: {
                x: 0,
                y: 0,
                text: '',
            },
        });
        var bbox = text.getBBox();
        expect(bbox.x).toBe(0);
        expect(bbox.y).toBe(0);
        expect(bbox.width).toBe(0);
        expect(bbox.height).toBe(0);
    });
    it('属性旋转', function () {
        var rect = canvas.addShape('Rect', {
            attrs: {
                x: 300,
                y: 10,
                width: 20,
                height: 20,
                rotate: 45 / 180 * Math.PI,
                fill: '#FED23C',
            },
        });
        canvas.draw();
        expect(rect.attr('rotate')).toBe(45 / 180 * Math.PI);
        canvas.destroy();
    });
});
describe('canvas 事件', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'c1',
        width: 500,
        height: 500,
    });
    canvas.addShape('Circle', {
        attrs: {
            x: 100,
            y: 100,
            r: 100,
            fill: 'red',
        },
    });
    canvas.addShape('rect', {
        attrs: {
            x: 250,
            y: 250,
            width: 50,
            height: 50,
            fill: 'black',
        },
    });
    canvas.draw();
    it('canvas.on(\'mousedown\')', function () {
        var canvasDOM = canvas.get('el');
        var target;
        canvas.on('mousedown', function (ev) {
            target = ev.target;
        });
        Simulate.simulate(canvasDOM, 'mousedown', {
            clientX: 154,
            clientY: 276,
        });
        expect(target).not.toBeUndefined();
    });
});
