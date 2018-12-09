import { makeDecorator } from '../core/annotation/decorators';


export const Cfg = makeDecorator('config', (data) => {
  return data;
});

export const Attr = makeDecorator('attribute', (data) => {
  return data;
});

