import { InterpolatePiecewise } from '../interpolate/piecewise';

export function interpolateObject(values, interpolate) {
  return t => {
    return new InterpolatePiecewise(interpolate).interpolate(values).getResult(t);
  };
}
