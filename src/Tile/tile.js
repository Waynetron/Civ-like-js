import { images } from "../Images/images";
import { HEX_TYPE_DISTRIBUTION, HEX_RADIUS } from "../Map/map-constants";
import { areEnemies } from "../Unit/unit";
import colors from "../Util/colors";
import { makeHex } from "./hex";

const getRandomType = function () {
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
  image.translate(x - image.bounds.width / 2, y - image.bounds.height / 2);
  return image;
};

const getUnitAtTile = function (tile, units) {
  return null;
};

export const makeTile = function (
  position,
  state,
  onSelect,
  onMove,
  onAttack,
  onCancel
) {
  const [x, y] = position;
  const type = getRandomType();
  const image = makeTileImage(x, y, type);
  const tile = {
    type,
    image,
  };

  tile.getPosition = function () {
    return position;
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
    if (state.selected !== tile) {
      tile.hex.strokeColor = colors.lightYellow;
      tile.hex.strokeWidth = 5;
      tile.hex.bringToFront();
    }

    // make sure the selected tile remains on top (if it's a tile)
    state.selected?.hex?.bringToFront();

    if (state.selected?.moveable) {
      //
    }
  };

  tile.hex = makeHex(x, y, HEX_RADIUS);

  tile.hex.onMouseEnter = function (event) {
    tile.hover();
  };

  tile.hex.onMouseLeave = function (event) {
    if (state.selected !== tile) {
      tile.deselect();
    }
  };

  tile.hex.onClick = function (event) {
    if (state.selected === tile) {
      // tile already selected, so deselect
      tile.hex.strokeColor = colors.darkGrey;
      tile.hex.strokeWidth = 2;
      onSelect(null);
    } else if (state.selected === null) {
      // nothing is selected, select the tile
      onSelect(tile);
      tile.select();
    } else if (state.selected.moveable) {
      // infer that selection is a unit
      const unitA = state.selected;
      const unitB = getUnitAtTile(tile, state.units);
      if (!unitB) {
        // tile is empty, unit can move here
        onMove(state.selected, tile);
      } else if (areEnemies(unitA, unitB)) {
        // tile contains enemy unit
        onAttack(unitA, unitB, tile);
      } else {
        // tile contains friendly unit
        onCancel();
      }
    } else {
      // some other tiles is selected, select the new tile
      onSelect(tile);
      tile.select();
    }
  };

  return tile;
};
