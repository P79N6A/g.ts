/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { Attrs, ShapeAttr } from '@gradii/g/core';
import { isString } from '@gradii/g/util';

@Attrs({
  x      : 0,
  y      : 0,
  img    : undefined,
  width  : 0,
  height : 0,
  sx     : null,
  sy     : null,
  swidth : null,
  sheight: null
})
export class ImageSvgGraphic extends ShapeAttr {
  type = 'image';

  constructor(cfg) {
    super(cfg);
  }

  _afterSetAttrImg(img) {
    this._setAttrImg(img);
  }

  _afterSetAttrAll(params) {
    if (params.img) {
      this._setAttrImg(params.img);
    }
  }

  _setAttrImg(image) {
    const self  = this;
    const el    = this.get('el');
    const attrs = self.__attrs;
    const img   = image;
    if (isString(img)) {
      // 如果传入的
      el.setAttribute('href', img);
    } else if (img instanceof ImageSvgGraphic) {
      if (!attrs.width) {
        self.attr('width', img.width);
      }
      if (!attrs.height) {
        self.attr('height', img.height);
      }
      el.setAttribute('href', img.src);
    } else if (
      img instanceof HTMLElement &&
      isString(img.nodeName) &&
      img.nodeName.toUpperCase() === 'CANVAS'
    ) {
      el.setAttribute('href', img.toDataURL());
    } else if (img instanceof ImageData) {
      const canvas = document.createElement('canvas');
      canvas.setAttribute('width', img.width);
      canvas.setAttribute('height', img.height);
      canvas.getContext('2d').putImageData(img, 0, 0);
      if (!attrs.width) {
        self.attr('width', img.width);
      }
      if (!attrs.height) {
        self.attr('height', img.height);
      }
      el.setAttribute('href', canvas.toDataURL());
    }
  }

  drawInner() {}

}
