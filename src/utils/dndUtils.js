export const snapToGrid = (gridSize) => (args) => {
    const { transform } = args;

    return {
      ...transform,
      y: Math.ceil(transform.y / gridSize) * gridSize,
    };
  } 

export function roundToGrid(value, gridSize) {
    const rounded = Math.round(value / gridSize);
    return parseFloat((rounded * gridSize).toFixed(2));
  }
  