import * as Util from '../../util/index';

export class Clip {
  type = 'clip';

  match() {
    return false;
  }

  constructor(cfg) {
    const el = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'clipPath'
    );
    const id = Util.uniqueId('clip_');
    if (cfg.get('el')) {
      el.appendChild(cfg.get('el'));
    } else if (Util.isString(cfg.nodeName)) {
      el.appendChild(cfg);
    } else {
      throw 'clip element should be a instance of Shape or a SVG node';
    }
    el.setAttribute('id', id);
    this.__cfg   = {el, id};
    this.__attrs = {config: cfg};
    return this;
  }
}
