import * as Util from '../util';
import * as Interaction from './base';
import * as filterData from './helper/filter-data';
import * as getColDef from './helper/get-col-def';
import * as getLimitRange from './helper/get-limit-range';

const DAY_TIMESTAMPS = 86400000;
// const G2 = require('../core.js');
const DRAGGING_TYPES = ['X', 'Y', 'XY'];
const DEFAULT_TYPE   = 'X';

@Interaction({
  name: 'drag'
})
export class Drag extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      type                  : DEFAULT_TYPE,
      stepRatio             : 0.05,
      limitRange            : {},
      stepByField           : {},
      threshold             : 20,
      originScaleDefsByField: {},
      previousPoint         : null,
      isDragging            : false
    });
  }

  _disableTooltip() {
    const {chart}           = me;
    const tooltipController = chart.get('tooltipController');
    if (tooltipController) {
      this._showTooltip = true;
      chart.tooltip(false);
    }
  }

  _enableTooltip(ev) {
    const {chart} = me;
    if (this._showTooltip) {
      chart.tooltip(true);
      chart.showTooltip(ev);
    }
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    this.type  = this.type.toUpperCase();
    this.chart = chart;
    this.coord = chart.get('coord');
    const data = (this.data = chart.get('data'));
    // pre process
    filterData(chart);
    const scales = chart.getYScales();
    const xScale = chart.getXScale();
    scales.push(xScale);
    const scaleController = chart.get('scaleController');
    scales.forEach(scale => {
      const field                        = scale.field;
      this.limitRange[field]             = getLimitRange(data, scale);
      const def                          = scaleController.defs[field] || {};
      this.originScaleDefsByField[field] = Util.mix(def, {
        nice: !!def.nice
      });
      if (scale.isLinear) {
        this.stepByField[field] = (scale.max - scale.min) * this.stepRatio;
      }
    });
    if (DRAGGING_TYPES.indexOf(this.type) === -1) {
      this.type = DEFAULT_TYPE;
    }
    this._disableTooltip();
  }

  // onDragstart() { }
  // onDrag() { }
  // onDragend() { }
  _applyTranslate(scale, offset = 0, total) {
    if (scale.isLinear) {
      this._translateLinearScale(scale, offset, total);
    } else {
      this._translateCatScale(scale, offset, total);
    }
  }

  _translateCatScale(scale, offset, total) {
    const chart                        = this.chart;
    const {type, field, values, ticks} = scale;
    const colDef                       = getColDef(chart, field);
    const originValues                 = this.limitRange[field];
    const ratio                        = offset / total;
    const valueLength                  = values.length;
    const deltaCount                   = Math.max(1, Math.abs(parseInt(ratio * valueLength)));
    let firstIndex                     = originValues.indexOf(values[0]);
    let lastIndex                      = originValues.indexOf(values[valueLength - 1]);
    if (offset > 0 && firstIndex >= 0) {
      // right
      for (let i = 0; i < deltaCount && firstIndex > 0; i++) {
        firstIndex -= 1;
        lastIndex -= 1;
      }
      const newValues = originValues.slice(firstIndex, lastIndex + 1);
      let newTicks    = null;
      if (type === 'timeCat') {
        const tickGap = ticks.length > 2 ? ticks[1] - ticks[0] : DAY_TIMESTAMPS;
        for (let i = ticks[0] - tickGap; i >= newValues[0]; i -= tickGap) {
          ticks.unshift(i);
        }
        newTicks = ticks;
      }
      chart.scale(
        field,
        Util.mix({}, colDef, {
          values: newValues,
          ticks : newTicks
        })
      );
    } else if (offset < 0 && lastIndex <= originValues.length - 1) {
      // left
      for (
        let i = 0;
        i < deltaCount && lastIndex < originValues.length - 1;
        i++
      ) {
        firstIndex += 1;
        lastIndex += 1;
      }
      const newValues = originValues.slice(firstIndex, lastIndex + 1);
      let newTicks    = null;
      if (type === 'timeCat') {
        const tickGap = ticks.length > 2 ? ticks[1] - ticks[0] : DAY_TIMESTAMPS;
        for (
          let i = ticks[ticks.length - 1] + tickGap;
          i <= newValues[newValues.length - 1];
          i += tickGap
        ) {
          ticks.push(i);
        }
        newTicks = ticks;
      }
      chart.scale(
        field,
        Util.mix({}, colDef, {
          values: newValues,
          ticks : newTicks
        })
      );
    }
  }

  _translateLinearScale(scale, offset, total) {
    const {chart, limitRange} = me;
    // linear / cat
    const {min, max, field}   = scale;
    if (min === limitRange[field].min && max === limitRange[field].max) return;
    const ratio  = offset / total;
    const range  = max - min;
    const colDef = getColDef(chart, field);
    chart.scale(
      field,
      Util.mix({}, colDef, {
        nice: false,
        min : min + ratio * range,
        max : max + ratio * range
      })
    );
  }

  start(ev) {
    const {canvas}         = me;
    const canvasDOM        = canvas.get('canvasDOM');
    canvasDOM.style.cursor = 'pointer';
    // const coord = chart.get('coord');
    this.isDragging        = true;
    this.previousPoint     = {
      x: ev.x,
      y: ev.y
    };
    this._disableTooltip();
  }

  process(ev) {
    if (this.isDragging) {
      const {chart, type, canvas, coord, threshold} = me;
      const canvasDOM                               = canvas.get('canvasDOM');
      canvasDOM.style.cursor                        = 'move';
      // const coord = chart.get('coord');
      const previousPoint                           = this.previousPoint;
      const currentPoint                            = ev;
      const deltaX                                  = currentPoint.x - previousPoint.x;
      const deltaY                                  = currentPoint.y - previousPoint.y;
      let modified                                  = false;
      if (Math.abs(deltaX) > threshold && type.indexOf('X') > -1) {
        modified     = true;
        const xScale = chart.getXScale();
        this._applyTranslate(
          xScale,
          xScale.isLinear ? -deltaX : deltaX,
          coord.width
        );
      }
      if (Math.abs(deltaY) > threshold && type.indexOf('Y') > -1) {
        modified      = true;
        const yScales = chart.getYScales();
        yScales.forEach(yScale => {
          this._applyTranslate(
            yScale,
            currentPoint.y - previousPoint.y,
            coord.height
          );
        });
      }
      if (modified) {
        this.previousPoint = currentPoint;
        chart.repaint();
      }
    }
  }

  end(ev) {
    this.isDragging        = false;
    const {canvas}         = me;
    const canvasDOM        = canvas.get('canvasDOM');
    canvasDOM.style.cursor = 'default';
    this._enableTooltip(ev);
  }

  reset() {
    const {view, originScaleDefsByField} = me;
    const scales                         = view.getYScales();
    const xScale                         = view.getXScale();
    scales.push(xScale);
    scales.forEach(scale => {
      if (scale.isLinear) {
        const field = scale.field;
        view.scale(field, originScaleDefsByField[field]);
      }
    });
    view.repaint();
    this._disableTooltip();
  }
}
