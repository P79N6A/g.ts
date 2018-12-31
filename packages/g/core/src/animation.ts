/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { each, isFunction, isNumber, MatrixHelper, uniqueId } from '@gradii/g/util';

const ReservedProps = {delay: 'delay'};

function getFromAttrs(toAttrs, shape) {
  const rst = {};
  for (const k in toAttrs) {
    rst[k] = shape.attr(k);
  }
  return rst;
}

function getFormatProps(props, shape) {
  const rst = {
    matrix: null,
    attrs : {}
  };
  for (const k in props) {
    if (k === 'transform') {
      rst.matrix = MatrixHelper.transform(shape.getMatrix(), props[k]);
    } else if (k === 'matrix') {
      rst.matrix = props[k];
    } else if (!ReservedProps[k]) {
      rst.attrs[k] = props[k];
    }
  }
  return rst;
}

function checkExistedAttrs(animators, animator) {
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  each(animator.toAttrs, (v, k) => {
    each(animators, animator => {
      if (hasOwnProperty.call(animator.toAttrs, k)) {
        delete animator.toAttrs[k];
        delete animator.fromAttrs[k];
      }
    });
  });
  return animators;
}

export class Animation {
  /**
   * 执行动画
   * @param  {Object}   toProps  动画最终状态
   * @param  {Number}   duration 动画执行时间
   * @param  {String}   easing   动画缓动效果
   * @param  {Function} callback 动画执行后的回调
   * @param  {Number}   delay    动画延迟时间
   */
  animate(toProps, duration, easing, callback, delay = 0) {
    /* todo fixme
    this.set('animating', true);
    let timeline = this.get('timeline');
    if (!timeline) {
      timeline = this.get('canvas').get('timeline');
      this.setSilent('timeline', timeline);
    }
    let animators = this.get('animators') || [];
    // 初始化tick
    if (!timeline._timer) {
      timeline.initTimer();
    }
    if (isNumber(callback)) {
      delay    = callback;
      callback = null;
    }
    if (isFunction(easing)) {
      callback = easing;
      easing   = 'easeLinear';
    } else {
      easing = easing ? easing : 'easeLinear';
    }
    const formatProps = getFormatProps(toProps, this);
    // 记录动画属性
    const animator    = {
      fromAttrs : getFromAttrs(toProps, this),
      toAttrs   : formatProps.attrs,
      fromMatrix: Util.clone(this.getMatrix()),
      toMatrix  : formatProps.matrix,
      duration,
      easing,
      callback,
      delay,
      startTime : timeline.getTime(),
      id        : uniqueId()
    };
    // 如果动画队列中已经有这个图形了
    if (animators.length > 0) {
      // 先检查是否需要合并属性。若有相同的动画，将该属性从前一个动画中删除,直接用后一个动画中
      animators = checkExistedAttrs(animators, animator);
    } else {
      // 否则将图形添加到队列
      timeline.addAnimator(this);
    }
    animators.push(animator);
    this.setSilent('animators', animators);
    this.setSilent('pause', {isPaused: false});
    */
  }

  stopAnimate() {
    /* todo fixme
    const animators = this.get('animators');
    // 将动画执行到最后一帧，执行回调
    each(animators, animator => {
      this.attr(animator.toAttrs);
      if (animator.callback) {
        animator.callback();
      }
    });
    this.setSilent('animating', false);
    this.setSilent('animators', []);
    */
  }

  pauseAnimate() {
    /* todo fixme
    const timeline = this.get('timeline');
    // 记录下是在什么时候暂停的
    this.setSilent('pause', {
      isPaused : true,
      pauseTime: timeline.getTime()
    });
    */
    return this;
  }

  resumeAnimate() {
    /* todo fixme
    const timeline  = this.get('timeline');
    const current   = timeline.getTime();
    const animators = this.get('animators');
    const pauseTime = this.get('pause').pauseTime;
    // 之后更新属性需要计算动画已经执行的时长，如果暂停了，就把初始时间调后
    each(animators, animator => {
      animator.startTime  = animator.startTime + (current - pauseTime);
      animator._paused    = false;
      animator._pauseTime = null;
    });
    this.setSilent('pause', {
      isPaused: false
    });
    this.setSilent('animators', animators);
    */
    return this;
  }
}
