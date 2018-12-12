import { EventEmitter } from '@gradii/g';
import * as Util from './util';

export class Base extends EventEmitter {
  protected _attrs;

  getDefaultCfg() {
    return {};
  }

  constructor(cfg) {
    super();
    const attrs      = {
      visible: true
    };
    const defaultCfg = this.getDefaultCfg();
    this._attrs      = attrs;
    Util.assign(attrs, defaultCfg, cfg);
  }

  get(name) {
    return this._attrs[name];
  }

  set(name, value) {
    this._attrs[name] = value;
  }

  show() {
    const visible = this.get('visible');
    if (!visible) {
      this.set('visible', true);
      this.changeVisible(true);
    }
  }

  hide() {
    const visible = this.get('visible');
    if (visible) {
      this.set('visible', false);
      this.changeVisible(false);
    }
  }

  /**
   * @protected
   * @param {Boolean} visible 是否可见
   * 显示、隐藏
   */
  changeVisible(visible) {}

  destroy() {
    this._attrs = {};
    this.removeAllListeners();
    this.destroyed = true;
  }
}
