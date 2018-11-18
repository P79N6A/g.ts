export function expectEqualRgb(rgb1, rgb2) {

  expect(rgb1.hex()).toBe(rgb2.hex());
  // expect(rgb1.r).toBe(rgb2.r);
  // expect(rgb1.g).toBe(rgb2.g);
  // expect(rgb1.b).toBe(rgb2.b);
}

export function expectEqualRgba(rgba1, rgba2) {
  expect(rgba1.toString()).toBe(rgba2.toString());
}
