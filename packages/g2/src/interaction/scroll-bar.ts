import * as Util from "../util";
import * as Interaction from "./base";
import * as getFieldRange from "./helper/get-field-range";
import * as getLimitRange from "./helper/get-limit-range";
const DEFAULT_TYPE = "X";

@Interaction({
  name: 'scroll-bar'
})
export class ScrollBar extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      startEvent: null,
      processEvent: null,
      endEvent: null,
      resetEvent: null,
      type: DEFAULT_TYPE,
      xStyle: {
        backgroundColor: "rgba(202, 215, 239, .2)",
        fillerColor: "rgba(202, 215, 239, .75)",
        size: 4,
        lineCap: "round",
        offsetX: 0,
        offsetY: -10
      },
      yStyle: {
        backgroundColor: "rgba(202, 215, 239, .2)",
        fillerColor: "rgba(202, 215, 239, .75)",
        size: 4,
        lineCap: "round",
        offsetX: 8,
        offsetY: 0
      }
    });
  }
  _renderScrollBars() {
    const chart = this.chart;
    const scrollBarCfg = chart.get("_scrollBarCfg");
    if (!scrollBarCfg) return;
    const data = chart.get("data");
    const plotRange = chart.get("plotRange");
    plotRange.width = Math.abs(plotRange.br.x - plotRange.bl.x);
    plotRange.height = Math.abs(plotRange.tl.y - plotRange.bl.y);
    const backPlot = chart.get("backPlot");
    const canvas = chart.get("canvas");
    const canvasHeight = canvas.get("height");
    const limitRange = chart.get("_limitRange");
    const type = scrollBarCfg.type;
    if (type.indexOf("X") > -1) {
      const {
        offsetX,
        offsetY,
        lineCap,
        backgroundColor,
        fillerColor,
        size
      } = scrollBarCfg.xStyle;
      const xScale = chart.getXScale();
      let xLimitRange = limitRange[xScale.field];
      if (!xLimitRange) {
        xLimitRange = getLimitRange(data, xScale);
        limitRange[xScale.field] = xLimitRange;
      }
      const currentRange = getFieldRange(xScale, xLimitRange, xScale.type);
      let horizontalBar = chart.get("_horizontalBar");
      const yPos = canvasHeight - size / 2 + offsetY;
      if (horizontalBar) {
        const progressLine = horizontalBar.get("children")[1];
        progressLine.attr({
          x1: Math.max(
            plotRange.bl.x + plotRange.width * currentRange[0] + offsetX,
            plotRange.bl.x
          ),
          x2: Math.min(
            plotRange.bl.x + plotRange.width * currentRange[1] + offsetX,
            plotRange.br.x
          )
        });
      } else {
        horizontalBar = backPlot.addGroup({
          className: "horizontalBar"
        });
        horizontalBar.addShape("line", {
          attrs: {
            x1: plotRange.bl.x + offsetX,
            y1: yPos,
            x2: plotRange.br.x + offsetX,
            y2: yPos,
            lineWidth: size,
            stroke: backgroundColor,
            lineCap
          }
        });
        horizontalBar.addShape("line", {
          attrs: {
            x1: Math.max(
              plotRange.bl.x + plotRange.width * currentRange[0] + offsetX,
              plotRange.bl.x
            ),
            y1: yPos,
            x2: Math.min(
              plotRange.bl.x + plotRange.width * currentRange[1] + offsetX,
              plotRange.br.x
            ),
            y2: yPos,
            lineWidth: size,
            stroke: fillerColor,
            lineCap
          }
        });
        chart.set("_horizontalBar", horizontalBar);
      }
    }
    if (type.indexOf("Y") > -1) {
      const {
        offsetX,
        offsetY,
        lineCap,
        backgroundColor,
        fillerColor,
        size
      } = scrollBarCfg.yStyle;
      const yScale = chart.getYScales()[0];
      let yLimitRange = limitRange[yScale.field];
      if (!yLimitRange) {
        yLimitRange = getLimitRange(data, yScale);
        limitRange[yScale.field] = yLimitRange;
      }
      const currentRange = getFieldRange(yScale, yLimitRange, yScale.type);
      let verticalBar = chart.get("_verticalBar");
      const xPos = size / 2 + offsetX;
      if (verticalBar) {
        const progressLine = verticalBar.get("children")[1];
        progressLine.attr({
          y1: Math.max(
            plotRange.tl.y + plotRange.height * currentRange[0] + offsetY,
            plotRange.tl.y
          ),
          y2: Math.min(
            plotRange.tl.y + plotRange.height * currentRange[1] + offsetY,
            plotRange.bl.y
          )
        });
      } else {
        verticalBar = backPlot.addGroup({
          className: "verticalBar"
        });
        verticalBar.addShape("line", {
          attrs: {
            x1: xPos,
            y1: plotRange.tl.y + offsetY,
            x2: xPos,
            y2: plotRange.bl.y + offsetY,
            lineWidth: size,
            stroke: backgroundColor,
            lineCap
          }
        });
        verticalBar.addShape("line", {
          attrs: {
            x1: xPos,
            y1: Math.max(
              plotRange.tl.y + plotRange.height * currentRange[0] + offsetY,
              plotRange.tl.y
            ),
            x2: xPos,
            y2: Math.min(
              plotRange.tl.y + plotRange.height * currentRange[1] + offsetY,
              plotRange.bl.y
            ),
            lineWidth: size,
            stroke: fillerColor,
            lineCap
          }
        });
        chart.set("_verticalBar", verticalBar);
      }
    }
  }
  constructor(cfg, chart) {
    super(cfg, chart);
    const me = this;
    chart.set("_limitRange", {});
    const defaultCfg = me.getDefaultCfg();
    chart.set("_scrollBarCfg", Util.deepMix({}, defaultCfg, cfg));
    chart.on("afterclear", () => {
      chart.set("_limitRange", {});
    });
    chart.on("beforechangedata", () => {
      chart.set("_limitRange", {});
    });
    chart.on("afterclearinner", () => {
      const hBar = chart.get("_horizontalBar");
      const vBar = chart.get("_verticalBar");
      hBar && hBar.remove(true);
      vBar && vBar.remove(true);
      chart.set("_horizontalBar", null);
      chart.set("_verticalBar", null);
    });
    chart.on("afterdrawgeoms", () => {
      me._renderScrollBars();
    });
    if (!chart.get("_horizontalBar") && !chart.get("_verticalBar")) {
      me._renderScrollBars();
    }
  }
}
