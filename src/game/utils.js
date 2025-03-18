export function random(min, max) {
  if (!max) return Math.round(Math.random() * min);
  return Math.round(Math.random() * (max - min) + min);
}

export function map(value, start1, end1, start2, end2, bound = false) {
  const range1 = end1 - start1;
  const range2 = end2 - start2;
  const newValue = (value / range1) * range2;
  if (bound) {
    if (newValue < start2) return start2;
    else if (newValue > end2) return end2;
  }
  return newValue;
}
