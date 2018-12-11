/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */


import { Canvas } from '../../../src/canvas/canvas';

const div = document.createElement('div');
div.id    = 'canvas-img';
document.body.appendChild(div);
const baseHref = (document.getElementsByTagName('base')[0] || {}).href || './base';

describe('Image', function () {

  const can1   = document.createElement('canvas');
  can1.id      = 'img1';
  can1.width   = 800;
  can1.height  = 800;
  const canvas = new Canvas({
    containerId: 'canvas-img',
    width      : 200,
    height     : 200,
    pixelRatio : 1
  });

  const image = new Image({
    attrs: {
      x     : 0,
      y     : 0,
      width : 0,
      height: 0
    }
  });
  it('init attr', function () {
    expect(image.attr('x')).toBe(0);
    expect(image.attr('y')).toBe(0);
    expect(image.attr('img')).toBeUndefined();
    expect(image.attr('width')).toBe(0);
    expect(image.attr('height')).toBe(0);
    expect(image.attr('sx')).toBeUndefined();
    expect(image.attr('sy')).toBeUndefined();
    expect(image.attr('swidth')).toBeUndefined();
    expect(image.attr('sheight')).toBeUndefined();
    const box = image.getBBox();
    expect(box.minX).toBe(0);
    expect(box.maxX).toBe(0);
    expect(box.minY).toBe(0);
    expect(box.maxY).toBe(0);
  });

  it('img', function (done) {
    const img  = new Image();
    img.onload = function () {
      image.attr('img', img);
      const box = image.getBBox();
      expect(box.minX).toBe(0);
      expect(box.minY).toBe(0);
      expect(box.maxX).toBe(768);
      expect(box.maxY).toBe(1024);
      canvas.add(image);
      canvas.draw();
      done();
    };
    img.src    = (baseHref + '/test/fixtures/test1.jpg'); // relative to test/unit
  });

  it('canvas', function () {
    const image = new Image({
      attrs: {
        x: 0,
        y: 0
      }
    });
    const img   = can1;
    image.attr('img', img);
    const box = image.getBBox();
    expect(box.minX).toBe(0);
    expect(box.minY).toBe(0);
    expect(box.maxX).toBe(800);
    expect(box.maxY).toBe(800);
    canvas.add(image);
    canvas.draw();
  });

  it('imageData', function (done) {
    const image = new Image({
      attrs: {
        x: 0,
        y: 0
      }
    });
    const img   = can1.getContext('2d')
      .getImageData(0, 0, 800, 800);
    image.attr('img', img);
    const box = image.getBBox();
    expect(box.minX).toBe(0);
    expect(box.minY).toBe(0);
    expect(box.maxX).toBe(800);
    expect(box.maxY).toBe(800);
    canvas.add(image);
    canvas.draw();
    done();
  });

  it('width', function () {
    expect(image.attr('width')).toBe(768);
    image.attr('width', 200);
    expect(image.attr('width')).toBe(200);
    const box = image.getBBox();
    expect(box.minX).toBe(0);
    expect(box.maxX).toBe(200);
    canvas.draw();
  });

  it('height', function () {
    expect(image.attr('height')).toBe(1024);
    image.attr('height', 200);
    expect(image.attr('height')).toBe(200);
    const box = image.getBBox();
    expect(box.minY).toBe(0);
    expect(box.maxY).toBe(200);
    canvas.draw();
  });

  it('x', function () {
    image.attr('x', 10);
    expect(image.attr('x')).toBe(10);
    const box = image.getBBox();
    expect(box.minX).toBe(10);
    expect(box.maxX).toBe(210);
    canvas.draw();
  });

  it('y', function () {
    image.attr('y', 10);
    expect(image.attr('y')).toBe(10);
    const box = image.getBBox();
    expect(box.minY).toBe(10);
    expect(box.maxY).toBe(210);
    canvas.draw();
  });

  it('sx, sy, swidth, sheight', function () {
    image.attr({
      sx     : 20,
      sy     : 20,
      swidth : 100,
      sheight: 200
    });
    canvas.draw();
  });

  it('normal use', function () {
    const image1 = new Image({
      attrs: {
        x     : 300,
        y     : 300,
        width : 300,
        height: 300,
        // img: '../fixtures/test2.jpg' // relative to test/unit
        img   : (baseHref + '/test/fixtures/test1.jpg') // relative to test/unit
      }
    });

    canvas.add(image1);
    canvas.draw();
  });

  it('isHit', function () {
    expect(image.isHit(10, 10)).toBe(true);
    expect(image.isHit(210, 210)).toBe(true);
    expect(image.isHit(20, 20)).toBe(true);
    expect(image.isHit(31, 43)).toBe(true);
    expect(image.isHit(300, 300)).toBe(false);
  });

  // it('image onload && image.remove(true)', function() {
  //   const image = new Image({
  //     attrs: {
  //       img: 'http://alipay-rmsdeploy-assets-private.cn-hangzhou.alipay.aliyun-inc.com/rmsportal/IHJtPedUbTUPQCx.png'
  //     }
  //   });
  //   canvas.add(image);
  //   image.remove(true);
  //   canvas.draw();
  // });
});
