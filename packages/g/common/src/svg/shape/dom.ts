import * as Util from '../../util/index';
import * as Shape from '../core/shape';

Util.extend(Dom, Shape);

export class Dom {
  canFill   = true;
  canStroke = true;
  type      = 'dom';

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

  constructor(cfg) {
    super(cfg);
  }
}
