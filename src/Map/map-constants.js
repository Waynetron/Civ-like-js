export const NUM_COLS = 10;
export const NUM_ROWS = 20;
export const HEX_RADIUS = 50;

export const X_SPACING = HEX_RADIUS * 3;
export const Y_SPACING = HEX_RADIUS * Math.sin((60 * Math.PI) / 180);
export const ODD_ROW_OFFSET = HEX_RADIUS * 1.5;
export const MAP_WIDTH = NUM_COLS * X_SPACING;
export const MAP_HEIGHT = NUM_ROWS * Y_SPACING;

export const HEX_TYPES = ["grass", "mountain", "castle", "forest"];
