import { Lab } from '../src/lab';
import { Rgb } from '../src/rgb';
import { expectEqualRgb } from './test-helper';

describe('test lab', () => {
  it('should lab can instant', () => {
    const lab_1 = new Lab(0, 0, 0);
    expectEqualRgb(lab_1.rgb(), new Rgb(0, 0, 0));
  });

  it('should lab represent right rgb color', () => {
    const lab_1 = new Lab(1, 2, 3);
    expectEqualRgb(lab_1.rgb(), new Rgb(0x0b, 0x02, 0x00));
  });

  it('should lab works with opacity', () => {

  });
});
