import { makeDecorator } from './decorators';


export const Cfg = makeDecorator('config', (data) => {
  return data;
});

export const Attrs = makeDecorator('attribute', (data) => {
  return data;
});

export const Interaction = makeDecorator('interaction', (data) => {
  return data;
});

