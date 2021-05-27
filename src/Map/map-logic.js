import Paper from "paper";
import { makeTile } from "../Tile/tile";
import { NUM_COLS, NUM_ROWS } from "./map-constants";

let hexGroup;
let imageGroup;
let mapGroup;

// each tile is given a reference to the state object
// this allows them to directly read and mutate the current state properties
const state = {
  selected: null,
  tiles: [],
};

const makeTiles = function (setSelected) {
  const newTiles = [];

  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      newTiles.push(makeTile(col, row, state, setSelected));
    }
  }
  return newTiles;
};

export const initMap = function (setSelected) {
  Paper.project.clear();

  hexGroup = new Paper.Group();
  imageGroup = new Paper.Group();
  mapGroup = new Paper.Group();

  mapGroup.addChildren([hexGroup, imageGroup]);

  state.tiles = makeTiles(setSelected);

  for (const tile of state.tiles) {
    hexGroup.addChild(tile.hex);
    if (tile.image) {
      imageGroup.addChild(tile.image);
    }
  }

  mapGroup.translate(
    new Paper.Point(Paper.view.bounds.width / 2, Paper.view.bounds.height / 2)
  );

  Paper.view.onMouseDrag = (event) => {
    mapGroup.translate(event.delta);
  };

  Paper.view.draw();
};
