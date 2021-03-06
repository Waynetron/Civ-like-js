import Paper from "paper";
import { makeTile } from "../Tile/tile";
import { makeUnit } from "../Unit/unit";
import {
  NUM_COLS,
  NUM_ROWS,
  MAP_WIDTH,
  MAP_HEIGHT,
  X_SPACING,
  Y_SPACING,
  ODD_ROW_OFFSET,
} from "./map-constants";

let hexGroup;
let imageGroup;
let unitGroup;
let mapGroup;

// each tile is given a reference to the state object
// this allows them to directly read and mutate the current state properties
const state = {
  selected: null,
  tiles: [],
  units: [],
};

const getPosition = function (col, row) {
  const startX = 0 - MAP_WIDTH / 2;
  const startY = 0 - MAP_HEIGHT / 2;
  const isOddRow = row % 2 === 0;
  const x = startX + col * X_SPACING + (isOddRow ? ODD_ROW_OFFSET : 0);
  const y = startY + row * Y_SPACING;

  return [x, y];
};

const makeTiles = function (onSelect, onMove) {
  const newTiles = [];

  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      const position = getPosition(col, row);
      newTiles.push(makeTile(position, state, onSelect, onMove));
    }
  }
  return newTiles;
};

const makeUnits = function (onSelect) {
  const newUnits = [];

  const skeleton = makeUnit(
    "skeleton",
    "yellow",
    getPosition(0, 1),
    state,
    onSelect
  );
  newUnits.push(skeleton);

  const rabbit = makeUnit("rabbit", "red", getPosition(3, 5), state, onSelect);
  newUnits.push(rabbit);

  return newUnits;
};

export const initMap = function (setSelected) {
  Paper.project.clear();

  // Apply matix is necessary to get sane relative coordinate systems within all the children
  hexGroup = new Paper.Group({
    applyMatrix: false,
  });
  imageGroup = new Paper.Group({
    applyMatrix: false,
  });
  unitGroup = new Paper.Group({
    applyMatrix: false,
  });
  mapGroup = new Paper.Group({
    applyMatrix: false,
  });

  mapGroup.addChildren([hexGroup, imageGroup, unitGroup]);

  const onSelect = function (newSelected) {
    state.selected?.deselect();
    setSelected(newSelected); // update external state (React)
    state.selected = newSelected; // update internal state
  };

  const onMove = function (unit, tile) {
    unit.moveTo(tile.getPosition());
    onSelect(null);
  };

  const onAttack = function (attacker, defender, tile) {
    console.log(attacker.type, "is attacking", defender.type);
    onCancel();
  };

  const onCancel = function (attacker, defender, tile) {
    onSelect(null);
  };

  state.tiles = makeTiles(onSelect, onMove, onAttack, onCancel);
  for (const tile of state.tiles) {
    hexGroup.addChild(tile.hex);
    if (tile.image) {
      imageGroup.addChild(tile.image);
    }
  }

  state.units = makeUnits(onSelect);
  for (const unit of state.units) {
    unitGroup.addChild(unit.group);
  }

  mapGroup.translate(
    new Paper.Point(Paper.view.bounds.width / 2, Paper.view.bounds.height / 2)
  );

  Paper.view.onMouseDrag = (event) => {
    mapGroup.translate(event.delta);
  };

  Paper.view.draw();
};
