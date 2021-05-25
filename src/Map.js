import { useEffect, useRef, useState, useCallback } from "react";
import Paper from "paper";
import "./Map.css";
import { select } from "async";

const NUM_COLS = 10;
const NUM_ROWS = 20;
const HEX_RADIUS = 50;

const X_SPACING = HEX_RADIUS * 3;
const Y_SPACING = HEX_RADIUS * Math.sin((60 * Math.PI) / 180);
const ODD_ROW_OFFSET = HEX_RADIUS * 1.5;
const MAP_WIDTH = NUM_COLS * X_SPACING;
const MAP_HEIGHT = NUM_ROWS * Y_SPACING;

const hexTypes = ["grass", "mountain", "castle", "forest"];

const getRandomHexType = function () {
  const i = Math.floor(Math.random() * hexTypes.length);
  return hexTypes[i];
};

const makeTile = function (col, row) {
  // render hexes for each tile
  const startX = 0 - MAP_WIDTH / 2;
  const startY = 0 - MAP_HEIGHT / 2;
  const isOddRow = row % 2 === 0;
  const hex = makeHexPath(
    startX + col * X_SPACING + (isOddRow ? ODD_ROW_OFFSET : 0),
    startY + row * Y_SPACING,
    HEX_RADIUS
  );

  const tile = {
    col,
    row,
    type: getRandomHexType(),
    hex,
  };

  return tile;
};

const makeHexPath = function (x, y, radius) {
  const hex = new Paper.Path.RegularPolygon({
    center: [x, y],
    sides: 6,
    radius: radius,
    strokeColor: "#eee",
    fillColor: "white",
    strokeWidth: 2,
    rotation: 90,
  });

  return hex;
};

const generateTiles = function () {
  const tiles = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      tiles.push(makeTile(col, row));
    }
  }
  return tiles;
};

const hover = (tile, selected) => {
  tile.hex.strokeColor = "#bbb";
  tile.hex.strokeWidth = 2;
  tile.hex.bringToFront();

  // make sure the selected tile remains on top
  if (selected !== null) {
    selected.hex.bringToFront();
  }
};

const deselect = (tile) => {
  tile.hex.strokeColor = "#eee";
  tile.hex.strokeWidth = 2;
};

const deselectAll = (tiles) => {
  for (const tile of tiles) {
    deselect(tile);
  }
};

function Map() {
  const canvasRef = useRef();
  const groupRef = useRef();
  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);

    const group = new Paper.Group();
    groupRef.current = group;

    const tiles = generateTiles();
    setTiles(tiles);

    // add hexagons to Paper group
    for (const tile of tiles) {
      group.addChild(tile.hex);
    }

    group.translate(
      new Paper.Point(Paper.view.bounds.width / 2, Paper.view.bounds.height / 2)
    );

    Paper.view.onMouseDrag = (event) => {
      group.translate(event.delta);
    };

    Paper.view.draw();
  }, []);

  const select = (tile) => {
    tile.hex.strokeColor = "#FFAF38";
    tile.hex.strokeWidth = 3;
    tile.hex.bringToFront();
  };

  useEffect(() => {
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
          tile.hex.strokeColor = "#bbb";
          tile.hex.strokeWidth = 2;
          setSelected(null);
          deselect(tile);
        } else {
          setSelected(tile);
          deselectAll(tiles);
          select(tile);
        }
      };
    }
  }, [selected, tiles]);

  return <canvas ref={canvasRef} id="canvas" resize="true" />;
}

export default Map;
