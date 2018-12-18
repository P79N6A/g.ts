import { Canvas } from '../src/canvas';

describe('tiny test canvas', () => {
  let c;

  beforeEach(() => {
    c = new Canvas()
  });

  it('tiny test canvas', () => {
    expect(c instanceof Canvas).toBe(true)
  });

  it('tiny test canvas shape', () => {
    expect(true).toBe(true);
  });
});
