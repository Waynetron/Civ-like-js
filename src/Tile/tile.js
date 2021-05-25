import {
  HEX_TYPES,
  MAP_WIDTH,
  MAP_HEIGHT,
  X_SPACING,
  Y_SPACING,
  ODD_ROW_OFFSET,
  HEX_RADIUS,
} from "../Map/map-constants";
import colors from "../Util/colors";
import { makeHex } from "./hex";

const getRandomHexType = function () {
  const i = Math.floor(Math.random() * HEX_TYPES.length);
  return HEX_TYPES[i];
};

export const hover = (tile, selected) => {
  tile.hex.strokeColor = colors.darkGrey;
  tile.hex.strokeWidth = 2;
  tile.hex.bringToFront();

  // make sure the selected tile remains on top
  if (selected !== null) {
    selected.hex.bringToFront();
  }
};

export const select = (tile) => {
  tile.hex.strokeColor = colors.yellow;
  tile.hex.strokeWidth = 3;
  tile.hex.bringToFront();
};

export const deselect = (tile) => {
  tile.hex.strokeColor = colors.lightGrey;
  tile.hex.strokeWidth = 2;
};

export const deselectAll = (tiles) => {
  for (const tile of tiles) {
    deselect(tile);
  }
};
export const makeTile = function (col, row) {
  // make hex
  const startX = 0 - MAP_WIDTH / 2;
  const startY = 0 - MAP_HEIGHT / 2;
  const isOddRow = row % 2 === 0;
  const hex = makeHex(
    startX + col * X_SPACING + (isOddRow ? ODD_ROW_OFFSET : 0),
    startY + row * Y_SPACING,
    HEX_RADIUS
  );

  // make tile (and inject hex)
  const tile = {
    col,
    row,
    type: getRandomHexType(),
    hex,
  };

  return tile;
};
