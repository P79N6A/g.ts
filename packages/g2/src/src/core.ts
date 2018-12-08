import * as Scale from "@antv/scale/lib";
import * as G from "./renderer";
import * as Animate from "./animate/animate";
import * as Chart from "./chart/chart";
import * as Global from "./global";
import * as Shape from "./geom/shape/shape";
import * as Util from "./util";
const G2 = {
  // version
  version: Global.version,
  // visual encoding
  Animate,
  Chart,
  Global,
  Scale,
  Shape,
  Util,
  // render engine
  G,
  DomUtil: Util.DomUtil,
  MatrixUtil: Util.MatrixUtil,
  PathUtil: Util.PathUtil
};
G2.track = function(enable) {
  Global.trackable = enable;
};
require("./track");
// 保证两个版本共存
if (typeof window !== "undefined") {
  if (window.G2) {
    console.warn(
      `There are multiple versions of G2. Version ${
        G2.version
      }'s reference is 'window.G2_3'`
    );
  } else {
    window.G2 = G2;
  }
}
