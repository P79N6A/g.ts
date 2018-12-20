/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { Shape } from '@gradii/g/core';
import { Inside, isBlank, isString } from '@gradii/g/util';

export class ImageCanvasGraphic extends Shape {
  public static ATTRS = {
    x      : 0,
    y      : 0,
    img    : undefined,
    width  : 0,
    height : 0,
    sx     : null,
    sy     : null,
    swidth : null,
    sheight: null,
  };

  public type = 'image';

  constructor(cfg?) {
    super(cfg);
  }

  public __afterSetAttrImg(img) {
    this.__setAttrImg(img);
  }

  public __afterSetAttrAll(params) {
    if (params.img) {
      this.__setAttrImg(params.img);
    }
  }

  public isHitBox() {
    return false;
  }

  public calculateBox() {
    const attrs  = this.__attrs;
    const x      = attrs.x;
    const y      = attrs.y;
    const width  = attrs.width;
    const height = attrs.height;

    return {
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height,
    };
  }

  public isPointInPath(x, y) {
    const attrs = this.__attrs;
    if (this.get('toDraw') || !attrs.img) {
      return false;
    }
    const rx     = attrs.x;
    const ry     = attrs.y;
    const width  = attrs.width;
    const height = attrs.height;
    return Inside.rect(rx, ry, width, height, x, y);
  }

  public __setLoading(loading) {
    const canvas = this.get('canvas');
    if (loading === false && this.get('toDraw') === true) {
      this.__cfg.loading = false;
      canvas.draw();
    }
    return loading;
  }

  public __setAttrImg(img) {
    const self  = this;
    const attrs = self.__attrs;
    if (isString(img)) {
      const image  = new Image();
      image.onload = function () {
        if (self.get('destroyed')) { return false; }
        self.attr('imgSrc', img);
        self.attr('img', image);
        const callback = self.get('callback');
        if (callback) {
          callback.call(self);
        }
        self.set('loading', false);
      };
      image.src    = img;
      self.set('loading', true);
    } else if (img instanceof Image) {
      if (!attrs.width) {
        self.attr('width', img.width);
      }

      if (!attrs.height) {
        self.attr('height', img.height);
      }
      return img;
    } else if (img instanceof HTMLElement && isString(img.nodeName) && img.nodeName.toUpperCase() === 'CANVAS') {
      if (!attrs.width) {
        self.attr('width', Number(img.getAttribute('width')));
      }

      if (!attrs.height) {
        self.attr('height', Number(img.getAttribute('height')));
      }
      return img;
    } else if (img instanceof ImageData) {
      if (!attrs.width) {
        self.attr('width', img.width);
      }

      if (!attrs.height) {
        self.attr('height', img.height);
      }
      return img;
    } else {
      return null;
    }
  }

  public drawInner(context) {
    if (this.get('loading')) {
      this.set('toDraw', true);
      return;
    }
    this.__drawImage(context);
  }

  public __drawImage(context) {
    const attrs   = this.__attrs;
    const x       = attrs.x;
    const y       = attrs.y;
    const img     = attrs.img;
    const width   = attrs.width;
    const height  = attrs.height;
    const sx      = attrs.sx;
    const sy      = attrs.sy;
    const swidth  = attrs.swidth;
    const sheight = attrs.sheight;
    this.set('toDraw', false);

    if (img instanceof Image || (
      img instanceof HTMLElement &&
      isString(img.nodeName) &&
      img.nodeName.toUpperCase() === 'CANVAS'
    )) {
      if (
        isBlank(sx) ||
        isBlank(sy) ||
        isBlank(swidth) ||
        isBlank(sheight)
      ) {
        context.drawImage(img, x, y, width, height);
        return;
      }
      if (
        !isBlank(sx) &&
        !isBlank(sy) &&
        !isBlank(swidth) &&
        !isBlank(sheight)
      ) {
        context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
        return;
      }
    } else if (img instanceof ImageData) {
      context.putImageData(img, x, y, sx || 0, sy || 0, swidth || width, sheight || height);
      return;
    }
    return;
  }
}
