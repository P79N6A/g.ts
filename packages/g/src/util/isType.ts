export function isEmpty(val) {
  return val === null || val === undefined || Reflect.has(val, 'length') && val.length === 0
}
