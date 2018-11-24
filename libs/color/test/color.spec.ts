/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import { create, hex } from '../src/helper';
import { Hsl } from '../src/hsl';
import { Rgb } from '../src/rgb';
import { expectEqualRgb, expectEqualRgba } from './test-helper';

describe('test color', () => {
    it('hex `0` should be 0', () => {
      expect(hex(0)).toBe('00');
    });

    it('hex color less than 16 should be pad with `0`', () => {
      expect(hex(0)).toBe('00');
      expect(hex(1)).toBe('01');
      expect(hex(15)).toBe('0f');
      expect(hex(16)).toBe('10');
      expect(hex(255)).toBe('ff');
    });

    it('create color with hex3 string should return right color', () => {
      const hex3 = create('#000') as Rgb;
      expectEqualRgb(hex3, new Rgb(0, 0, 0));
      const hex3_1 = create('#1af') as Rgb;
      expectEqualRgb(hex3_1, new Rgb(17, 170, 255));
    });

    it('create color with hex6 string should return right color', () => {
      const hex6 = create('#000000') as Rgb;
      expectEqualRgb(hex6, new Rgb(0, 0, 0));
      const hex6_1 = create('#23aedf') as Rgb;
      expectEqualRgb(hex6_1, new Rgb(35, 174, 223));
    });

    it('create color with rgb(int, int, int) should return right color', () => {
      const rgb_1 = create('rgb( 0, 0, 0)') as Rgb;
      expectEqualRgb(rgb_1, new Rgb(0, 0, 0));

      const rgb = create('rgb( 234, 23, 34)') as Rgb;
      expectEqualRgb(rgb, new Rgb(234, 23, 34));
    });

    it('create color with rgb(*%, *%, *%) should return right color', () => {
      const rgb_1 = create('rgb( 0%, .0%, 0%)') as Rgb;
      expectEqualRgb(rgb_1, new Rgb(0, 0, 0));

      const rgb = create('rgb( 34%, 23%, 34%)') as Rgb;
      expectEqualRgb(rgb, new Rgb(87, 59, 87));

      const rgb_2 = create('rgb( 50%, 100%, 200%)') as Rgb;
      expectEqualRgb(rgb_2, new Rgb(128, 255, 255));
    });

    it('create color with rgba(int, int, int, number) should return right color', () => {
      const rgb_1 = create('rgba(0, 0, 0, 0)') as Rgb;
      expectEqualRgba(rgb_1, new Rgb(0, 0, 0, 0));

      const rgb_2 = create('rgba(23, 255, 46, 0.2)');
      expectEqualRgba(rgb_2, new Rgb(23, 255, 46, 0.2));

      const rgb_3 = create('rgba(23, 255, 46, 2)');
      expectEqualRgba(rgb_3, new Rgb(23, 255, 46, 1));
    });

    it('create color with rgba(*%, *%, *%, number) should return right color', () => {
      const rgb_1 = create('rgba(0%, 0%, 0%, 0)') as Rgb;
      expectEqualRgba(rgb_1, new Rgb(0, 0, 0, 0));

      const rgb_2 = create('rgba(23%, 100%, 46%, 0.2)');
      expectEqualRgba(rgb_2, new Rgb(59, 255, 117, 0.2));

      const rgb_3 = create('rgba(23%, 100%, 46%, 2)');
      expectEqualRgba(rgb_3, new Rgb(59, 255, 117, 1));
    });

    it('create color with hsl(number, *%, *%) should return right color', () => {
      const hsl_1 = create('hsl(0, 0%, 0%)') as Rgb;
      expectEqualRgb(hsl_1, new Rgb(0, 0, 0));

      const hsl_2 = create('hsl(23, 43%, 35%)') as Rgb;
      expectEqualRgb(hsl_2, new Rgb(0x80, 0x50, 0x33));
    });

    it('create color with hsla(number, *%, *%) should return right color', () => {
      const hsl_1 = create('hsla(0, 0%, 0%, 0)') as Rgb;
      expectEqualRgb(hsl_1, new Rgb(0, 0, 0));

      const hsl_2 = create('hsla(23, 43%, 35%, 1)') as Rgb;
      expectEqualRgb(hsl_2, new Rgb(0x80, 0x50, 0x33));
    });

    it('create color with hsla(number, *%, *%, number) should return right color', () => {
      const hsl_1 = create('hsla(0, 0%, 0%, 0)') as Hsl;
      expectEqualRgba(hsl_1, new Hsl(0, 0, 0, 0));
    });
  }
);
