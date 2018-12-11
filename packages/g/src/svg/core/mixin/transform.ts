const mat3 = require('../../../util/matrix').mat3;
const vec3 = require('../../../util/matrix').vec3;

// 是否未改变
function isUnchanged(m) {
  return (
    m[0] === 1 &&
    m[1] === 0 &&
    m[3] === 0 &&
    m[4] === 1 &&
    m[6] === 0 &&
    m[7] === 0
  );
}

// 是否仅仅是scale
function isScale(m) {
  return m[1] === 0 && m[3] === 0 && m[6] === 0 && m[7] === 0;
}
