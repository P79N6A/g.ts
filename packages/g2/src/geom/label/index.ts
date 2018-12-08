import * as GeomLabels from "./geom-labels";
import * as PolarLabels from "./polar-labels";
import * as PieLabels from "./pie-labels";
import * as IntervalLabels from "./interval-labels";
const Labels = {
  getLabelsClass(coordType, type) {
    let rst = GeomLabels;
    if (coordType === "polar") {
      rst = PolarLabels;
    } else if (coordType === "theta") {
      // pie chart
      rst = PieLabels;
    } else if (type === "interval" || type === "polygon") {
      // bar
      rst = IntervalLabels;
    }
    return rst;
  }
};
