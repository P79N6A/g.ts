import Util from '../../util/index';
import Arrow from '../defs/arrow';
import Clip from '../defs/clip';
import Gradient from '../defs/gradient';
import Shadow from '../defs/shadow';
import Element from './element';

export class Defs extends Element {
  constructor(cfg) {
    super(cfg);
    this.set('children', []);
  }

  init() {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const id = Util.uniqueId('defs_');
    el.setAttribute('id', id);
    this.set('el', el);
    this.set('children', []);
  }

  find(type, attr) {
    const children = this.get('children');
    let result     = null;
    for (let i = 0; i < children.length; i++) {
      if (children[i].match(type, attr)) {
        result = children[i].__cfg.id;
        break;
      }
    }
    return result;
  }

  findById(id) {
    const children = this.get('children');
    let flag       = null;
    for (let i = 0; i < children.length; i++) {
      if (children[i].__cfg.id === id) {
        flag = children[i];
        break;
      }
    }
    return flag;
  }

  add(items) {
    const el       = this.get('el');
    const self     = this;
    const children = this.get('children');
    if (Util.isArray(items)) {
      Util.each(items, item => {
        const parent = item.get('parent');
        if (parent) {
          parent.removeChild(item, false);
          self._setContext(item);
        }
        el.appendChild(item.get('el'));
      });
      children.push.apply(children, items);
      return self;
    }
    if (self.findById(items.get('id'))) {
      return self;
    }
    const parent = items.get('parent');
    if (parent) {
      parent.removeChild(items, false);
    }
    self._add(items);
    el.appendChild(items.get('el'));
    return self;
  }

  _add(item) {
    this.get('el').appendChild(item.__cfg.el);
    this.get('children').push(item);
    item.__cfg.parent = this;
    item.__cfg.defs   = this;
    item.__cfg.canvas = this.__cfg.canvas;
  }

  addGradient(cfg) {
    const gradient = new Gradient(cfg);
    this._add(gradient);
    return gradient.__cfg.id;
  }

  addShadow(cfg) {
    const shadow = new Shadow(cfg);
    this._add(shadow);
    return shadow.__cfg.id;
  }

  addArrow(name, cfg, stroke) {
    const arrow = new Arrow(name, cfg, stroke);
    this._add(arrow);
    return arrow.__cfg.id;
  }

  addClip(cfg) {
    const clip = new Clip(cfg);
    this._add(clip);
    return clip.__cfg.id;
  }
}

class Defs {
  isGroup   = false;
  canFill   = false;
  canStroke = false;
  capture   = false;
  visible   = false;
}
