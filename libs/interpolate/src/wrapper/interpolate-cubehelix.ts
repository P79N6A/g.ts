import { InterpolateCubehelix } from '../interpolate/cubehelix';

export function interpolateCubehelix(start, end, gramma?) {
  return t => {
    return new InterpolateCubehelix(gramma).interpolate(start, end).getResult(t);
  };
}
