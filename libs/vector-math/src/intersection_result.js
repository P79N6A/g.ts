"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var vector3_1 = require("./vector3");
/// Defines a result of an intersection test.
var IntersectionResult = /** @class */ (function () {
    function IntersectionResult() {
        /// The [axis] of the intersection.
        this.axis = vector3_1.Vector3.zero();
    }
    return IntersectionResult;
}());
exports.IntersectionResult = IntersectionResult;
//# sourceMappingURL=intersection_result.js.map