import * as Util from '../util';

const DomUtil     = Util.DomUtil;
const EVENT_TYPES = ['start', 'process', 'end', 'reset'];

export class Interaction {
  getDefaultCfg() {
    return {
      startEvent  : 'mousedown',
      processEvent: 'mousemove',
      endEvent    : 'mouseup',
      resetEvent  : 'dblclick'
    };
  }

  _start(ev) {
    this.preStart && this.preStart(ev);
    this.start(ev);
    this.onStart && this.onStart(ev);
  }

  _process(ev) {
    this.preProcess && this.preProcess(ev);
    this.process(ev);
    this.onProcess && this.onProcess(ev);
  }

  _end(ev) {
    this.preEnd && this.preEnd(ev);
    this.end(ev);
    this.onEnd && this.onEnd(ev);
  }

  _reset(ev) {
    this.preReset && this.preReset(ev);
    this.reset(ev);
    this.onReset && this.onReset(ev);
  }

  start() {
    // TODO override
  }

  process() {
    // TODO override
  }

  end() {
    // TODO override
  }

  reset() {
    // TODO override
  }

  constructor(cfg, view) {

    const defaultCfg = this.getDefaultCfg();
    Util.assign(me, defaultCfg, cfg);
    this.view   = this.chart = view;
    this.canvas = view.get('canvas');
    this._bindEvents();
  }

  _bindEvents() {

    const canvas    = this.canvas;
    const canvasDOM = canvas.get('canvasDOM');
    this._clearEvents();
    Util.each(EVENT_TYPES, type => {
      const ucType               = Util.upperFirst(type);
      me[`_on${ucType}Listener`] = DomUtil.addEventListener(
        canvasDOM,
        me[`${type}Event`],
        Util.wrapBehavior(me, `_${type}`)
      );
    });
  }

  _clearEvents() {

    Util.each(EVENT_TYPES, type => {
      const listenerName = `_on${Util.upperFirst(type)}Listener`;
      me[listenerName] && me[listenerName].remove();
    });
  }

  destroy() {
    this._clearEvents();
  }
}
