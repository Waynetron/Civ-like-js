import Paper from "paper";
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

const preloadImages = function ({ onComplete }) {
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
          onComplete(images);
        }
      },
      insert: false,
    });
  }
};

export default preloadImages;
