import * as Util from "../util";
import * as Interaction from "./base";
// const G2 = require('../core.js');
const BRUSH_TYPES = ["X", "Y", "XY", "POLYGON"];
const DEFAULT_TYPE = "XY";

@Interaction({
  name: 'brush'
})
export class Brush extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      type: DEFAULT_TYPE,
      startPoint: null,
      brushing: false,
      dragging: false,
      brushShape: null,
      container: null,
      polygonPath: null,
      style: {
        fill: "#C5D4EB",
        opacity: 0.3,
        lineWidth: 1,
        stroke: "#82A6DD"
      },
      draggable: false,
      dragOffX: 0,
      dragOffY: 0,
      inPlot: true,
      xField: null,
      yField: null
    });
  }
  constructor(cfg, view) {
    super(cfg, view);
    const me = this;
    this.filter = !this.draggable;
    this.type = this.type.toUpperCase();
    this.chart = view;
    if (BRUSH_TYPES.indexOf(this.type) === -1) {
      this.type = DEFAULT_TYPE;
    }
    const canvas = this.canvas;
    if (canvas) {
      let plotRange;
      canvas.get("children").map(child => {
        if (child.get("type") === "plotBack") {
          plotRange = child.get("plotRange");
          return false;
        }
        return child;
      });
      this.plot = {
        start: plotRange.bl,
        end: plotRange.tr
      };
    }
    if (view) {
      const coord = view.get("coord");
      this.plot = {
        start: coord.start,
        end: coord.end
      };
      const xScales = view._getScales("x");
      const yScales = view._getScales("y");
      this.xScale = this.xField ? xScales[this.xField] : view.getXScale();
      this.yScale = this.yField ? yScales[this.yField] : view.getYScales()[0];
    }
  }
  // onBurshstart() { }
  // onBrushmove() { }
  // onBrushend() {}
  // onDragstart() {}
  // onDragmove() {}
  // onDragend() {}
  start(ev) {
    const me = this;
    const { canvas, type, brushShape } = me;
    if (!type) return;
    const startPoint = { x: ev.offsetX, y: ev.offsetY };
    if (!startPoint.x) return;
    const isInPlot = this.plot && this.inPlot;
    const canvasDOM = canvas.get("canvasDOM");
    const pixelRatio = canvas.get("pixelRatio");
    if (this.selection) this.selection = null;
    if (this.draggable && brushShape && !brushShape.get("destroyed")) {
      // allow drag the brushShape
      if (
        brushShape.isHit(startPoint.x * pixelRatio, startPoint.y * pixelRatio)
      ) {
        canvasDOM.style.cursor = "move";
        this.selection = brushShape;
        this.dragging = true;
        if (type === "X") {
          this.dragoffX = startPoint.x - brushShape.attr("x");
          this.dragoffY = 0;
        } else if (type === "Y") {
          this.dragoffX = 0;
          this.dragoffY = startPoint.y - brushShape.attr("y");
        } else if (type === "XY") {
          this.dragoffX = startPoint.x - brushShape.attr("x");
          this.dragoffY = startPoint.y - brushShape.attr("y");
        } else if (type === "POLYGON") {
          const box = brushShape.getBBox();
          this.dragoffX = startPoint.x - box.minX;
          this.dragoffY = startPoint.y - box.minY;
        }
        if (isInPlot) {
          // this.selection.attr('clip', canvas.addShape('rect', {
          //   attrs: {
          //     x: this.plot.start.x,
          //     y: this.plot.end.y,
          //     width: this.plot.end.x - this.plot.start.x,
          //     height: this.plot.start.y - this.plot.end.y,
          //     fill: '#fff',
          //     fillOpacity: 0
          //   }
          // }));
        }
        this.onDragstart && this.onDragstart(ev);
      }
      this.prePoint = startPoint;
    }
    if (!this.dragging) {
      // brush start
      this.onBrushstart && this.onBrushstart(startPoint);
      let container = this.container;
      if (isInPlot) {
        const { start, end } = this.plot;
        if (
          startPoint.x < start.x ||
          startPoint.x > end.x ||
          startPoint.y < end.y ||
          startPoint.y > start.y
        )
          return;
      }
      canvasDOM.style.cursor = "crosshair";
      this.startPoint = startPoint;
      this.brushShape = null;
      this.brushing = true;
      if (!container) {
        container = canvas.addGroup({
          zIndex: 5 // upper
        });
        container.initTransform();
      } else {
        container.clear();
      }
      this.container = container;
      if (type === "POLYGON")
        this.polygonPath = `M ${startPoint.x} ${startPoint.y}`;
    }
  }
  process(ev) {
    const me = this;
    const {
      brushing,
      dragging,
      type,
      plot,
      startPoint,
      xScale,
      yScale,
      canvas
    } = me;
    if (!brushing && !dragging) {
      return;
    }
    let currentPoint = {
      x: ev.offsetX,
      y: ev.offsetY
    };
    const canvasDOM = canvas.get("canvasDOM");
    if (brushing) {
      canvasDOM.style.cursor = "crosshair";
      const { start, end } = plot;
      let polygonPath = this.polygonPath;
      let brushShape = this.brushShape;
      const container = this.container;
      if (this.plot && this.inPlot) {
        currentPoint = this._limitCoordScope(currentPoint);
      }
      let rectStartX;
      let rectStartY;
      let rectWidth;
      let rectHeight;
      if (type === "Y") {
        rectStartX = start.x;
        rectStartY =
          currentPoint.y >= startPoint.y ? startPoint.y : currentPoint.y;
        rectWidth = Math.abs(start.x - end.x);
        rectHeight = Math.abs(startPoint.y - currentPoint.y);
      } else if (type === "X") {
        rectStartX =
          currentPoint.x >= startPoint.x ? startPoint.x : currentPoint.x;
        rectStartY = end.y;
        rectWidth = Math.abs(startPoint.x - currentPoint.x);
        rectHeight = Math.abs(end.y - start.y);
      } else if (type === "XY") {
        if (currentPoint.x >= startPoint.x) {
          rectStartX = startPoint.x;
          rectStartY =
            currentPoint.y >= startPoint.y ? startPoint.y : currentPoint.y;
        } else {
          rectStartX = currentPoint.x;
          rectStartY =
            currentPoint.y >= startPoint.y ? startPoint.y : currentPoint.y;
        }
        rectWidth = Math.abs(startPoint.x - currentPoint.x);
        rectHeight = Math.abs(startPoint.y - currentPoint.y);
      } else if (type === "POLYGON") {
        polygonPath += `L ${currentPoint.x} ${currentPoint.y}`;
        this.polygonPath = polygonPath;
        if (!brushShape) {
          brushShape = container.addShape("path", {
            attrs: Util.mix(this.style, {
              path: polygonPath
            })
          });
        } else {
          !brushShape.get("destroyed") &&
            brushShape.attr(
              Util.mix({}, brushShape._attrs, {
                path: polygonPath
              })
            );
        }
      }
      if (type !== "POLYGON") {
        if (!brushShape) {
          brushShape = container.addShape("rect", {
            attrs: Util.mix(this.style, {
              x: rectStartX,
              y: rectStartY,
              width: rectWidth,
              height: rectHeight
            })
          });
        } else {
          !brushShape.get("destroyed") &&
            brushShape.attr(
              Util.mix({}, brushShape._attrs, {
                x: rectStartX,
                y: rectStartY,
                width: rectWidth,
                height: rectHeight
              })
            );
        }
      }
      this.brushShape = brushShape;
    } else if (dragging) {
      canvasDOM.style.cursor = "move";
      const selection = this.selection;
      if (selection && !selection.get("destroyed")) {
        if (type === "POLYGON") {
          const prePoint = this.prePoint;
          this.selection.translate(
            currentPoint.x - prePoint.x,
            currentPoint.y - prePoint.y
          );
        } else {
          this.dragoffX && selection.attr("x", currentPoint.x - this.dragoffX);
          this.dragoffY && selection.attr("y", currentPoint.y - this.dragoffY);
        }
      }
    }
    this.prePoint = currentPoint;
    canvas.draw();
    const { data, shapes, xValues, yValues } = this._getSelected();
    const eventObj = {
      data,
      shapes,
      x: currentPoint.x,
      y: currentPoint.y
    };
    if (xScale) {
      eventObj[xScale.field] = xValues;
    }
    if (yScale) {
      eventObj[yScale.field] = yValues;
    }
    this.onDragmove && this.onDragmove(eventObj);
    this.onBrushmove && this.onBrushmove(eventObj);
  }
  end(ev) {
    const me = this;
    const {
      data,
      shapes,
      xValues,
      yValues,
      canvas,
      type,
      startPoint,
      chart,
      container,
      xScale,
      yScale
    } = me;
    const { offsetX, offsetY } = ev;
    const canvasDOM = canvas.get("canvasDOM");
    canvasDOM.style.cursor = "default";
    if (
      Math.abs(startPoint.x - offsetX) <= 1 &&
      Math.abs(startPoint.y - offsetY) <= 1
    ) {
      // 防止点击事件
      this.brushing = false;
      this.dragging = false;
      return;
    }
    const eventObj = {
      data,
      shapes,
      x: offsetX,
      y: offsetY
    };
    if (xScale) {
      eventObj[xScale.field] = xValues;
    }
    if (yScale) {
      eventObj[yScale.field] = yValues;
    }
    if (this.dragging) {
      this.dragging = false;
      this.onDragend && this.onDragend(eventObj);
    } else if (this.brushing) {
      this.brushing = false;
      const brushShape = this.brushShape;
      let polygonPath = this.polygonPath;
      if (type === "POLYGON") {
        polygonPath += "z";
        brushShape &&
          !brushShape.get("destroyed") &&
          brushShape.attr(
            Util.mix({}, brushShape._attrs, {
              path: polygonPath
            })
          );
        this.polygonPath = polygonPath;
        canvas.draw();
      }
      if (this.onBrushend) {
        this.onBrushend(eventObj);
      } else if (chart && this.filter) {
        container.clear(); // clear the brush
        // filter data
        if (type === "X") {
          xScale &&
            chart.filter(xScale.field, val => {
              return xValues.indexOf(val) > -1;
            });
        } else if (type === "Y") {
          yScale &&
            chart.filter(yScale.field, val => {
              return yValues.indexOf(val) > -1;
            });
        } else {
          xScale &&
            chart.filter(xScale.field, val => {
              return xValues.indexOf(val) > -1;
            });
          yScale &&
            chart.filter(yScale.field, val => {
              return yValues.indexOf(val) > -1;
            });
        }
        chart.repaint();
      }
    }
  }
  reset() {
    const me = this;
    const { chart, filter, brushShape, canvas } = me;
    if (chart && filter) {
      chart.get("options").filters = {};
      chart.repaint();
    }
    if (brushShape) {
      brushShape.destroy();
      canvas.draw();
    }
  }
  _limitCoordScope(point) {
    const { plot } = this;
    const { start, end } = plot;
    if (point.x < start.x) {
      point.x = start.x;
    }
    if (point.x > end.x) {
      point.x = end.x;
    }
    if (point.y < end.y) {
      point.y = end.y;
    }
    if (point.y > start.y) {
      point.y = start.y;
    }
    return point;
  }
  _getSelected() {
    const me = this;
    const { chart, xScale, yScale, brushShape, canvas } = me;
    const pixelRatio = canvas.get("pixelRatio");
    const selectedShapes = [];
    const xValues = [];
    const yValues = [];
    const selectedData = [];
    if (chart) {
      const geoms = chart.get("geoms");
      geoms.map(geom => {
        const shapes = geom.getShapes();
        shapes.map(shape => {
          let shapeData = shape.get("origin");
          if (!Array.isArray(shapeData)) {
            // 线图、区域图等
            shapeData = [shapeData];
          }
          shapeData.map(each => {
            if (brushShape.isHit(each.x * pixelRatio, each.y * pixelRatio)) {
              selectedShapes.push(shape);
              const origin = each._origin;
              selectedData.push(origin);
              xScale && xValues.push(origin[xScale.field]);
              yScale && yValues.push(origin[yScale.field]);
            }
            return each;
          });
          return shape;
        });
        return geom;
      });
    }
    this.shapes = selectedShapes;
    this.xValues = xValues;
    this.yValues = yValues;
    this.data = selectedData;
    canvas.draw();
    return {
      data: selectedData,
      xValues,
      yValues,
      shapes: selectedShapes
    };
  }
}
