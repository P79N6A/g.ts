import { InterpolateRgb } from '../interpolate/rgb';

export function interpolateRgb(start, end, gamma) {
  return t => {
    return new InterpolateRgb(gamma).interpolate(start, end).getResult(t);
  };
}
