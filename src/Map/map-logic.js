import Paper from "paper";
import { makeTile, hover, select, deselect, deselectAll } from "../Tile/tile";
import colors from "../Util/colors";
import {
  NUM_COLS,
  NUM_ROWS,
  HEX_RADIUS,
  MAP_WIDTH,
  MAP_HEIGHT,
  X_SPACING,
  Y_SPACING,
  ODD_ROW_OFFSET,
} from "./map-constants";
import { makeHex } from "./hex";

let tileGroup;
let selected = null;
let tiles = [];

const makeTiles = function () {
  const newTiles = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      // render hexes for each tile
      const startX = 0 - MAP_WIDTH / 2;
      const startY = 0 - MAP_HEIGHT / 2;
      const isOddRow = row % 2 === 0;
      const hex = makeHex(
        startX + col * X_SPACING + (isOddRow ? ODD_ROW_OFFSET : 0),
        startY + row * Y_SPACING,
        HEX_RADIUS,
        Paper
      );

      newTiles.push(makeTile(col, row, hex));
    }
  }
  return newTiles;
};

export const initMap = function (canvas, setTiles, setSelected) {
  Paper.setup(canvas);
  tileGroup = new Paper.Group();
  tiles = makeTiles();

  // add hexagons to group
  for (const tile of tiles) {
    tileGroup.addChild(tile.hex);
  }

  // add listeners to tiles
  for (const tile of tiles) {
    tile.hex.onMouseEnter = function (event) {
      if (selected !== tile) {
        hover(tile, selected);
      }
    };

    tile.hex.onMouseLeave = function (event) {
      if (selected !== tile) {
        deselect(tile);
      }
    };

    tile.hex.onClick = function (event) {
      if (selected === tile) {
        tile.hex.strokeColor = colors.darkGrey;
        tile.hex.strokeWidth = 2;
        deselect(tile); // update internal visuals
        selected = null; // update internal selected state
        setSelected(null); // update external state (React)
      } else {
        deselectAll(tiles); // update internal visuals
        selected = null; // update internal selected state
        setSelected(null); // update external state (React)

        select(tile); // update internal visuals
        selected = tile; // update internal selected state
        setSelected(tile); // update external state (React)
      }
    };
  }

  tileGroup.translate(
    new Paper.Point(Paper.view.bounds.width / 2, Paper.view.bounds.height / 2)
  );

  Paper.view.onMouseDrag = (event) => {
    tileGroup.translate(event.delta);
  };

  // Render
  Paper.view.draw();

  // update React state in parent container
  setTiles(tiles);
};
