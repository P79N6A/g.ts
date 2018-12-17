import {
  getBoundingClientRect,
  getHeight,
  getOuterHeight,
  getOuterWidth,
  getStyle,
  getWidth,
  modifyCSS
} from '../src/dom';

describe('DomUtils', () => {
  const nodeNotExist = null;

  it('getBoundingClientRect(node, defaultValue)', () => {
    expect(() => {
      getBoundingClientRect(nodeNotExist);
    }).not.toThrowError();
  });

  it('getStyle(node, name, defaultValue)', () => {
    expect(() => {
      getStyle(nodeNotExist, 'width');
    }).not.toThrowError();
    expect(getStyle(nodeNotExist, 'width', 450)).toBe(450);
  });

  it('modifyCSS(node, css)', () => {
    expect(() => {
      modifyCSS(nodeNotExist, {
        width: '500px'
      });
    }).not.toThrowError();
  });

  it('getWidth(node, defaultValue)', () => {
    expect(() => {
      getWidth(nodeNotExist, 500);
    }).not.toThrowError();
    expect(getWidth(nodeNotExist, 450)).toBe(450);
  });

  it('getHeight(node, defaultValue)', () => {
    expect(() => {
      getHeight(nodeNotExist, 500);
    }).not.toThrowError();
    expect(getHeight(nodeNotExist, 450)).toBe(450);
  });

  it('getOuterWidth(node, defaultValue)', () => {
    expect(() => {
      getOuterWidth(nodeNotExist, 500);
    }).not.toThrowError();
    expect(getOuterWidth(nodeNotExist, 450)).toBe(450);
  });

  it('getOuterHeight(node, defaultValue)', () => {
    expect(() => {
      getOuterHeight(nodeNotExist, 500);
    }).not.toThrowError();
    expect(getOuterHeight(nodeNotExist, 450)).toBe(450);
  });

  it('addEventListener(node, eventType, callback)', () => {
    expect(() => {
      addEventListener(nodeNotExist, 'click', () => {});
    }).not.toThrowError();
  });
});
