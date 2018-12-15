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
div.id = 'canvas-text';
document.body.appendChild(div);
describe('Text', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'canvas-text',
        width: 200,
        height: 200,
        pixelRatio: 1
    });
    var text = new Text({
        attrs: {
            x: 0,
            y: 0,
            fontFamily: 'Arial'
        }
    });
    it('init attrs', function () {
        expect(text.attr('x')).toBe(0);
        expect(text.attr('y')).toBe(0);
        expect(text.attr('text')).toBeUndefined();
        expect(text.attr('textAlign')).toBe('start');
        expect(text.attr('fontSize')).toBe(12);
        expect(text.attr('fontFamily')).toBe('Arial');
        expect(text.attr('fontStyle')).toBe('normal');
        expect(text.attr('fontWeight')).toBe('normal');
        expect(text.attr('fontVariant')).toBe('normal');
        expect(text.attr('font')).toBe('normal normal normal 12px Arial');
        expect(text.attr('textBaseline')).toBe('bottom');
        expect(text.attr('lineWidth')).toBe(1);
        expect(text.getBBox()).toEqual({ minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });
    });
    xit('text', function () {
        text.attr('text', '你好啊');
        var box = text.getBBox();
        expect(box).not.toBeUndefined();
        expect(box.minX).toBe(-0.5);
        expect(box.minY).toBe(-12.5);
        expect(box.maxX).toBe(36.5);
        expect(box.maxY).toBe(0.5);
        var text1 = new Text({
            attrs: {
                x: 0,
                y: 0,
                text: '你好啊'
            }
        });
        box = text1.getBBox();
        expect(box).not.toBeUndefined();
        expect(box.minX).toBe(-0.5);
        expect(box.minY).toBe(-12.5);
        expect(box.maxX).toBe(36.5);
        expect(box.maxY).toBe(0.5);
    });
    xit('x', function () {
        text.attr('x', 10);
        var box = text.getBBox();
        expect(box.minX).toBe(9.5);
        expect(box.minY).toBe(-12.5);
        expect(box.maxX).toBe(46.5);
        expect(box.maxY).toBe(0.5);
        var text1 = new Text({
            attrs: {
                x: 10,
                y: 0
            }
        });
        expect(text1.attr('x')).toBe(10);
        box = text1.getBBox();
        expect(box).toEqual({ minX: 10,
            minY: 0,
            maxX: 10,
            maxY: 0,
            x: 10,
            y: 0,
            width: 0,
            height: 0
        });
        var text2 = new Text({
            attrs: {
                x: 10,
                y: 0,
                text: '你好啊'
            }
        });
        expect(text2.attr('x')).toBe(10);
        box = text2.getBBox();
        expect(box.minX).toBe(9.5);
        expect(box.minY).toBe(-12.5);
        expect(box.maxX).toBe(46.5);
        expect(box.maxY).toBe(0.5);
    });
    xit('y', function () {
        text.attr('y', 20);
        var box = text.getBBox();
        expect(box.minX).toBe(9.5);
        expect(box.minY).toBe(7.5);
        expect(box.maxX).toBe(46.5);
        expect(box.maxY).toBe(20.5);
        var text1 = new Text({
            attrs: {
                x: 0,
                y: 20
            }
        });
        expect(text1.attr('y')).toBe(20);
        box = text1.getBBox();
        expect(box).toEqual({ minX: 0,
            minY: 20,
            maxX: 0,
            maxY: 20,
            x: 0,
            y: 20,
            width: 0,
            height: 0
        });
        text1.attr({
            x: 0,
            y: 20,
            text: '你好啊'
        });
        expect(text1.attr('y')).toBe(20);
        box = text1.getBBox();
        expect(box.minX).toBe(-0.5);
        expect(box.minY).toBe(7.5);
        expect(box.maxX).toBe(36.5);
        expect(box.maxY).toBe(20.5);
    });
    it('stroke', function () {
        text.attr({
            stroke: 'l (0) 0:#ffff00 1:rgb(0, 255, 255)'
        });
        expect(text.attr('stroke')).toBe('l (0) 0:#ffff00 1:rgb(0, 255, 255)');
        canvas.add(text);
        canvas.draw();
    });
    it('fill', function () {
        var text1 = new Text({
            attrs: {
                x: 50,
                y: 150,
                text: 'fill测试',
                font: '40px Arial',
                fill: 'r (0.5, 0.5, 0) 0:rgb(255, 0, 255) 0.5:#dddddd'
            }
        });
        expect(text1.attr('fill')).toBe('r (0.5, 0.5, 0) 0:rgb(255, 0, 255) 0.5:#dddddd');
        canvas.add(text1);
        canvas.draw();
    });
    it('fontSize', function () {
        expect(text.attr('fontSize')).toBe(12);
        expect(text.attr('font')).toBe('normal normal normal 12px Arial');
        text.attr('fontSize', 20);
        expect(text.attr('fontSize')).toBe(20);
        expect(text.attr('font')).toBe('normal normal normal 20px Arial');
        var text1 = new Text({
            attrs: {
                fontSize: 20,
                text: '你好啊啊',
                x: 20,
                y: 180,
                stroke: '#000'
            }
        });
        expect(text1.attr('fontSize')).toBe(20);
        expect(text1.attr('font')).toBe('normal normal normal 20px sans-serif');
        canvas.add(text1);
        canvas.draw();
    });
    it('fontSize < 12', function () {
        var text = new Text({
            attrs: {
                fontSize: 10,
                text: '你好啊啊',
                x: 100,
                y: 180,
                stroke: '#000'
            }
        });
        expect(text.attr('fontSize')).toBe(10);
        expect(text.attr('font')).toBe('normal normal normal 10px sans-serif');
        expect(text.getMatrix()).not.toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        canvas.add(text);
        canvas.draw();
    });
    it('fontStyle', function () {
        expect(text.attr('fontStyle')).toBe('normal');
        text.attr('fontStyle', 'italic');
        expect(text.attr('fontStyle')).toBe('italic');
        expect(text.attr('font')).toBe('italic normal normal 20px Arial');
        canvas.draw();
        text.attr('fontStyle', 'oblique');
        expect(text.attr('fontStyle')).toBe('oblique');
        expect(text.attr('font')).toBe('oblique normal normal 20px Arial');
        canvas.draw();
    });
    it('fontWeight', function () {
        expect(text.attr('fontWeight')).toBe('normal');
        text.attr('fontWeight', 'bolder');
        expect(text.attr('fontWeight')).toBe('bolder');
        expect(text.attr('font')).toBe('oblique normal bolder 20px Arial');
        canvas.draw();
    });
    it('fontVariant', function () {
        expect(text.attr('fontVariant')).toBe('normal');
        text.attr('fontVariant', 'small-caps');
        expect(text.attr('fontVariant')).toBe('small-caps');
        expect(text.attr('font')).toBe('oblique small-caps bolder 20px Arial');
        canvas.draw();
    });
    it('fontFamily', function () {
        text.attr('fontFamily', '宋体');
        expect(text.attr('fontFamily')).toBe('宋体');
        expect(text.attr('font')).toBe('oblique small-caps bolder 20px 宋体');
        canvas.draw();
    });
    xit('textAlign', function () {
        expect(text.attr('textAlign')).toBe('start');
        text.attr('textAlign', 'right');
        var box = text.getBBox();
        expect(box.minX, -50.5);
        expect(box.maxX, 10.5);
        text.attr('textAlign', 'left');
        box = text.getBBox();
        expect(box.minX, 9.5);
        expect(box.maxX, 70.5);
        text.attr('textAlign', 'end');
        box = text.getBBox();
        expect(box.minX, -50.5);
        expect(box.maxX, 10.5);
        text.attr('textAlign', 'center');
        box = text.getBBox();
        expect(box.minX, -20.5);
        expect(box.maxX, 40.5);
        text.attr('textAlign', 'start');
        box = text.getBBox();
        expect(box.minX, 9.5);
        expect(box.maxX, 70.5);
        var text1 = new Text({
            attrs: {
                x: 0,
                y: 0,
                textAlign: 'center'
            }
        });
        expect(text1.attr('textAlign')).toBe('center');
        expect(text1.getBBox()).toEqual({ minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });
        var text2 = new Text({
            attrs: {
                x: 0,
                y: 0,
                textAlign: 'center',
                text: '你好啊'
            }
        });
        expect(text2.attr('textAlign')).toBe('center');
        box = text2.getBBox();
        expect(box.minX).toBe(-18.5);
        expect(box.maxX).toBe(18.5);
    });
    xit('textBaseline', function () {
        expect(text.attr('textBaseline')).toBe('bottom');
        text.attr('textBaseline', 'top');
        var box = text.getBBox();
        expect(box.minY).toBe(19.5);
        expect(box.maxY).toBe(40.5);
        text.attr('textBaseline', 'middle');
        box = text.getBBox();
        expect(box.minY).toBe(9.5);
        expect(box.maxY).toBe(30.5);
        text.attr('textBaseline', 'bottom');
        box = text.getBBox();
        expect(box.minY).toBe(-0.5);
        expect(box.maxY).toBe(20.5);
        var text1 = new Text({
            attrs: {
                x: 0,
                y: 0,
                textBaseline: 'middle'
            }
        });
        expect(text1.attr('textBaseline')).toBe('middle');
        expect(text1.getBBox()).toEqual({ minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });
        var text2 = new Text({
            attrs: {
                x: 0,
                y: 0,
                textBaseline: 'middle',
                text: '你好啊'
            }
        });
        expect(text2.attr('textBaseline')).toBe('middle');
        box = text2.getBBox();
        expect(box.minY).toBe(-6.5);
        expect(box.maxY).toBe(6.5);
    });
    xit('lineWidth', function () {
        expect(text.attr('lineWidth')).toBe(1);
        text.attr('lineWidth', 4);
        expect(text.attr('lineWidth')).toBe(4);
        var box = text.getBBox();
        expect(box.minX).toBe(8);
        expect(box.maxX).toBe(72);
        expect(box.maxY).toBe(22);
        expect(box.minY).toBe(-2);
    });
    xit('isHit', function () {
        expect(text.isHit(48, 0)).toBe(true);
        expect(text.isHit(48, 24)).toBe(false);
    });
    it('normal use', function () {
        var text = new Text({
            attrs: {
                text: 'hello world',
                x: 50,
                y: 50,
                fill: 'red'
            }
        });
        canvas.add(text);
        canvas.draw();
    });
    it('add text fontFamily', function () {
        var text1 = canvas.addShape('text', {
            attrs: {
                x: 0,
                y: 0,
                text: 'abc'
            }
        });
        expect(text1.attr('fontFamily')).toBe('sans-serif');
        var text2 = canvas.addShape('text', {
            attrs: {
                x: 0,
                y: 0,
                fontFamily: 'Arial',
                text: 'bcd'
            }
        });
        expect(text2.attr('fontFamily')).toBe('Arial');
        canvas.set('fontFamily', '宋体');
        var text3 = canvas.addShape('text', {
            attrs: {
                x: 0,
                y: 0,
                text: 'bde'
            }
        });
        expect(text3.attr('fontFamily')).toBe('宋体');
        canvas.set('fontFamily', null);
        var text4 = canvas.addShape('text', {
            attrs: {
                x: 0,
                y: 0,
                text: 'bde'
            }
        });
        expect(text4.attr('fontFamily')).toBe('sans-serif');
    });
});
describe('Text \n', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'canvas-text',
        width: 200,
        height: 200
    });
    var text = new Text({
        attrs: {
            x: 50,
            y: 50,
            text: '你好\nHello\nworld',
            fill: 'black',
            stroke: 'red',
            textBaseline: 'top'
        }
    });
    var bbox = text.getBBox();
    var rect = new Rect({
        attrs: {
            x: bbox.minX,
            y: bbox.minY,
            width: bbox.maxX - bbox.minX,
            height: bbox.maxY - bbox.minY,
            stroke: 'red'
        }
    });
    it('text outline', function () {
        var text = new Text({
            attrs: {
                x: 100,
                y: 100,
                fontSize: 20,
                text: 'outline',
                fill: 'peachpuff',
                stroke: 'crimson'
            }
        });
        canvas.add(text);
        canvas.draw();
    });
    it('text /n', function () {
        expect(text.attr('x')).toBe(50);
        expect(text.attr('y')).toBe(50);
        expect(text.attr('text')).toBe('你好\nHello\nworld');
        expect(text.attr('textAlign')).toBe('start');
        expect(text.attr('fontSize')).toBe(12);
        expect(text.attr('fill')).toBe('black');
        expect(text.attr('fontFamily')).toBe('sans-serif');
        expect(text.attr('fontStyle')).toBe('normal');
        expect(text.attr('fontWeight')).toBe('normal');
        expect(text.attr('fontVariant')).toBe('normal');
        expect(text.attr('font')).toBe('normal normal normal 12px sans-serif');
        expect(text.attr('textBaseline')).toBe('top');
        expect(text.attr('lineWidth')).toBe(1);
    });
    canvas.add(rect);
    canvas.add(text);
    canvas.draw();
});
describe('Text 不存在', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'canvas-text',
        width: 200,
        height: 200
    });
    var text = new Text({
        attrs: {
            x: 50,
            y: 50,
            text: '',
            fill: 'black',
            stroke: 'red',
            textBaseline: 'top'
        }
    });
    var bbox = text.getBBox();
    var rect = new Rect({
        attrs: {
            x: bbox.minX,
            y: bbox.minY,
            width: bbox.maxX - bbox.minX,
            height: bbox.maxY - bbox.minY,
            stroke: 'red'
        }
    });
    it('text 空 "" ', function () {
        expect(text.attr('x')).toBe(50);
        expect(text.attr('y')).toBe(50);
        expect(text.attr('text')).toBe('');
        expect(text.attr('textAlign')).toBe('start');
        expect(text.attr('fontSize')).toBe(12);
        expect(text.attr('fill')).toBe('black');
        expect(text.attr('fontFamily')).toBe('sans-serif');
        expect(text.attr('fontStyle')).toBe('normal');
        expect(text.attr('fontWeight')).toBe('normal');
        expect(text.attr('fontVariant')).toBe('normal');
        expect(text.attr('font')).toBe('normal normal normal 12px sans-serif');
        expect(text.attr('textBaseline')).toBe('top');
        expect(text.attr('lineWidth')).toBe(1);
        expect(text.getBBox()).toEqual({ minX: 50,
            minY: 50,
            maxX: 50,
            maxY: 50,
            x: 50,
            y: 50,
            width: 0,
            height: 0
        });
    });
    canvas.add(rect);
    canvas.add(text);
    canvas.draw();
    it('text null ', function () {
        text.attr('text', null);
        expect(text.attr('x')).toBe(50);
        expect(text.attr('y')).toBe(50);
        expect(text.attr('text')).toBeNull();
        expect(text.attr('textAlign')).toBe('start');
        expect(text.attr('fontSize')).toBe(12);
        expect(text.attr('fill')).toBe('black');
        expect(text.attr('fontFamily')).toBe('sans-serif');
        expect(text.attr('fontStyle')).toBe('normal');
        expect(text.attr('fontWeight')).toBe('normal');
        expect(text.attr('fontVariant')).toBe('normal');
        expect(text.attr('font')).toBe('normal normal normal 12px sans-serif');
        expect(text.attr('textBaseline')).toBe('top');
        expect(text.attr('lineWidth')).toBe(1);
        expect(text.getBBox()).toEqual({ minX: 50,
            minY: 50,
            maxX: 50,
            maxY: 50,
            x: 50,
            y: 50,
            width: 0,
            height: 0
        });
    });
    canvas.add(rect);
    canvas.add(text);
    canvas.draw();
    it('text undefined ', function () {
        text.attr('text', undefined);
        expect(text.attr('x')).toBe(50);
        expect(text.attr('y')).toBe(50);
        expect(text.attr('text')).toBeUndefined();
        expect(text.attr('textAlign')).toBe('start');
        expect(text.attr('fontSize')).toBe(12);
        expect(text.attr('fill')).toBe('black');
        expect(text.attr('fontFamily')).toBe('sans-serif');
        expect(text.attr('fontStyle')).toBe('normal');
        expect(text.attr('fontWeight')).toBe('normal');
        expect(text.attr('fontVariant')).toBe('normal');
        expect(text.attr('font')).toBe('normal normal normal 12px sans-serif');
        expect(text.attr('textBaseline')).toBe('top');
        expect(text.attr('lineWidth')).toBe(1);
        expect(text.getBBox()).toEqual({ minX: 50,
            minY: 50,
            maxX: 50,
            maxY: 50,
            x: 50,
            y: 50,
            width: 0,
            height: 0
        });
    });
    canvas.add(rect);
    canvas.add(text);
    canvas.draw();
});
