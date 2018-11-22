import { InterpolateQuantize } from '../interpolate/quantize';

export function interpolateQuantize(n, interpolate) {
  return t => {
    return new InterpolateQuantize(interpolate).interpolate(n).getResult(t);
  };
}

export function quantize(interpolate) {
  return (n) => {
    return t => {
      return new InterpolateQuantize(interpolate).interpolate(n).getResult(t);
    };
  }
}
