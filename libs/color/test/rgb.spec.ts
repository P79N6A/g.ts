import { Rgb } from '../src/rgb';

describe('test rgb', () => {

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
    rgb_1.r = 23;
    expect(rgb_1.toString()).toBe('rgb(23, 0, 0)');
    rgb_1.g = 24;
    expect(rgb_1.toString()).toBe('rgb(23, 24, 0)');
    rgb_1.b = 25;
    expect(rgb_1.toString()).toBe('rgb(23, 24, 25)');
  });

});
