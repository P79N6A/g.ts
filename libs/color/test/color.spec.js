"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var public_api_1 = require("../public-api");
var helper_1 = require("../src/helper");
var hsl_3 = require("../src/hsl");
var rgb_4 = require("../src/rgb");
var test_helper_1 = require("./test-helper");
describe('test color', function () {
    it('hex `0` should be 0', function () {
        expect(helper_1.hex(0)).toBe('00');
    });
    it('hex color less than 16 should be pad with `0`', function () {
        expect(helper_1.hex(0)).toBe('00');
        expect(helper_1.hex(1)).toBe('01');
        expect(helper_1.hex(15)).toBe('0f');
        expect(helper_1.hex(16)).toBe('10');
        expect(helper_1.hex(255)).toBe('ff');
    });
    it('create color with hex3 string should return right color', function () {
        var hex3 = helper_1.create('#000');
        test_helper_1.expectEqualRgb(hex3, new rgb_4.Rgb(0, 0, 0));
        var hex3_1 = helper_1.create('#1af');
        test_helper_1.expectEqualRgb(hex3_1, new rgb_4.Rgb(17, 170, 255));
    });
    it('create color with hex6 string should return right color', function () {
        var hex6 = helper_1.create('#000000');
        test_helper_1.expectEqualRgb(hex6, new rgb_4.Rgb(0, 0, 0));
        var hex6_1 = helper_1.create('#23aedf');
        test_helper_1.expectEqualRgb(hex6_1, new rgb_4.Rgb(35, 174, 223));
    });
    it('create color with rgb(int, int, int) should return right color', function () {
        var rgb_1 = helper_1.create('rgb( 0, 0, 0)');
        test_helper_1.expectEqualRgb(rgb_1, new rgb_4.Rgb(0, 0, 0));
        var rgb = helper_1.create('rgb( 234, 23, 34)');
        test_helper_1.expectEqualRgb(rgb, new rgb_4.Rgb(234, 23, 34));
    });
    it('create color with rgb(*%, *%, *%) should return right color', function () {
        var rgb_1 = helper_1.create('rgb( 0%, .0%, 0%)');
        test_helper_1.expectEqualRgb(rgb_1, new rgb_4.Rgb(0, 0, 0));
        var rgb = helper_1.create('rgb( 34%, 23%, 34%)');
        test_helper_1.expectEqualRgb(rgb, new rgb_4.Rgb(87, 59, 87));
        var rgb_2 = helper_1.create('rgb( 50%, 100%, 200%)');
        test_helper_1.expectEqualRgb(rgb_2, new rgb_4.Rgb(128, 255, 255));
    });
    it('create color with rgba(int, int, int, number) should return right color', function () {
        var rgb_1 = helper_1.create('rgba(0, 0, 0, 0)');
        test_helper_1.expectEqualRgba(rgb_1, new rgb_4.Rgb(0, 0, 0, 0));
        var rgb_2 = helper_1.create('rgba(23, 255, 46, 0.2)');
        test_helper_1.expectEqualRgba(rgb_2, new rgb_4.Rgb(23, 255, 46, 0.2));
        var rgb_3 = helper_1.create('rgba(23, 255, 46, 2)');
        test_helper_1.expectEqualRgba(rgb_3, new rgb_4.Rgb(23, 255, 46, 1));
    });
    it('create color with rgba(*%, *%, *%, number) should return right color', function () {
        var rgb_1 = helper_1.create('rgba(0%, 0%, 0%, 0)');
        test_helper_1.expectEqualRgba(rgb_1, new rgb_4.Rgb(0, 0, 0, 0));
        var rgb_2 = helper_1.create('rgba(23%, 100%, 46%, 0.2)');
        test_helper_1.expectEqualRgba(rgb_2, new rgb_4.Rgb(59, 255, 117, 0.2));
        var rgb_3 = helper_1.create('rgba(23%, 100%, 46%, 2)');
        test_helper_1.expectEqualRgba(rgb_3, new rgb_4.Rgb(59, 255, 117, 1));
    });
    it('create color with hsl(number, *%, *%) should return right color', function () {
        var hsl_1 = helper_1.create('hsl(0, 0%, 0%)');
        test_helper_1.expectEqualRgb(hsl_1, new rgb_4.Rgb(0, 0, 0));
        var hsl_2 = helper_1.create('hsl(23, 43%, 35%)');
        test_helper_1.expectEqualRgb(hsl_2, new rgb_4.Rgb(0x80, 0x50, 0x33));
    });
    it('create color with hsla(number, *%, *%) should return right color', function () {
        var hsl_1 = helper_1.create('hsla(0, 0%, 0%, 0)');
        test_helper_1.expectEqualRgb(hsl_1, new rgb_4.Rgb(0, 0, 0));
        var hsl_2 = helper_1.create('hsla(23, 43%, 35%, 1)');
        test_helper_1.expectEqualRgb(hsl_2, new rgb_4.Rgb(0x80, 0x50, 0x33));
    });
    it('create color with hsla(number, *%, *%, number) should return right color', function () {
        var hsl_1 = helper_1.create('hsla(0, 0%, 0%, 0)');
        test_helper_1.expectEqualRgba(hsl_1, new hsl_3.Hsl(0, 0, 0, 0));
    });
    it('color(format) parses CSS color names (e.g., "rebeccapurple")', function () {
        test_helper_1.rgbEqual(public_api_1.createColor('moccasin'), 255, 228, 181, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('aliceblue'), 240, 248, 255, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('yellow'), 255, 255, 0, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('moccasin'), 255, 228, 181, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('aliceblue'), 240, 248, 255, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('yellow'), 255, 255, 0, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('rebeccapurple'), 102, 51, 153, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('transparent'), NaN, NaN, NaN, 0);
    });
    it('color(format) parses 6-digit hexadecimal (e.g., "#abcdef")', function () {
        test_helper_1.rgbEqual(public_api_1.createColor('#abcdef'), 171, 205, 239, 1);
    });
    it('color(format) parses 3-digit hexadecimal (e.g., "#abc")', function () {
        test_helper_1.rgbEqual(public_api_1.createColor('#abc'), 170, 187, 204, 1);
    });
    it('color(format) parses RGB integer format (e.g., "rgb(12,34,56)")', function () {
        test_helper_1.rgbEqual(public_api_1.createColor('rgb(12,34,56)'), 12, 34, 56, 1);
    });
    it('color(format) parses RGBA integer format (e.g., "rgba(12,34,56,0.4)")', function () {
        test_helper_1.rgbEqual(public_api_1.createColor('rgba(12,34,56,0.4)'), 12, 34, 56, 0.4);
    });
    it('color(format) parses RGB percentage format (e.g., "rgb(12%,34%,56%)")', function () {
        test_helper_1.rgbEqual(public_api_1.createColor('rgb(12%,34%,56%)'), 31, 87, 143, 1);
        test_helper_1.rgbStrictEqual(public_api_1.createColor('rgb(100%,100%,100%)'), 255, 255, 255, 1);
    });
    it('color(format) parses RGBA percentage format (e.g., "rgba(12%,34%,56%,0.4)")', function () {
        test_helper_1.rgbEqual(public_api_1.createColor('rgba(12%,34%,56%,0.4)'), 31, 87, 143, 0.4);
        test_helper_1.rgbStrictEqual(public_api_1.createColor('rgba(100%,100%,100%,0.4)'), 255, 255, 255, 0.4);
    });
    it('color(format) parses HSL format (e.g., "hsl(60,100%,20%)")', function () {
        test_helper_1.hslEqual(public_api_1.createColor('hsl(60,100%,20%)'), 60, 1, 0.2, 1);
    });
    it('color(format) parses HSLA format (e.g., "hsla(60,100%,20%,0.4)")', function () {
        test_helper_1.hslEqual(public_api_1.createColor('hsla(60,100%,20%,0.4)'), 60, 1, 0.2, 0.4);
    });
    it('color(format) ignores leading and trailing whitespace', function () {
        test_helper_1.rgbEqual(public_api_1.createColor(' aliceblue\t\n'), 240, 248, 255, 1);
        test_helper_1.rgbEqual(public_api_1.createColor(' #abc\t\n'), 170, 187, 204, 1);
        test_helper_1.rgbEqual(public_api_1.createColor(' #aabbcc\t\n'), 170, 187, 204, 1);
        test_helper_1.rgbEqual(public_api_1.createColor(' rgb(120,30,50)\t\n'), 120, 30, 50, 1);
        test_helper_1.hslEqual(public_api_1.createColor(' hsl(120,30%,50%)\t\n'), 120, 0.3, 0.5, 1);
    });
    it('color(format) ignores whitespace between numbers', function () {
        test_helper_1.rgbEqual(public_api_1.createColor(' rgb( 120 , 30 , 50 ) '), 120, 30, 50, 1);
        test_helper_1.hslEqual(public_api_1.createColor(' hsl( 120 , 30% , 50% ) '), 120, 0.3, 0.5, 1);
        test_helper_1.rgbEqual(public_api_1.createColor(' rgba( 12 , 34 , 56 , 0.4 ) '), 12, 34, 56, 0.4);
        test_helper_1.rgbEqual(public_api_1.createColor(' rgba( 12% , 34% , 56% , 0.4 ) '), 31, 87, 143, 0.4);
        test_helper_1.hslEqual(public_api_1.createColor(' hsla( 60 , 100% , 20% , 0.4 ) '), 60, 1, 0.2, 0.4);
    });
    it('color(format) allows number signs', function () {
        test_helper_1.rgbEqual(public_api_1.createColor('rgb(+120,+30,+50)'), 120, 30, 50, 1);
        test_helper_1.hslEqual(public_api_1.createColor('hsl(+120,+30%,+50%)'), 120, 0.3, 0.5, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('rgb(-120,-30,-50)'), 0, 0, 0, 1);
        test_helper_1.hslEqual(public_api_1.createColor('hsl(-120,-30%,-50%)'), NaN, NaN, -0.5, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('rgba(12,34,56,+0.4)'), 12, 34, 56, 0.4);
        test_helper_1.rgbEqual(public_api_1.createColor('rgba(12,34,56,-0.4)'), NaN, NaN, NaN, 0);
        test_helper_1.rgbEqual(public_api_1.createColor('rgba(12%,34%,56%,+0.4)'), 31, 87, 143, 0.4);
        test_helper_1.rgbEqual(public_api_1.createColor('rgba(12%,34%,56%,-0.4)'), NaN, NaN, NaN, 0);
        test_helper_1.hslEqual(public_api_1.createColor('hsla(60,100%,20%,+0.4)'), 60, 1, 0.2, 0.4);
        test_helper_1.hslEqual(public_api_1.createColor('hsla(60,100%,20%,-0.4)'), NaN, NaN, NaN, -0.4);
    });
    it('color(format) allows decimals for non-integer values', function () {
        test_helper_1.rgbEqual(public_api_1.createColor('rgb(20.0%,30.4%,51.2%)'), 51, 78, 131, 1);
        test_helper_1.hslEqual(public_api_1.createColor('hsl(20.0,30.4%,51.2%)'), 20, 0.304, 0.512, 1);
    });
    it('color(format) allows leading decimal for hue, opacity and percentages', function () {
        test_helper_1.hslEqual(public_api_1.createColor('hsl(.9,.3%,.5%)'), 0.9, 0.003, 0.005, 1);
        test_helper_1.hslEqual(public_api_1.createColor('hsla(.9,.3%,.5%,.5)'), 0.9, 0.003, 0.005, 0.5);
        test_helper_1.rgbEqual(public_api_1.createColor('rgb(.1%,.2%,.3%)'), 0, 1, 1, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('rgba(120,30,50,.5)'), 120, 30, 50, 0.5);
    });
    it('color(format) allows exponential format for hue, opacity and percentages', function () {
        test_helper_1.hslEqual(public_api_1.createColor('hsl(1e1,2e1%,3e1%)'), 10, 0.2, 0.3, 1);
        test_helper_1.hslEqual(public_api_1.createColor('hsla(9e-1,3e-1%,5e-1%,5e-1)'), 0.9, 0.003, 0.005, 0.5);
        test_helper_1.rgbEqual(public_api_1.createColor('rgb(1e-1%,2e-1%,3e-1%)'), 0, 1, 1, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('rgba(120,30,50,1e-1)'), 120, 30, 50, 0.1);
    });
    it('color(format) does not allow decimals for integer values', function () {
        expect(public_api_1.createColor('rgb(120.5,30,50)')).toBeNull();
    });
    it('color(format) does not allow empty decimals', function () {
        expect(public_api_1.createColor('rgb(120.,30,50)')).toBeNull();
        expect(public_api_1.createColor('rgb(120.%,30%,50%)')).toBeNull();
        expect(public_api_1.createColor('rgba(120,30,50,1.)')).toBeNull();
        expect(public_api_1.createColor('rgba(12%,30%,50%,1.)')).toBeNull();
        expect(public_api_1.createColor('hsla(60,100%,20%,1.)')).toBeNull();
    });
    it('color(format) does not allow made-up names', function () {
        expect(public_api_1.createColor('bostock')).toBeNull();
    });
    it('color(format) does not allow whitespace before open paren or percent sign', function () {
        expect(public_api_1.createColor('rgb (120,30,50)')).toBeNull();
        expect(public_api_1.createColor('rgb (12%,30%,50%)')).toBeNull();
        expect(public_api_1.createColor('hsl (120,30%,50%)')).toBeNull();
        expect(public_api_1.createColor('hsl(120,30 %,50%)')).toBeNull();
        expect(public_api_1.createColor('rgba (120,30,50,1)')).toBeNull();
        expect(public_api_1.createColor('rgba (12%,30%,50%,1)')).toBeNull();
        expect(public_api_1.createColor('hsla (120,30%,50%,1)')).toBeNull();
    });
    it('color(format) is case-insensitive', function () {
        test_helper_1.rgbEqual(public_api_1.createColor('aLiCeBlUE'), 240, 248, 255, 1);
        test_helper_1.rgbEqual(public_api_1.createColor('transPARENT'), NaN, NaN, NaN, 0);
        test_helper_1.rgbEqual(public_api_1.createColor(' #aBc\t\n'), 170, 187, 204, 1);
        test_helper_1.rgbEqual(public_api_1.createColor(' #aaBBCC\t\n'), 170, 187, 204, 1);
        test_helper_1.rgbEqual(public_api_1.createColor(' rGB(120,30,50)\t\n'), 120, 30, 50, 1);
        test_helper_1.hslEqual(public_api_1.createColor(' HSl(120,30%,50%)\t\n'), 120, 0.3, 0.5, 1);
    });
    it('color(format) returns undefined RGB channel values for unknown formats', function () {
        expect(public_api_1.createColor('invalid')).toBeNull();
        expect(public_api_1.createColor('hasOwnProperty')).toBeNull();
        expect(public_api_1.createColor('__proto__')).toBeNull();
        expect(public_api_1.createColor('#ab')).toBeNull();
        expect(public_api_1.createColor('#abcd')).toBeNull();
    });
    it('color(format).hex() returns a hexadecimal string', function () {
        expect(public_api_1.createColor('rgba(12%,34%,56%,0.4)').hex()).toBe('#1f578f');
    });
});
//# sourceMappingURL=color.spec.js.map