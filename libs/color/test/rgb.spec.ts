import { Rgb } from '../src/rgb';

describe('test color rgb', () => {

  it('instant a new rgb without param should be NaN', () => {
    const rgb_1 = new Rgb();
    expect(rgb_1.r).toBeNaN();
    expect(rgb_1.g).toBeNaN();
    expect(rgb_1.b).toBeNaN();
  });

  it('instant a new rgb with param should return right rgb', () => {
    const rgb_1 = new Rgb(0, 0, 0);
    expect(rgb_1.r).toBe(0);
    expect(rgb_1.g).toBe(0);
    expect(rgb_1.b).toBe(0);
  });

  it('set r g b property should return right rgb', () => {
    const rgb_1 = new Rgb();
    rgb_1.r     = 23;
    expect(rgb_1.toString()).toBe('rgb(23, 0, 0)');
    rgb_1.g = 24;
    expect(rgb_1.toString()).toBe('rgb(23, 24, 0)');
    rgb_1.b = 25;
    expect(rgb_1.toString()).toBe('rgb(23, 24, 25)');

    const rgb_2 = new Rgb(23, 24, 25, 1);
    expect(rgb_2.toString()).toBe('rgb(23, 24, 25)');

    const rgb_3 = new Rgb(23, 24, 25, 0.5);
    expect(rgb_3.toString()).toBe('rgba(23, 24, 25, 0.5)');

    const rgb_4 = new Rgb(23, 24, 25, 0);
    expect(rgb_4.toString()).toBe('rgba(23, 24, 25, 0)');
  });

  it('brighter rgb color should return brighter color', () => {
    const rgb_1   = new Rgb(0, 0, 0, 0);
    const n_rgb_1 = rgb_1.brighter();
    expect(n_rgb_1.toString()).toBe('rgba(0, 0, 0, 0)');
    const n_rgb_2 = rgb_1.brighter(1);
    expect(n_rgb_2.toString()).toBe('rgba(0, 0, 0, 0)');
    const n_rgb_3 = rgb_1.brighter(2);
    expect(n_rgb_3.toString()).toBe('rgba(0, 0, 0, 0)');

    const rgb_2    = new Rgb(1, 1, 1, 1);
    const n2_rgb_2 = rgb_2.brighter(2);
    expect(n2_rgb_2.toString()).toBe('rgb(2, 2, 2)');

    const rgb_3    = new Rgb(1, 1, 1, 0.5);
    const n2_rgb_3 = rgb_3.brighter(2);
    expect(n2_rgb_3.toString()).toBe('rgba(2, 2, 2, 0.5)');
  });
});
