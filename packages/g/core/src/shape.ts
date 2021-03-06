import { each, Inside, isArray, isBlank } from '@gradii/g/util';
import { Vector3 } from '@gradii/vector-math';
import { Element } from './element';

export interface IsPointInPath {
  isPointInPath(x, y): boolean
}

const ARRAY_ATTRS = {
  matrix  : 'matrix',
  path    : 'path',
  points  : 'points',
  lineDash: 'lineDash'
};

function _cloneArrayAttr(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (isArray(arr[i])) {
      result.push([].concat(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

export class Shape extends Element implements IsPointInPath {
  public isShape = true;

  constructor(cfg) {
    super(cfg);
  }

  drawInner(context) {
    const attrs = this._attrs;
    // this.createPath(context); todo fixme
    const originOpacity = context.globalAlpha;
    if (this.hasFill()) {
      const fillOpacity = attrs.fillOpacity;
      if (!isBlank(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
        context.fill();
        context.globalAlpha = originOpacity;
      } else {
        context.fill();
      }
    }
    if (this.hasStroke()) {
      const lineWidth = this._attrs.lineWidth;
      if (lineWidth > 0) {
        const strokeOpacity = attrs.strokeOpacity;
        if (!isBlank(strokeOpacity) && strokeOpacity !== 1) {
          context.globalAlpha = strokeOpacity;
        }
        context.stroke();
      }
    }
    this.afterPath(context);
  }

  afterPath(...args);
  afterPath() {}

  /**
   * 击中图形时是否进行包围盒判断
   * @return {Boolean} [description]
   */
  isHitBox() {
    return true;
  }

  /**
   * 节点是否能够被击中
   * @param {Number} x x坐标
   * @param {Number} y y坐标
   * @return {Boolean} 是否在图形中
   */
  isHit(x, y) {
    const v    = new Vector3(x, y, 1);
    // this.invert(v); // canvas todo fixme
    if (this.isHitBox()) {
      const box = this.getBBox();
      if (
        box &&
        !Inside.box(box.minX, box.maxX, box.minY, box.maxY, v[0], v[1])
      ) {
        return false;
      }
    }
    const clip = this._attrs.clip;
    if (clip) {
      clip.invert(v, this.get('canvas'));
      if (clip.isPointInPath(v[0], v[1])) {
        return this.isPointInPath(v[0], v[1]);
      }
    } else {
      return this.isPointInPath(v[0], v[1]);
    }
    return false;
  }

  /**
   * @protected
   * 计算包围盒
   * @return {Object} 包围盒
   */
  calculateBox() {
    return null;
  }

  // 获取拾取时线的宽度，需要考虑附加的线的宽度
  getHitLineWidth() {
    const attrs = this._attrs;
    // if (!attrs.stroke) {
    //   return 0;
    // }
    const lineAppendWidth = attrs.lineAppendWidth || 0;
    const lineWidth       = attrs.lineWidth || 0;
    return lineWidth + lineAppendWidth;
  }

  // 清除当前的矩阵
  clearTotalMatrix() {
    this._cfg.totalMatrix = null;
    this._cfg.region      = null;
  }

  clearBBox() {
    this._cfg.box    = null;
    this._cfg.region = null;
  }

  getBBox() {
    let box = this._cfg.box;
    // 延迟计算
    if (!box) {
      box = this.calculateBox();
      if (box) {
        box.x      = box.minX;
        box.y      = box.minY;
        box.width  = box.maxX - box.minX;
        box.height = box.maxY - box.minY;
      }
      this._cfg.box = box;
    }
    return box;
  }

  clone() {
    /* todo fixme
    let clone    = null;
    const _attrs = this._attrs;
    const attrs  = {};
    each(_attrs, (i, k) => {
      if (ARRAY_ATTRS[k] && isArray(_attrs[k])) {
        attrs[k] = _cloneArrayAttr(_attrs[k]);
      } else {
        attrs[k] = _attrs[k];
      }
    });
    clone             = new this.constructor({attrs});
    // zIndex也是绘图属性，但是在cfg中，特殊处理
    clone._cfg.zIndex = this._cfg.zIndex;
    return clone;
    */
  }

  isPointInPath(x, y): boolean {
    return false;
  }
}
