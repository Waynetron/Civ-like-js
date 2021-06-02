import Paper from "paper";
import forestSVG from "./images/forest.svg";
import castleSVG from "./images/castle.svg";
import mountainSVG from "./images/mountain.svg";
import num1SVG from "./images/num1.svg";
import num2SVG from "./images/num2.svg";
import num3SVG from "./images/num3.svg";
import num4SVG from "./images/num4.svg";
import num5SVG from "./images/num5.svg";
import num6SVG from "./images/num6.svg";
import skeletonSVG from "./images/skeleton.svg";
import skeletonSelectedSVG from "./images/skeleton-selected.svg";
import rabbitSVG from "./images/rabbit.svg";
import rabbitSelectedSVG from "./images/rabbit-selected.svg";
export const images = {};
export const preloadImages = function ({ onComplete }) {
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

  for (const [type, svg] of Object.entries(imagesToLoad)) {
    Paper.project.importSVG(svg, {
      onLoad: (image) => {
        image.applyMatrix = false;
        images[type] = image;
        if (
          Object.entries(images).length === Object.entries(imagesToLoad).length
        ) {
          onComplete();
        }
      },
      insert: false,
    });
  }
};
