import { makeDecorator } from 'injection-js';


export const Cfg = makeDecorator('config', (data) => {
  return data;
});

export const Attrs = makeDecorator('attribute', (data) => {
  return data;
});

export const Interaction = makeDecorator('interaction', (data) => {
  return data;
});

export enum ShapeRenderPlatform {
  Canvas,
  Svg
}

export const ShapeAttr = makeDecorator('shape', (data) => {
  return data;
});
