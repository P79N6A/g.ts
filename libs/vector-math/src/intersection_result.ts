/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { Vector3 } from './vector3';

/// Defines a result of an intersection test.

export class IntersectionResult {
  /// The penetration depth of the intersection.
  public depth: number;

  /// The [axis] of the intersection.
  public axis = Vector3.zero();
}
