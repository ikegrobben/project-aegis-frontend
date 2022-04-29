// Return a score
export function calculatePercentage(a, b) {
  const total = a + b;
  let score = Math.round((b / total) * 100);
  return score;
}
