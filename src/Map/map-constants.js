export const NUM_COLS = 6;
export const NUM_ROWS = 10;
export const HEX_RADIUS = 65;

export const X_SPACING = HEX_RADIUS * 3;
export const Y_SPACING = HEX_RADIUS * Math.sin((60 * Math.PI) / 180);
export const ODD_ROW_OFFSET = HEX_RADIUS * 1.5;
export const MAP_WIDTH = NUM_COLS * X_SPACING;
export const MAP_HEIGHT = NUM_ROWS * Y_SPACING;

export const HEX_TYPES = ["grass", "mountain", "castle", "forest"];
export const HEX_TYPE_DISTRIBUTION = [
  "grass",
  "grass",
  "grass",
  "grass",
  "grass",
  "grass",
  "grass",
  "grass",
  "grass",
  "grass",
  "grass",
  "forest",
  "forest",
  "forest",
  "forest",
  "forest",
  "forest",
  "mountain",
  "mountain",
  "mountain",
  "mountain",
  "castle",
];
