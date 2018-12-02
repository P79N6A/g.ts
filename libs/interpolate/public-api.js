"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var interpolate_value_1 = require("./src/wrapper/interpolate-value");
exports.interpolate = interpolate_value_1.interpolateValue;
var interpolate_array_1 = require("./src/wrapper/interpolate-array");
exports.interpolateArray = interpolate_array_1.interpolateArray;
var interpolate_b_spline_1 = require("./src/wrapper/interpolate-b-spline");
exports.interpolateBSpline = interpolate_b_spline_1.interpolateBSpline;
var interpolate_b_spline_closed_1 = require("./src/wrapper/interpolate-b-spline-closed");
exports.interpolateBSplineClosed = interpolate_b_spline_closed_1.interpolateBSplineClosed;
var interpolate_date_1 = require("./src/wrapper/interpolate-date");
exports.interpolateDate = interpolate_date_1.interpolateDate;
var interpolate_number_1 = require("./src/wrapper/interpolate-number");
exports.interpolateNumber = interpolate_number_1.interpolateNumber;
var interpolate_object_1 = require("./src/wrapper/interpolate-object");
exports.interpolateObject = interpolate_object_1.interpolateObject;
var interpolate_round_1 = require("./src/wrapper/interpolate-round");
exports.interpolateRound = interpolate_round_1.interpolateRound;
var interpolate_string_1 = require("./src/wrapper/interpolate-string");
exports.interpolateString = interpolate_string_1.interpolateString;
// export { interpolateTransformCss, interpolateTransformSvg } from './src/interpolate/transform/index';
var interpolate_zoom_1 = require("./src/wrapper/interpolate-zoom");
exports.interpolateZoom = interpolate_zoom_1.interpolateZoom;
var interpolate_rgb_1 = require("./src/wrapper/interpolate-rgb");
exports.interpolateRgb = interpolate_rgb_1.interpolateRgb;
exports.interpolateRgbBSpline = interpolate_rgb_1.interpolateRgbBSpline;
exports.interpolateRgbBSplineClosed = interpolate_rgb_1.interpolateRgbBSplineClosed;
var interpolate_hsl_1 = require("./src/wrapper/interpolate-hsl");
exports.interpolateHsl = interpolate_hsl_1.interpolateHsl;
exports.interpolateHslLong = interpolate_hsl_1.interpolateHslLong;
var interpolate_lab_1 = require("./src/wrapper/interpolate-lab");
exports.interpolateLab = interpolate_lab_1.interpolateLab;
var interpolate_hcl_1 = require("./src/wrapper/interpolate-hcl");
exports.interpolateHcl = interpolate_hcl_1.interpolateHcl;
exports.interpolateHclLong = interpolate_hcl_1.interpolateHclLong;
var interpolate_cubehelix_1 = require("./src/wrapper/interpolate-cubehelix");
exports.interpolateCubehelix = interpolate_cubehelix_1.interpolateCubehelix;
exports.interpolateCubehelixLong = interpolate_cubehelix_1.interpolateCubehelixLong;
exports.interpolateCubehelixFactory = interpolate_cubehelix_1.interpolateCubehelixFactory;
exports.interpolateCubehelixLongFactory = interpolate_cubehelix_1.interpolateCubehelixLongFactory;
var interpolate_piecewise_1 = require("./src/wrapper/interpolate-piecewise");
exports.interpolatePiecewise = interpolate_piecewise_1.interpolatePiecewise;
var quantize_1 = require("./src/fn/quantize");
exports.quantize = quantize_1.quantize;
//# sourceMappingURL=public-api.js.map