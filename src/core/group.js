const Util = require('../util/index');
const Element = require('./element');
const Shape = require('../shape/index');
const SHAPE_MAP = {}; // 缓存图形类型
const INDEX = '_INDEX';

function getComparer(compare) {
  return function(left, right) {
    const result = compare(left, right);
    return result === 0 ? left[INDEX] - right[INDEX] : result;
  };
}

const Group = function(cfg) {
  Group.superclass.constructor.call(this, cfg);
  this.set('children', []);

  this._beforeRenderUI();
  this._renderUI();
  this._bindUI();
};

function initClassCfgs(c) {
  if (c.__cfg || c === Group) {
    return;
  }
  const superCon = c.superclass.constructor;
  if (superCon && !superCon.__cfg) {
    initClassCfgs(superCon);
  }
  c.__cfg = {};

  Util.merge(c.__cfg, superCon.__cfg);
  Util.merge(c.__cfg, c.CFG);
}

Util.extend(Group, Element);

Util.augment(Group, {
  isGroup: true,
  canFill: true,
  canStroke: true,
  init(id) {
    Group.superclass.init.call(this);
    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    id = id || Util.uniqueId('g_');
    shape.setAttribute('id', id);
    this.setSilent('el', shape);
    this.setSilent('id', id);
  },
  getDefaultCfg() {
    initClassCfgs(this.constructor);
    return Util.merge({}, this.constructor.__cfg);
  },
  _beforeRenderUI() {},
  _renderUI() {},
  _bindUI() {},
  addShape(type, cfg) {
    const canvas = this.get('canvas');
    cfg = cfg || {};
    let shapeType = SHAPE_MAP[type];
    if (!shapeType) {
      shapeType = Util.upperFirst(type);
      SHAPE_MAP[type] = shapeType;
    }
    if (cfg.attrs) {
      const attrs = cfg.attrs;
      if (type === 'text') { // 临时解决
        const topFontFamily = canvas.get('fontFamily');
        if (topFontFamily) {
          attrs.fontFamily = attrs.fontFamily || topFontFamily;
        }
      }
    }
    cfg.canvas = canvas;
    cfg.defs = this.get('defs');
    cfg.type = type;
    const rst = new Shape[shapeType](cfg);
    this.add(rst);
    return rst;
  },
  /** 添加图组
   * @param  {Function|Object|undefined} param 图组类
   * @param  {Object} cfg 配置项
   * @return {Object} rst 图组
   */
  addGroup(param, cfg) {
    const canvas = this.get('canvas');
    let rst;
    cfg = Util.merge({}, cfg);
    if (Util.isFunction(param)) {
      if (cfg) {
        cfg.canvas = canvas;
        cfg.parent = this;
        rst = new param(cfg);
      } else {
        rst = new param({
          canvas,
          parent: this
        });
      }
      this.add(rst);
    } else if (Util.isObject(param)) {
      param.canvas = canvas;
      rst = new Group(param);
      this.add(rst);
    } else if (param === undefined) {
      rst = new Group();
      this.add(rst);
    } else {
      return false;
    }
    return rst;
  },
  /** 绘制背景
   * @param  {Array} padding 内边距
   * @param  {Attrs} attrs 图形属性
   * @param  {Shape} backShape 背景图形
   * @return {Object} 背景层对象
   */
  renderBack(padding, attrs) {
    let backShape = this.get('backShape');
    const innerBox = this.getBBox();
    // const parent = this.get('parent'); // getParent
    Util.merge(attrs, {
      x: innerBox.minX - padding[3],
      y: innerBox.minY - padding[0],
      width: innerBox.width + padding[1] + padding[3],
      height: innerBox.height + padding[0] + padding[2]
    });
    if (backShape) {
      backShape.attr(attrs);
    } else {
      backShape = this.addShape('rect', {
        zIndex: -1,
        attrs
      });
    }
    this.set('backShape', backShape);
    this.sort();
    return backShape;
  },
  removeChild(item, destroy) {
    if (arguments.length >= 2) {
      if (this.contain(item)) {
        item.remove(destroy);
      }
    } else {
      if (arguments.length === 1) {
        if (Util.isBoolean(item)) {
          destroy = item;
        } else {
          if (this.contain(item)) {
            item.remove(true);
          }
          return this;
        }
      }
      if (arguments.length === 0) {
        destroy = true;
      }

      Group.superclass.remove.call(this, destroy);
    }
    return this;
  },
  /**
   * 向组中添加shape或者group
   * @param {Object} items 图形或者分组
   * @return {Object} group 本尊
   */
  add(items) {
    const self = this;
    const children = self.get('children');
    const el = self.get('el');
    if (Util.isArray(items)) {
      Util.each(items, function(item) {
        const parent = item.get('parent');
        if (parent) {
          parent.removeChild(item, false);
        }
        if (self.get('dependencies')) {
          self.__addDependency();
        }
        self.__setEvn(item);
        el.appendChild(item.get('el'));
      });
      children.push.apply(children, items);
    } else {
      const item = items;
      const parent = item.get('parent');
      if (parent) {
        parent.removeChild(item, false);
      }
      self.__setEvn(item);
      if (item.get('dependencies')) {
        self.__addDependency(item);
      }
      el.appendChild(item.get('el'));
      children.push(item);
    }
    return self;
  },
  contain(item) {
    const children = this.get('children');
    return children.indexOf(item) > -1;
  },
  getChildByIndex(index) {
    const children = this.get('children');
    return children[index];
  },
  getFirst() {
    return this.getChildByIndex(0);
  },
  getLast() {
    const lastIndex = this.get('children').length - 1;
    return this.getChildByIndex(lastIndex);
  },
  __addDependency(item) {
    const dependencies = item.get('dependencies');
    item.attr(dependencies);
    item.__cfg.dependencies = {};
  },
  __setEvn(item) {
    const self = this;
    item.__cfg.parent = self;
    item.__cfg.parent = self;
    item.__cfg.canvas = self.__cfg.canvas;
    item.__cfg.defs = self.__cfg.defs;
    const clip = item.__attrs.clip;
    if (clip) {
      clip.setSilent('parent', self);
      clip.setSilent('context', self.get('context'));
    }
    const children = item.__cfg.children;
    if (children) {
      Util.each(children, function(child) {
        item.__setEvn(child);
      });
    }
  },
  getCount() {
    return this.get('children').length;
  },
  sort() {
    const children = this.get('children');
    // 稳定排序
    Util.each(children, (child, index) => {
      child[INDEX] = index;
      return child;
    });

    children.sort(getComparer(function(obj1, obj2) {
      return obj1.get('zIndex') - obj2.get('zIndex');
    }));

    return this;
  },
  find(id) {
    return this.findBy(function(item) {
      return item.get('id') === id;
    });
  },
  /**
   * 根据查找函数查找分组或者图形
   * @param  {Function} fn 匹配函数
   * @return {Canvas.Base} 分组或者图形
   */
  findBy(fn) {
    const children = this.get('children');
    let rst = null;

    Util.each(children, function(item) {
      if (fn(item)) {
        rst = item;
      } else if (item.findBy) {
        rst = item.findBy(fn);
      }
      if (rst) {
        return false;
      }
    });
    return rst;
  },
  findAllBy(fn) {
    const children = this.get('children');
    let rst = [];
    let childRst = [];
    Util.each(children, function(item) {
      if (fn(item)) {
        rst.push(item);
      }
      if (item.findAllBy) {
        childRst = item.findAllBy(fn);
        rst = rst.concat(childRst);
      }
    });
    return rst;
  },
  /**
   * 根据x，y轴坐标获取对应的图形
   * @param  {Number} x x坐标
   * @param  {Number} y y坐标
   * @return {Object}  最上面的图形
   */
  getShape(x, y) {
    const self = this;
    const clip = self.__attrs.clip;
    const children = self.__cfg.children;
    let rst;
    if (clip) {
      if (clip.inside(x, y)) {
        rst = find(children, x, y);
      }
    } else {
      rst = find(children, x, y);
    }
    return find(children, x, y);
  },
  /**
   * 根据点击事件的element获取对应的图形对象
   */
  findShape(el) {
    if (this.__cfg.visible && this.__cfg.capture && this.get('el') === el) {
      return this;
    }
    const children = this.__cfg.children;
    let shape = null;
    for (let i = children.length -1; i >= 0; i--) {
      const child = children[i];
      if (child.isGroup) {
        shape = child.findShape(el);
        shape = child.findShape(el);
      } else if(child.get('visible') && child.get('el') === el) {
        shape = child;
      }
      if (shape) {
        break;
      }
    }
    return shape;
  },
  clearTotalMatrix() {
    const m = this.get('totalMatrix');
    if (m) {
      this.setSilent('totalMatrix', null);
      const children = this.__cfg.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.clearTotalMatrix();
      }
    }
  },
  clear() {
    const children = this.get('children');

    while (children.length !== 0) {
      children[children.length - 1].remove();
    }
    return this;
  },
  destroy() {
    if (this.get('destroyed')) {
      return;
    }
    this.clear();
    Group.superclass.destroy.call(this);
  }
});

module.exports = Group;
