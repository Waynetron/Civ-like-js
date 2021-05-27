import Paper from "paper";
import { images } from "../Images/images";
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

const makeTileImage = function (x, y, type) {
  if (type === "grass") {
    return null;
  }

  const image = images[type].clone();
  // disables mouse interactions (to prevent from blocking clicks on the hex underneath)
  image.locked = true;
  image.translate(x - 79, y - 69);
  return image;
};

const deselectAll = function (tiles) {
  for (const tile of tiles) {
    tile.deselect();
  }
};
export const makeTile = function (col, row, state, setSelected) {
  // make hex
  const startX = 0 - MAP_WIDTH / 2;
  const startY = 0 - MAP_HEIGHT / 2;
  const isOddRow = row % 2 === 0;
  const x = startX + col * X_SPACING + (isOddRow ? ODD_ROW_OFFSET : 0);
  const y = startY + row * Y_SPACING;

  const type = getRandomHexType();
  const image = makeTileImage(x, y, type);

  // make tile (and inject hex)
  const tile = {
    col,
    row,
    type,
    image,
  };

  tile.select = function () {
    tile.hex.strokeColor = colors.yellow;
    tile.hex.strokeWidth = 5;
    tile.hex.bringToFront();
  };

  tile.deselect = function () {
    tile.hex.strokeColor = colors.lightGrey;
    tile.hex.fillColor = colors.white;
    tile.hex.strokeWidth = 2;
  };

  tile.hover = function () {
    if (state.selectedTile !== tile) {
      tile.hex.strokeColor = colors.lightYellow;
      tile.hex.strokeWidth = 5;
      tile.hex.bringToFront();
    }

    // make sure the selected tile remains on top
    state.selectedTile?.hex.bringToFront();
  };

  tile.hex = makeHex(x, y, HEX_RADIUS);

  tile.hex.onMouseEnter = function (event) {
    tile.hover();
  };

  tile.hex.onMouseLeave = function (event) {
    if (state.selectedTile !== tile) {
      tile.deselect();
    }
  };

  tile.hex.onClick = function (event) {
    if (state.selectedTile === tile) {
      tile.hex.strokeColor = colors.darkGrey;
      tile.hex.strokeWidth = 2;
      tile.deselect(); // update internal visuals
      state.selectedTile = null; // update internal selected state
      setSelected(null); // update external state (React)
    } else {
      deselectAll(state.tiles);

      tile.select(); // update internal visuals
      state.selectedTile = tile; // update internal selected state
      setSelected(tile); // update external state (React)
    }
  };

  return tile;
};
