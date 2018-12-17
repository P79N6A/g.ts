
const Elements = require('../../../src/core/element');

describe('Attributes', function() {
  it('init', function() {
    const e = new Elements({
      attrs: {
        width: 100,
        height: 50
      }
    });


    expect(e.__attrs.width).toBe(100);
    expect(e.__attrs.height).toBe(50);
  });

  it('attr get', function() {
    const e = new Elements({
      attrs: {
        width: 100,
        height: 50
      }
    });

    expect(e.attr('width')).toBe(100);
    expect(e.attr('height')).toBe(50);
  });

  it('attr set', function() {
    const e = new Elements();

    e.attr('width', 300);
    expect(e.attr('width')).toBe(300);
    e.attr('height', 40);
    expect(e.attr('height')).toBe(40);
    e.attr({
      width: 100,
      text: '123'
    });
    expect(e.attr('width')).toBe(100);
    expect(e.attr('text')).toBe('123');
  });

  it('attr fill', function() {
    const e = new Elements({
      attrs: {
        fill: '#333333'
      }
    });
    e.attr('fill', '#333333');
    expect(e.attr('fill')).toBe('#333333');
    expect(e.__attrs.fillStyle).toBe('#333333');

    e.attr('fill', 'red');
    expect(e.attr('fill')).toBe('red');
    expect(e.__attrs.fillStyle).toBe('red');
  });

  it('attr stroke', function() {
    const e = new Elements({
      attrs: {
        stroke: 'black'
      }
    });
    e.attr('stroke', 'black');
    expect(e.attr('stroke')).toBe('black');
    expect(e.__attrs.strokeStyle).toBe('black');

    e.attr('stroke', '#999');
    expect(e.attr('stroke')).toBe('#999');
    expect(e.__attrs.strokeStyle).toBe('#999');
  });

  it('attr opacity', function() {
    const e = new Elements({
      attrs: {
        opacity: 0.1
      }
    });

    expect(e.attr('opacity')).toBe(0.1);
    expect(e.__attrs.globalAlpha).toBe(0.1);

    e.attr('opacity', 0.3);

    expect(e.attr('opacity')).toBe(0.3);
    expect(e.__attrs.globalAlpha).toBe(0.3);
  });

  it('attrAll', function() {
    const e = new Elements({
      attrs: {
        width: 100,
        opacity: 0.2,
        stroke: '#222',
        fill: '#444'
      }
    });

    const attrs = e.attr();
    expect(attrs.opacity).toBe(0.2);
    expect(attrs.stroke).toBe('#222');
    expect(attrs.fill).toBe('#444');
    expect(attrs.width).toBe(100);
  });
});
