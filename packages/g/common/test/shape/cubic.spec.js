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
var cubic_1 = require("../../../src/canvas/shape/cubic");
var div = document.createElement('div');
div.id = 'canvas-cubic';
document.body.appendChild(div);
describe('Cubic line', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'canvas-cubic',
        width: 200,
        height: 200,
        pixelRatio: 1
    });
    var cubic = new cubic_1.Cubic();
    it('init cubic', function () {
        expect(cubic.attr('p1')).toBeUndefined();
        expect(cubic.attr('p2')).toBeUndefined();
        expect(cubic.attr('p3')).toBeUndefined();
        expect(cubic.attr('p4')).toBeUndefined();
        expect(cubic.attr('lineWidth')).toBe(1);
        expect(cubic.attr('startArrow')).toBe(false);
        expect(cubic.attr('endArrow')).toBe(false);
        expect(cubic.getBBox()).toBeNull();
    });
    it('p1, p2, p3, p4', function () {
        cubic.attr({
            p1: [50, 50],
            p2: [80, 12],
            p3: [120, 150],
            p4: [150, 50]
        });
        expect(cubic.attr('p1')[0]).toBe(50);
        expect(cubic.attr('p2')[1]).toBe(12);
        expect(cubic.attr('p3')[0]).toBe(120);
        expect(cubic.attr('p4')[0]).toBe(150);
        var box = cubic.getBBox();
        expect(Util.isNumberEqual(box.minX, 49.5)).toBe(true);
        expect(Util.isNumberEqual(box.maxX, 150.5)).toBe(true);
        expect(Util.isNumberEqual(box.minY, 42.690077140818396)).toBe(true);
        expect(Util.isNumberEqual(box.maxY, 87.61466742731623)).toBe(true);
    });
    it('stroke', function () {
        cubic.attr('lineWidth', 5);
        cubic.attr('stroke', 'l (0) 0:#ff00ff 1:#00ffff');
        expect(cubic.attr('stroke')).toBe('l (0) 0:#ff00ff 1:#00ffff');
        canvas.add(cubic);
        canvas.draw();
    });
    it('p1', function () {
        cubic.attr('p1', [70, 39]);
        expect(cubic.attr('p1')[0]).toBe(70);
        expect(cubic.attr('p1')[1]).toBe(39);
        var box = cubic.getBBox();
        expect(Util.isNumberEqual(box.minX, 67.5)).toBe(true);
        expect(Util.isNumberEqual(box.maxX, 152.5)).toBe(true);
        expect(Util.isNumberEqual(box.minY, 32.923853488303024)).toBe(true);
        expect(Util.isNumberEqual(box.maxY, 89.38594461401888)).toBe(true);
        canvas.draw();
    });
    it('p2', function () {
        cubic.attr('p2', [90, 80]);
        expect(cubic.attr('p2')[0]).toBe(90);
        expect(cubic.attr('p2')[1]).toBe(80);
        var box = cubic.getBBox();
        expect(Util.isNumberEqual(box.minX, 67.5)).toBe(true);
        expect(Util.isNumberEqual(box.maxX, 152.5)).toBe(true);
        expect(Util.isNumberEqual(box.minY, 36.5)).toBe(true);
        expect(Util.isNumberEqual(box.maxY, 103.77723887000138)).toBe(true);
        canvas.draw();
    });
    it('p3', function () {
        cubic.attr('p3', [110, 0]);
        expect(cubic.attr('p3')[0]).toBe(110);
        expect(cubic.attr('p3')[1]).toBe(0);
        var box = cubic.getBBox();
        expect(Util.isNumberEqual(box.minX, 67.5)).toBe(true);
        expect(Util.isNumberEqual(box.maxX, 152.5)).toBe(true);
        expect(Util.isNumberEqual(box.minY, 30.447819730085683)).toBe(true);
        expect(Util.isNumberEqual(box.maxY, 53.66354358160779)).toBe(true);
        canvas.draw();
    });
    it('p4', function () {
        console.log(cubic.getBBox());
        cubic.attr('p4', [150, 90]);
        expect(cubic.attr('p4')[0]).toBe(150);
        expect(cubic.attr('p4')[1]).toBe(90);
        /* var box = cubic.getBBox();
        expect(Util.isNumberEqual(box.minX, 67.5)).to.be.true;
        expect(Util.isNumberEqual(box.maxX, 152.5)).to.be.true;
        expect(Util.isNumberEqual(box.minY, 36.5)).to.be.true;
        expect(Util.isNumberEqual(box.maxY, 92.5)).to.be.true;
        */
        canvas.draw();
    });
    it('lineWidth', function () {
        cubic.attr('lineWidth', 2);
        expect(cubic.attr('lineWidth')).toBe(2);
        var box = cubic.getBBox();
        expect(Util.isNumberEqual(box.minX, 69)).toBe(true);
        expect(Util.isNumberEqual(box.maxX, 151)).toBe(true);
        expect(Util.isNumberEqual(box.minY, 38)).toBe(true);
        expect(Util.isNumberEqual(box.maxY, 91)).toBe(true);
        canvas.draw();
    });
    it('arrow', function () {
        cubic.attr('startArrow', true);
        cubic.attr('endArrow', new Marker({
            attrs: {
                symbol: 'triangle',
                r: 5,
                fill: 'red'
            }
        }));
        cubic.attr('arrowLength', 5);
        cubic.attr('lineWidth', 1);
        cubic.attr('arrowAngle', 90);
        expect(cubic.attr('startArrow')).toBe(true);
        expect(cubic.attr('endArrow')).not.toBeUndefined();
        expect(cubic.attr('arrowLength')).toBe(5);
        expect(cubic.attr('arrowAngle')).toBe(90);
        canvas.draw();
    });
    it('isHit', function () {
        expect(cubic.isHit(70, 39)).toBe(true);
        expect(cubic.isHit(102.5, 46.2)).toBe(true);
        expect(cubic.isHit(150, 90)).toBe(true);
    });
    it('getPoint', function () {
        var cubic = new cubic_1.Cubic({
            attrs: {
                p1: [100, 100],
                p2: [200, 200],
                p3: [300, 0],
                p4: [400, 100]
            }
        });
        var point = cubic.getPoint(0);
        expect(point.x).toBe(100);
        expect(point.y).toBe(100);
        var point1 = cubic.getPoint(1);
        expect(point1.x).toBe(400);
        expect(point1.y).toBe(100);
        var point2 = cubic.getPoint(0.25);
        expect(point2.x).toBe(175);
        expect(point2.y).toBe(128.125);
        expect(cubic.isHit(point2.x, point2.y)).toBe(true);
        var point3 = cubic.getPoint(0.5);
        expect(point3.x).toBe(250);
        expect(point3.y).toBe(100);
        expect(cubic.isHit(point3.x, point3.y)).toBe(true);
        var point4 = cubic.getPoint(0.75);
        expect(point4.x).toBe(325);
        expect(point4.y).toBe(71.875);
        expect(cubic.isHit(point4.x, point4.y)).toBe(true);
        var point5 = cubic.getPoint(0.3);
        expect(Util.isNumberEqual(point5.x, 190)).toBe(true);
        expect(Util.isNumberEqual(point5.y, 125.2)).toBe(true);
        expect(cubic.isHit(point5.x, point5.y)).toBe(true);
    });
});
