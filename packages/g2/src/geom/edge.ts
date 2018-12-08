import * as GeomBase from "./base";
require("./shape/edge");
export class Edge extends GeomBase {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = "edge";
    cfg.shapeType = "edge";
    cfg.generatePoints = true;
    return cfg;
  }
}
GeomBase.Edge = Edge;
