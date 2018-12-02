"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../src/color");
var hsl_1 = require("../src/hsl");
var rgb_1 = require("../src/rgb");
var test_helper_1 = require("./test-helper");
describe('test color hsl', function () {
    it('hsl(…) returns an instance of hsl and color', function () {
        var c = hsl_1.hsl(120, 0.4, 0.5);
        expect(c instanceof hsl_1.Hsl).toBe(true);
        expect(c instanceof color_1.Color).toBe(true);
    });
    it('hsl(…) exposes h, s, and l channel values and opacity', function () {
        test_helper_1.hslEqual(hsl_1.hsl('#abc'), 210, 0.25, 0.7333333, 1);
        test_helper_1.hslEqual(hsl_1.hsl('hsla(60, 100%, 20%, 0.4)'), 60, 1, 0.2, 0.4);
    });
    it('hsl.toString() converts to RGB and formats as rgb(…) or rgba(…)', function () {
        expect(hsl_1.hsl('#abcdef') + '').toBe('rgb(171, 205, 239)');
        expect(hsl_1.hsl('moccasin') + '').toBe('rgb(255, 228, 181)');
        expect(hsl_1.hsl('hsl(60, 100%, 20%)') + '').toBe('rgb(102, 102, 0)');
        expect(hsl_1.hsl('hsla(60, 100%, 20%, 0.4)') + '').toBe('rgba(102, 102, 0, 0.4)');
        expect(hsl_1.hsl('rgb(12, 34, 56)') + '').toBe('rgb(12, 34, 56)');
        expect(hsl_1.hsl(rgb_1.rgb(12, 34, 56)) + '').toBe('rgb(12, 34, 56)');
        expect(hsl_1.hsl(hsl_1.hsl(60, 1, 0.2)) + '').toBe('rgb(102, 102, 0)');
        expect(hsl_1.hsl(hsl_1.hsl(60, 1, 0.2, 0.4)) + '').toBe('rgba(102, 102, 0, 0.4)');
    });
    it('hsl.toString() reflects h, s and l channel values and opacity', function () {
        var c = hsl_1.hsl('#abc');
        c.h += 10, c.s += 0.01, c.l -= 0.01, c.opacity = 0.4;
        expect(c + '').toBe('rgba(166, 178, 203, 0.4)');
    });
    it('hsl.toString() treats undefined channel values as 0', function () {
        expect(hsl_1.hsl('invalid') + '').toBe('rgb(0, 0, 0)');
        expect(hsl_1.hsl('#000') + '').toBe('rgb(0, 0, 0)');
        expect(hsl_1.hsl('#ccc') + '').toBe('rgb(204, 204, 204)');
        expect(hsl_1.hsl('#fff') + '').toBe('rgb(255, 255, 255)');
        expect(hsl_1.hsl(NaN, 0.5, 0.4) + '').toBe('rgb(102, 102, 102)'); // equivalent to hsl(*, 0, 0.4)
        expect(hsl_1.hsl(120, NaN, 0.4) + '').toBe('rgb(102, 102, 102)');
        expect(hsl_1.hsl(NaN, NaN, 0.4) + '').toBe('rgb(102, 102, 102)');
        expect(hsl_1.hsl(120, 0.5, NaN) + '').toBe('rgb(0, 0, 0)'); // equivalent to hsl(120, 0.5, 0)
    });
    it('hsl.toString() treats undefined opacity as 1', function () {
        var c = hsl_1.hsl('#abc');
        c.opacity = NaN;
        expect(c + '').toBe('rgb(170, 187, 204)');
    });
    it('hsl(h, s, l) does not wrap hue to [0,360)', function () {
        test_helper_1.hslEqual(hsl_1.hsl(-10, 0.4, 0.5), -10, 0.4, 0.5, 1);
        test_helper_1.hslEqual(hsl_1.hsl(0, 0.4, 0.5), 0, 0.4, 0.5, 1);
        test_helper_1.hslEqual(hsl_1.hsl(360, 0.4, 0.5), 360, 0.4, 0.5, 1);
        test_helper_1.hslEqual(hsl_1.hsl(370, 0.4, 0.5), 370, 0.4, 0.5, 1);
    });
    it('hsl(h, s, l) does not clamp s and l channel values to [0,1]', function () {
        test_helper_1.hslEqual(hsl_1.hsl(120, -0.1, 0.5), 120, -0.1, 0.5, 1);
        test_helper_1.hslEqual(hsl_1.hsl(120, 1.1, 0.5), 120, 1.1, 0.5, 1);
        test_helper_1.hslEqual(hsl_1.hsl(120, 0.2, -0.1), 120, 0.2, -0.1, 1);
        test_helper_1.hslEqual(hsl_1.hsl(120, 0.2, 1.1), 120, 0.2, 1.1, 1);
    });
    it('hsl(h, s, l, opacity) does not clamp opacity to [0,1]', function () {
        test_helper_1.hslEqual(hsl_1.hsl(120, 0.1, 0.5, -0.2), 120, 0.1, 0.5, -0.2);
        test_helper_1.hslEqual(hsl_1.hsl(120, 0.9, 0.5, 1.2), 120, 0.9, 0.5, 1.2);
    });
    // it('hsl(h, s, l) coerces channel values to numbers', () => {
    //   hslEqual(hsl('120', '.4', '.5'), 120, 0.4, 0.5, 1);
    // });
    // it('hsl(h, s, l, opacity) coerces opacity to number', () => {
    //   hslEqual(hsl(120, 0.1, 0.5, '0.2'), 120, 0.1, 0.5, 0.2);
    //   hslEqual(hsl(120, 0.9, 0.5, '0.9'), 120, 0.9, 0.5, 0.9);
    // });
    it('hsl(h, s, l) allows undefined channel values', function () {
        // hslEqual(hsl(undefined, NaN, 'foo'), NaN, NaN, NaN, 1);
        test_helper_1.hslEqual(hsl_1.hsl(undefined, 0.4, 0.5), NaN, 0.4, 0.5, 1);
        test_helper_1.hslEqual(hsl_1.hsl(42, undefined, 0.5), 42, NaN, 0.5, 1);
        test_helper_1.hslEqual(hsl_1.hsl(42, 0.4, undefined), 42, 0.4, NaN, 1);
    });
    it('hsl(h, s, l, opacity) converts undefined opacity to 1', function () {
        // hslEqual(hsl(10, 0.2, 0.3, null), 10, 0.2, 0.3, 1);
        test_helper_1.hslEqual(hsl_1.hsl(10, 0.2, 0.3, undefined), 10, 0.2, 0.3, 1);
    });
    it('hsl(h, s, l) preserves explicit hue, even for grays', function () {
        test_helper_1.hslEqual(hsl_1.hsl(0, 0, 0), 0, 0, 0, 1);
        test_helper_1.hslEqual(hsl_1.hsl(42, 0, 0.5), 42, 0, 0.5, 1);
        test_helper_1.hslEqual(hsl_1.hsl(118, 0, 1), 118, 0, 1, 1);
    });
    it('hsl(h, s, l) preserves explicit saturation, even for white or black', function () {
        test_helper_1.hslEqual(hsl_1.hsl(0, 0, 0), 0, 0, 0, 1);
        test_helper_1.hslEqual(hsl_1.hsl(0, 0.18, 0), 0, 0.18, 0, 1);
        test_helper_1.hslEqual(hsl_1.hsl(0, 0.42, 1), 0, 0.42, 1, 1);
        test_helper_1.hslEqual(hsl_1.hsl(0, 1, 1), 0, 1, 1, 1);
    });
    it('hsl(format) parses the specified format and converts to HSL', function () {
        test_helper_1.hslEqual(hsl_1.hsl('#abcdef'), 210, 0.68, 0.8039215, 1);
        test_helper_1.hslEqual(hsl_1.hsl('#abc'), 210, 0.25, 0.733333333, 1);
        test_helper_1.hslEqual(hsl_1.hsl('rgb(12, 34, 56)'), 210, 0.647058, 0.1333333, 1);
        test_helper_1.hslEqual(hsl_1.hsl('rgb(12%, 34%, 56%)'), 210, 0.647058, 0.34, 1);
        test_helper_1.hslEqual(hsl_1.hsl('hsl(60,100%,20%)'), 60, 1, 0.2, 1);
        test_helper_1.hslEqual(hsl_1.hsl('hsla(60,100%,20%,0.4)'), 60, 1, 0.2, 0.4);
        test_helper_1.hslEqual(hsl_1.hsl('aliceblue'), 208, 1, 0.9705882, 1);
        test_helper_1.hslEqual(hsl_1.hsl('transparent'), NaN, NaN, NaN, 0);
    });
    it('hsl(format) ignores the hue if the saturation is <= 0', function () {
        test_helper_1.hslEqual(hsl_1.hsl('hsl(120,0%,20%)'), NaN, 0, 0.2, 1);
        test_helper_1.hslEqual(hsl_1.hsl('hsl(120,-10%,20%)'), NaN, -0.1, 0.2, 1);
    });
    it('hsl(format) ignores the hue and saturation if the lightness is <= 0 or >= 1', function () {
        test_helper_1.hslEqual(hsl_1.hsl('hsl(120,20%,-10%)'), NaN, NaN, -0.1, 1);
        test_helper_1.hslEqual(hsl_1.hsl('hsl(120,20%,0%)'), NaN, NaN, 0.0, 1);
        test_helper_1.hslEqual(hsl_1.hsl('hsl(120,20%,100%)'), NaN, NaN, 1.0, 1);
        test_helper_1.hslEqual(hsl_1.hsl('hsl(120,20%,120%)'), NaN, NaN, 1.2, 1);
    });
    it('hsl(format) ignores all channels if the alpha is <= 0', function () {
        test_helper_1.hslEqual(hsl_1.hsl('hsla(120,20%,10%,0)'), NaN, NaN, NaN, 0);
        test_helper_1.hslEqual(hsl_1.hsl('hsla(120,20%,10%,-0.1)'), NaN, NaN, NaN, -0.1);
    });
    it('hsl(format) does not lose precision when parsing HSL formats', function () {
        test_helper_1.hslEqual(hsl_1.hsl('hsl(325,50%,40%)'), 325, 0.5, 0.4, 1);
    });
    it('hsl(format) returns null for unknown formats', function () {
        test_helper_1.hslEqual(hsl_1.hsl('invalid'), NaN, NaN, NaN, 1);
    });
    it('hsl(hsl) copies an HSL color', function () {
        var c1 = hsl_1.hsl('hsla(120,30%,50%,0.4)'), c2 = hsl_1.hsl(c1);
        test_helper_1.hslEqual(c1, 120, 0.3, 0.5, 0.4);
        c1.h = c1.s = c1.l = c1.opacity = 0;
        test_helper_1.hslEqual(c1, 0, 0, 0, 0);
        test_helper_1.hslEqual(c2, 120, 0.3, 0.5, 0.4);
    });
    it('hsl(rgb) converts from RGB', function () {
        test_helper_1.hslEqual(hsl_1.hsl(rgb_1.rgb(255, 0, 0, 0.4)), 0, 1, 0.5, 0.4);
    });
    it('hsl(color) returns undefined hue and zero saturation for grays (but not white and black)', function () {
        test_helper_1.hslEqual(hsl_1.hsl('gray'), NaN, 0, 0.5019608, 1);
        test_helper_1.hslEqual(hsl_1.hsl('#ccc'), NaN, 0, 0.8, 1);
        test_helper_1.hslEqual(hsl_1.hsl(rgb_1.Rgb.create('gray')), NaN, 0, 0.5019608, 1);
    });
    it('hsl(color) returns undefined hue and saturation for black and white', function () {
        test_helper_1.hslEqual(hsl_1.hsl('black'), NaN, NaN, 0, 1);
        test_helper_1.hslEqual(hsl_1.hsl('#000'), NaN, NaN, 0, 1);
        test_helper_1.hslEqual(hsl_1.hsl('white'), NaN, NaN, 1, 1);
        test_helper_1.hslEqual(hsl_1.hsl('#fff'), NaN, NaN, 1, 1);
        test_helper_1.hslEqual(hsl_1.hsl(rgb_1.Rgb.create('#fff')), NaN, NaN, 1, 1);
    });
    // it('hsl(color) converts from another colorspace via Rgb.create()', () => {
    //   function TestColor() {}
    //
    //   TestColor.prototype          = Object.create(color.color.prototype);
    //   TestColor.prototype.rgb      = function () { return Rgb.create(12, 34, 56, 0.4); };
    //   TestColor.prototype.toString = function () { throw new Error('should use rgb, not toString'); };
    //   hslEqual(hsl(new TestColor), 210, 0.6470588, 0.1333334, 0.4);
    // });
    it('hsl.displayable() returns true if the color is within the RGB gamut and the opacity is in [0,1]', function () {
        expect(hsl_1.hsl('white').displayable()).toBe(true);
        expect(hsl_1.hsl('red').displayable()).toBe(true);
        expect(hsl_1.hsl('black').displayable()).toBe(true);
        expect(hsl_1.hsl('invalid').displayable()).toBe(false);
        expect(hsl_1.hsl(NaN, NaN, 1).displayable()).toBe(true);
        expect(hsl_1.hsl(NaN, NaN, 1.5).displayable()).toBe(false);
        expect(hsl_1.hsl(120, -0.5, 0).displayable()).toBe(false);
        expect(hsl_1.hsl(120, 1.5, 0).displayable()).toBe(false);
        expect(hsl_1.hsl(0, 1, 1, 0).displayable()).toBe(true);
        expect(hsl_1.hsl(0, 1, 1, 1).displayable()).toBe(true);
        expect(hsl_1.hsl(0, 1, 1, -0.2).displayable()).toBe(false);
        expect(hsl_1.hsl(0, 1, 1, 1.2).displayable()).toBe(false);
    });
    it('hsl.brighter(k) returns a brighter color if k > 0', function () {
        var c = hsl_1.hsl('rgba(165, 42, 42, 0.4)');
        test_helper_1.hslEqual(c.brighter(0.5), 0, 0.5942028, 0.4851222, 0.4);
        test_helper_1.hslEqual(c.brighter(1), 0, 0.5942028, 0.5798319, 0.4);
        test_helper_1.hslEqual(c.brighter(2), 0, 0.5942028, 0.8283313, 0.4);
    });
    it('hsl.brighter(k) returns a copy', function () {
        var c1 = hsl_1.hsl('rgba(70, 130, 180, 0.4)'), c2 = c1.brighter(1);
        test_helper_1.hslEqual(c1, 207.272727, 0.44, 0.4901961, 0.4);
        test_helper_1.hslEqual(c2, 207.272727, 0.44, 0.7002801, 0.4);
    });
    it('hsl.brighter() is equivalent to hsl.brighter(1)', function () {
        var c1 = hsl_1.hsl('rgba(70, 130, 180, 0.4)'), c2 = c1.brighter(), c3 = c1.brighter(1);
        test_helper_1.hslEqual(c2, c3.h, c3.s, c3.l, 0.4);
    });
    it('hsl.brighter(k) is equivalent to hsl.darker(-k)', function () {
        var c1 = hsl_1.hsl('rgba(70, 130, 180, 0.4)'), c2 = c1.brighter(1.5), c3 = c1.darker(-1.5);
        test_helper_1.hslEqual(c2, c3.h, c3.s, c3.l, 0.4);
    });
    it('hsl("black").brighter() still returns black', function () {
        var c1 = hsl_1.hsl('black'), c2 = c1.brighter(1);
        test_helper_1.hslEqual(c1, NaN, NaN, 0, 1);
        test_helper_1.hslEqual(c2, NaN, NaN, 0, 1);
    });
    it('hsl.darker(k) returns a darker color if k > 0', function () {
        var c = hsl_1.hsl('rgba(165, 42, 42, 0.4)');
        test_helper_1.hslEqual(c.darker(0.5), 0, 0.5942029, 0.3395855, 0.4);
        test_helper_1.hslEqual(c.darker(1), 0, 0.5942029, 0.2841176, 0.4);
        test_helper_1.hslEqual(c.darker(2), 0, 0.5942029, 0.1988823, 0.4);
    });
    it('hsl.darker(k) returns a copy', function () {
        var c1 = hsl_1.hsl('rgba(70, 130, 180, 0.4)'), c2 = c1.darker(1);
        test_helper_1.hslEqual(c1, 207.272727, 0.44, 0.4901961, 0.4);
        test_helper_1.hslEqual(c2, 207.272727, 0.44, 0.3431373, 0.4);
    });
    it('hsl.darker() is equivalent to hsl.darker(1)', function () {
        var c1 = hsl_1.hsl('rgba(70, 130, 180, 0.4)'), c2 = c1.darker(), c3 = c1.darker(1);
        test_helper_1.hslEqual(c2, c3.h, c3.s, c3.l, 0.4);
    });
    it('hsl.darker(k) is equivalent to hsl.brighter(-k)', function () {
        var c1 = hsl_1.hsl('rgba(70, 130, 180, 0.4)'), c2 = c1.darker(1.5), c3 = c1.brighter(-1.5);
        test_helper_1.hslEqual(c2, c3.h, c3.s, c3.l, 0.4);
    });
    it('hsl.rgb() converts to RGB', function () {
        var c = hsl_1.hsl(120, 0.3, 0.5, 0.4);
        test_helper_1.rgbEqual(c.rgb(), 89, 166, 89, 0.4);
    });
});
//# sourceMappingURL=hsl.spec.js.map