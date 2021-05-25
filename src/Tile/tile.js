import Paper from "paper";
import {
  HEX_TYPE_DISTRIBUTION,
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
  const i = Math.floor(Math.random() * HEX_TYPE_DISTRIBUTION.length);
  return HEX_TYPE_DISTRIBUTION[i];
};

export const hover = (tile, selected) => {
  tile.hex.strokeColor = colors.lightYellow;
  tile.hex.strokeWidth = 5;
  tile.hex.bringToFront();

  // make sure the selected tile remains on top
  if (selected !== null) {
    selected.hex.bringToFront();
  }
};

export const select = (tile) => {
  tile.hex.strokeColor = colors.yellow;
  tile.hex.strokeWidth = 5;
  tile.hex.bringToFront();
};

export const deselect = (tile) => {
  tile.hex.strokeColor = colors.lightGrey;
  tile.hex.fillColor = colors.white;
  tile.hex.strokeWidth = 2;
};

export const deselectAll = (tiles) => {
  for (const tile of tiles) {
    deselect(tile);
  }
};

const makeTileImage = function (x, y, type, images) {
  if (type === "grass") {
    return null;
  }

  const image = images[type].clone();
  // disables mouse interactions (to prevent from blocking clicks on the hex underneath)
  image.locked = true;
  image.translate(x - 79, y - 69);
  return image;
};
export const makeTile = function (col, row, images) {
  // make hex
  const startX = 0 - MAP_WIDTH / 2;
  const startY = 0 - MAP_HEIGHT / 2;
  const isOddRow = row % 2 === 0;
  const x = startX + col * X_SPACING + (isOddRow ? ODD_ROW_OFFSET : 0);
  const y = startY + row * Y_SPACING;

  const hex = makeHex(x, y, HEX_RADIUS);
  const type = getRandomHexType();
  const image = makeTileImage(x, y, type, images);

  // make tile (and inject hex)
  const tile = {
    col,
    row,
    type,
    hex,
    image,
  };

  return tile;
};
