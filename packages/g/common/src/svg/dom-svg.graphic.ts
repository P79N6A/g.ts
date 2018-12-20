/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { Shape } from '@gradii/g/core';

export class DomSvgGraphic extends Shape {
  protected canFill   = true;
  protected canStroke = true;
  protected type      = 'dom';

  constructor(cfg) {
    super(cfg);
  }

  _afterSetAttrHtml() {
    const html = this.__attrs.html;
    const el   = this.get('el');
    if (typeof html === 'string') {
      el.innerHTML = html;
    } else {
      el.innerHTML = '';
      el.appendChild(html);
    }
  }

  _afterSetAttrAll(objs) {
    if ('html' in objs) {
      this._afterSetAttrHtml();
    }
  }
}
