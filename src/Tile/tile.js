import {
  HEX_RADIUS,
  X_SPACING,
  Y_SPACING,
  ODD_ROW_OFFSET,
  MAP_WIDTH,
  MAP_HEIGHT,
  HEX_TYPES,
} from "../Map/map-constants";
import colors from "../Util/colors";

const getRandomHexType = function () {
  const i = Math.floor(Math.random() * HEX_TYPES.length);
  return HEX_TYPES[i];
};

export const makeTile = function (col, row, Paper) {
  // render hexes for each tile
  const startX = 0 - MAP_WIDTH / 2;
  const startY = 0 - MAP_HEIGHT / 2;
  const isOddRow = row % 2 === 0;
  const hex = makeHexPath(
    startX + col * X_SPACING + (isOddRow ? ODD_ROW_OFFSET : 0),
    startY + row * Y_SPACING,
    HEX_RADIUS,
    Paper
  );

  const tile = {
    col,
    row,
    type: getRandomHexType(),
    hex,
  };

  return tile;
};

const makeHexPath = function (x, y, radius, Paper) {
  const hex = new Paper.Path.RegularPolygon({
    center: [x, y],
    sides: 6,
    radius: radius,
    strokeColor: colors.lightGrey,
    fillColor: colors.white,
    strokeWidth: 2,
    rotation: 90,
  });

  return hex;
};
