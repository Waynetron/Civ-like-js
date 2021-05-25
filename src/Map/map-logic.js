import Paper from "paper";
import { makeTile } from "../Tile/tile";
import colors from "../Util/colors";
import { NUM_COLS, NUM_ROWS } from "./map-constants";

let tileGroup;
let selected = null;

const makeTiles = function () {
  const tiles = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      tiles.push(makeTile(col, row, Paper));
    }
  }
  return tiles;
};

const hover = (tile, selected) => {
  tile.hex.strokeColor = colors.darkGrey;
  tile.hex.strokeWidth = 2;
  tile.hex.bringToFront();

  // make sure the selected tile remains on top
  if (selected !== null) {
    selected.hex.bringToFront();
  }
};

const select = (tile) => {
  tile.hex.strokeColor = colors.yellow;
  tile.hex.strokeWidth = 3;
  tile.hex.bringToFront();
};

const deselect = (tile) => {
  tile.hex.strokeColor = colors.lightGrey;
  tile.hex.strokeWidth = 2;
};

const deselectAll = (tiles) => {
  for (const tile of tiles) {
    deselect(tile);
  }
};

export const initMap = function (canvas, setTiles, setSelected) {
  Paper.setup(canvas);
  tileGroup = new Paper.Group();

  const tiles = makeTiles();

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
