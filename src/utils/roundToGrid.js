export default function roundToGrid(value, gridSize) {
  const rounded = Math.round(value / gridSize);
  return parseFloat((rounded * gridSize).toFixed(2));
}
