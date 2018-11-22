/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { interpolateHslLong } from '../public-api';
import { hsl, rgb } from '@gradii/color';

describe('test interpolate hsl long', () => {
  it('interpolateHslLong(a, b) converts a and b to HSL colors', () => {
    expect(interpolateHslLong('steelblue', 'brown')(0)).toMatch(rgb('steelblue') + '');
    expect(interpolateHslLong('steelblue', hsl('brown'))(1)).toMatch(rgb('brown') + '');
    expect(interpolateHslLong('steelblue', rgb('brown'))(1)).toMatch(rgb('brown') + '');
  });

  it('interpolateHslLong(a, b) interpolates in HSL and returns an RGB string', () => {
    expect(interpolateHslLong('steelblue', '#f00')(0.2)).toMatch('rgb(56, 195, 162)');
    expect(interpolateHslLong('rgba(70, 130, 180, 1)', 'rgba(255, 0, 0, 0.2)')(0.2)).toMatch('rgba(56, 195, 162, 0.84)');
  });

  it('interpolateHslLong(a, b) does not use the shortest path when interpolating hue', () => {
    let i = interpolateHslLong('hsl(10,50%,50%)', 'hsl(350,50%,50%)');
    expect(i(0.0)).toMatch('rgb(191, 85, 64)');
    expect(i(0.2)).toMatch('rgb(153, 191, 64)');
    expect(i(0.4)).toMatch('rgb(64, 191, 119)');
    expect(i(0.6)).toMatch('rgb(64, 119, 191)');
    expect(i(0.8)).toMatch('rgb(153, 64, 191)');
    expect(i(1.0)).toMatch('rgb(191, 64, 85)');
  });

  it('interpolateHslLong(a, b) uses a’s hue when b’s hue is undefined', () => {
    expect(interpolateHslLong('#f60', '#000')(0.5)).toMatch('rgb(128, 51, 0)');
    expect(interpolateHslLong('#6f0', '#fff')(0.5)).toMatch('rgb(179, 255, 128)');
  });

  it('interpolateHslLong(a, b) uses b’s hue when a’s hue is undefined', () => {
    expect(interpolateHslLong('#000', '#f60')(0.5)).toMatch('rgb(128, 51, 0)');
    expect(interpolateHslLong('#fff', '#6f0')(0.5)).toMatch('rgb(179, 255, 128)');
  });

  it('interpolateHslLong(a, b) uses a’s saturation when b’s saturation is undefined', () => {
    expect(interpolateHslLong('#ccc', '#000')(0.5)).toMatch('rgb(102, 102, 102)');
    expect(interpolateHslLong('#f00', '#000')(0.5)).toMatch('rgb(128, 0, 0)');
  });

  it('interpolateHslLong(a, b) uses b’s saturation when a’s saturation is undefined', () => {
    expect(interpolateHslLong('#000', '#ccc')(0.5)).toMatch('rgb(102, 102, 102)');
    expect(interpolateHslLong('#000', '#f00')(0.5)).toMatch('rgb(128, 0, 0)');
  });

  it('interpolateHslLong(a, b) uses b’s lightness when a’s lightness is undefined', () => {
    expect(interpolateHslLong(null, hsl(20, 1.0, 0.5))(0.5)).toMatch('rgb(255, 85, 0)');
  });

  it('interpolateHslLong(a, b) uses a’s lightness when b’s lightness is undefined', () => {
    expect(interpolateHslLong(hsl(20, 1.0, 0.5), null)(0.5)).toMatch('rgb(255, 85, 0)');
  });

})
