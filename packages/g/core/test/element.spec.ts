
import { Matrix3 } from '../../../../libs/vector-math/src/matrix3';
import {Element} from '../src/element';

describe('Element', function() {
  it('constructor', function() {
    const e = new Element({
      id: 'aaa',
      attrs: {
        width: 20,
        height: 30,
        stroke: '#231'
      }
    });

    expect(e.__cfg).not.toBeUndefined();
    expect(e.__cfg.id).toBe('aaa');
    expect(e.__attrs).not.toBeUndefined();
    expect(e.__attrs.width).toBe(20);
    expect(e.__attrs.height).toBe(30);
    expect(e.attr('matrix')).not.toBeUndefined();
    const m = Matrix3;
    expect(Matrix3.exactEquals(e.attr('matrix'), m)).toBe(true);
  });

  it('set and get', function() {
    const e = new Element();
    let a = 123;
    expect(a).toBe(123);
    e.__setTest = function(v) {
      a = 321;
      return v - 1;
    };
    e.set('test', 1111);
    expect(e.get('test')).toBe(1110);
    expect(a).toBe(321);
  });

  it('eventEmitter', function() {
    const ele = new Element();
    expect(typeof ele.on).toBe('function');
    expect(typeof ele.off).toBe('function');
    expect(typeof ele.trigger).toBe('function');
  });

  it('add event listener', function() {
    const ele = new Element();
    let count = 1;
    ele.on('test', function(v) {
      count += v;
    });
    ele.trigger('test', [ 12 ]);
    expect(count).toBe(13);
    expect(ele._events.hasOwnProperty('test')).toBeTruthy();

    ele.destroy();
    expect(ele._events).toBeUndefined();
  });
});
