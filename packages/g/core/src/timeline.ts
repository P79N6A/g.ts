/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import * as Easing from '@gradii/easing';
import { interpolate, interpolateArray } from '@gradii/interpolate'; // 目前整体动画只需要数值和数组的差值计算
import { isEqual, isNumber, parsePathString } from '@gradii/g/util';


function _update(self, animator, ratio) {
  const cProps    = {}; // 此刻属性
  const toAttrs   = animator.toAttrs;
  const fromAttrs = animator.fromAttrs;
  const toMatrix  = animator.toMatrix;
  if (self.get('destroyed')) {
    return;
  }
  let interf; //  差值函数
  for (const k in toAttrs) {
    if (!isEqual(fromAttrs[k], toAttrs[k])) {
      if (k === 'path') {
        const toPath   = parsePathString(toAttrs[k]); // 终点状态
        const fromPath = parsePathString(fromAttrs[k]); // 起始状态
        cProps[k]      = [];
        for (let i = 0; i < toPath.length; i++) {
          const toPathPoint   = toPath[i];
          const fromPathPoint = fromPath[i];
          const cPathPoint    = [];
          for (let j = 0; j < toPathPoint.length; j++) {
            if (isNumber(toPathPoint[j]) && fromPathPoint) {
              interf = interpolate(fromPathPoint[j], toPathPoint[j]);
              cPathPoint.push(interf(ratio));
            } else {
              cPathPoint.push(toPathPoint[j]);
            }
          }
          cProps[k].push(cPathPoint);
        }
      } else {
        interf    = interpolate(fromAttrs[k], toAttrs[k]);
        cProps[k] = interf(ratio);
      }
    }
  }
  if (toMatrix) {
    const mf = interpolateArray(animator.fromMatrix, toMatrix);
    const cM = mf(ratio);
    self.setMatrix(cM);
  }
  self.attr(cProps);
}

function update(shape, animator, elapsed) {
  const startTime = animator.startTime;
  // 如果还没有开始执行或暂停，先不更新
  if (elapsed < (startTime + animator.delay) || animator.isPaused) {
    return false;
  }
  let ratio;
  let isFinished = false;
  const duration = animator.duration;
  const easing   = animator.easing;
  // 已执行时间
  elapsed        = elapsed - startTime - animator.delay;
  if (animator.toAttrs.repeat) {
    ratio = (elapsed % duration) / duration;
    ratio = Easing[easing](ratio);
  } else {
    ratio = elapsed / duration;
    if (ratio < 1) {
      ratio = Easing[easing](ratio);
    } else {
      ratio = 1;
      if (animator.callback) {
        animator.callback();
      }
      isFinished = true;
    }
  }
  _update(shape, animator, ratio);
  return isFinished;
}

export class Timeline {
  _animators = [];
  _current = 0;
  _timer = null;

  constructor() {
    // 待执行动画的队列
    this._animators = [];
    // 当前时间
    this._current   = 0;
    // 计时器实例
    this._timer     = null;
  };

  initTimer() {
    /* todo fixme
    let isFinished = false;
    let shape,
        animators,
        animator,
        canvas;
    this._timer    = zTimer(elapsed => {
      this._current = elapsed;
      if (this._animators.length > 0) {
        for (let i = this._animators.length - 1; i >= 0; i--) {
          shape = this._animators[i];
          if (shape.get('destroyed')) {
            // 如果已经被销毁，直接移出队列
            this.removeAnimator(i);
            continue;
          }
          if (!canvas) {
            canvas = shape.get('canvas');
          }
          if (!shape.get('pause').isPaused) {
            animators = shape.get('animators');
            for (let j = animators.length - 1; j >= 0; j--) {
              animator   = animators[j];
              isFinished = update(shape, animator, elapsed);
              if (isFinished) {
                animators.splice(j, 1);
                isFinished = false;
              }
            }
          }
          if (animators.length === 0) {
            this.removeAnimator(i);
          }
        }
        if (canvas) {
          canvas.draw();
        }
      }
    });
    */
  }

  addAnimator(shape) {
    // this._animators.push(shape); todo fixme
  }

  removeAnimator(index) {
    // this._animators.splice(index, 1); todo fixme
  }

  clear() {
    // this._animators = []; todo fixme
  }

  isAnimating() {
    // return !!this._animators.length; todo fixme
  }

  getTime() {
    // return this._current; todo fixme
  }
}
