import Paper from "paper";
import { makeTile, hover, select, deselect, deselectAll } from "../Tile/tile";
import colors from "../Util/colors";
import { NUM_COLS, NUM_ROWS } from "./map-constants";
import forestSVG from "../Tile/images/forest.svg";
import castleSVG from "../Tile/images/castle.svg";
import mountainSVG from "../Tile/images/mountain.svg";

let hexGroup;
let imageGroup;
let mapGroup;
let selected = null;
let tiles = [];

const makeTiles = function (images) {
  const newTiles = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      newTiles.push(makeTile(col, row, images));
    }
  }
  return newTiles;
};

export const initMap = function (canvas, setTiles, setSelected) {
  Paper.setup(canvas);

  // preload the SVG images
  const imagesToLoad = {
    forest: forestSVG,
    castle: castleSVG,
    mountain: mountainSVG,
  };
  const images = {};
  for (const [type, svg] of Object.entries(imagesToLoad)) {
    Paper.project.importSVG(svg, {
      onLoad: (image) => {
        images[type] = image;
        if (
          Object.entries(images).length === Object.entries(imagesToLoad).length
        ) {
          console.log("loaded");
          generateMap(setTiles, setSelected, images);
        }
      },
      insert: false,
    });
  }
};
const generateMap = function (setTiles, setSelected, images) {
  hexGroup = new Paper.Group();
  imageGroup = new Paper.Group();
  mapGroup = new Paper.Group();

  mapGroup.addChildren([hexGroup, imageGroup]);

  tiles = makeTiles(images);

  for (const tile of tiles) {
    hexGroup.addChild(tile.hex);
    if (tile.image) {
      imageGroup.addChild(tile.image);
    }
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

  mapGroup.translate(
    new Paper.Point(Paper.view.bounds.width / 2, Paper.view.bounds.height / 2)
  );

  Paper.view.onMouseDrag = (event) => {
    mapGroup.translate(event.delta);
  };

  // Render
  Paper.view.draw();

  // update React state in parent container
  setTiles(tiles);
};
