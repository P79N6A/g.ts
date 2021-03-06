import * as Util from "./util";
import * as Theme from "./theme/index";
const Global = {
  version: "3.4.0-beta.11",
  renderer: "canvas",
  trackable: true,
  trackingInfo: {},
  animate: true,
  widthRatio: {
    column: 1 / 2,
    rose: 0.9999999,
    multiplePie: 1 / 1.3 // 多层的饼图、环图
  },
  // 折线图、区域图、path 当只有一个数据时，是否显示成点
  showSinglePoint: false,
  connectNulls: false,
  scales: {},
  registerTheme(name, theme) {
    Theme[name] = theme;
  },
  setTheme(theme) {
    let newTheme = {};
    if (Util.isObject(theme)) {
      newTheme = theme;
    } else if (Util.indexOf(Object.keys(Theme), theme) !== -1) {
      newTheme = Theme[theme];
    } else {
      newTheme = Theme.default;
    }
    Util.deepMix(Global, newTheme);
  }
};
Global.setTheme("default");
