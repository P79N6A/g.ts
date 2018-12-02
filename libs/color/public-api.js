"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-color)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./src/color"));
__export(require("./src/const"));
__export(require("./src/cubehelix"));
__export(require("./src/hcl"));
__export(require("./src/hsl"));
__export(require("./src/lab"));
__export(require("./src/rgb"));
var helper_1 = require("./src/helper");
exports.createColor = helper_1.create;
//# sourceMappingURL=public-api.js.map