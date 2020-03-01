export const pipe = (...fns: any[]) => (initialValue: any) => fns.reduce((value, fn) => {
  return fn(value);
}, initialValue);
