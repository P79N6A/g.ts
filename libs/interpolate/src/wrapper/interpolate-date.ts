import { InterpolateDate } from '../interpolate/date';

export function interpolateDate(start, end) {
  return t => {
    return new InterpolateDate().interpolate(start, end).getResult(t);
  };
}
