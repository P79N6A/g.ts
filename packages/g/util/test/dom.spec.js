"use strict";
exports.__esModule = true;
var dom_1 = require("../../src/util/dom");
describe('DomUtils', function () {
    var nodeNotExist = null;
    it('getBoundingClientRect(node, defaultValue)', function () {
        expect(function () {
            dom_1.getBoundingClientRect(nodeNotExist);
        }).not.toThrowError();
    });
    it('getStyle(node, name, defaultValue)', function () {
        expect(function () {
            dom_1.getStyle(nodeNotExist, 'width');
        }).not.toThrowError();
        expect(dom_1.getStyle(nodeNotExist, 'width', 450)).toBe(450);
    });
    it('modifyCSS(node, css)', function () {
        expect(function () {
            dom_1.modifyCSS(nodeNotExist, {
                width: '500px'
            });
        }).not.toThrowError();
    });
    it('getWidth(node, defaultValue)', function () {
        expect(function () {
            dom_1.getWidth(nodeNotExist, 500);
        }).not.toThrowError();
        expect(dom_1.getWidth(nodeNotExist, 450)).toBe(450);
    });
    it('getHeight(node, defaultValue)', function () {
        expect(function () {
            dom_1.getHeight(nodeNotExist, 500);
        }).not.toThrowError();
        expect(dom_1.getHeight(nodeNotExist, 450)).toBe(450);
    });
    it('getOuterWidth(node, defaultValue)', function () {
        expect(function () {
            dom_1.getOuterWidth(nodeNotExist, 500);
        }).not.toThrowError();
        expect(dom_1.getOuterWidth(nodeNotExist, 450)).toBe(450);
    });
    it('getOuterHeight(node, defaultValue)', function () {
        expect(function () {
            dom_1.getOuterHeight(nodeNotExist, 500);
        }).not.toThrowError();
        expect(dom_1.getOuterHeight(nodeNotExist, 450)).toBe(450);
    });
    it('addEventListener(node, eventType, callback)', function () {
        expect(function () {
            addEventListener(nodeNotExist, 'click', function () { });
        }).not.toThrowError();
    });
});
