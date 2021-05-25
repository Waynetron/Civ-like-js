import Paper from "paper";
import { makeTile, hover, select, deselect, deselectAll } from "../Tile/tile";
import colors from "../Util/colors";
import { NUM_COLS, NUM_ROWS } from "./map-constants";
import forestSVG from "../Tile/images/forest.svg";
import castleSVG from "../Tile/images/castle.svg";
import mountainSVG from "../Tile/images/mountain.svg";
import num1SVG from "../Tile/images/num1.svg";
import num2SVG from "../Tile/images/num2.svg";
import num3SVG from "../Tile/images/num3.svg";
import num4SVG from "../Tile/images/num4.svg";
import num5SVG from "../Tile/images/num5.svg";
import num6SVG from "../Tile/images/num6.svg";
import skeletonSVG from "../Tile/images/skeleton.svg";
import skeletonSelectedSVG from "../Tile/images/skeleton-selected.svg";
import rabbitSVG from "../Tile/images/rabbit.svg";
import rabbitSelectedSVG from "../Tile/images/rabbit-selected.svg";

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
    num1: num1SVG,
    num2: num2SVG,
    num3: num3SVG,
    num4: num4SVG,
    num5: num5SVG,
    num6: num6SVG,
    skeleton: skeletonSVG,
    skeletonSelected: skeletonSelectedSVG,
    rabbit: rabbitSVG,
    rabbitSelected: rabbitSelectedSVG,
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
