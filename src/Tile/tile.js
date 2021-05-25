import { HEX_TYPES } from "../Map/map-constants";
import colors from "../Util/colors";

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
export const makeTile = function (col, row, hex) {
  const tile = {
    col,
    row,
    type: getRandomHexType(),
    hex,
  };

  return tile;
};
