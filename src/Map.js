import { useEffect, useRef } from "react";
import Paper from "paper";
import "./Map.css";

const NUM_COLS = 10;
const NUM_ROWS = 20;
const HEX_RADIUS = 50;

const X_SPACING = HEX_RADIUS * 3;
const Y_SPACING = HEX_RADIUS * Math.sin((60 * Math.PI) / 180);
const ODD_ROW_OFFSET = HEX_RADIUS * 1.5;
const MAP_WIDTH = NUM_COLS * X_SPACING;
const MAP_HEIGHT = NUM_ROWS * Y_SPACING;

const makeHex = (x, y, radius) => {
  const hex = new Paper.Path.RegularPolygon({
    center: [x, y],
    sides: 6,
    radius: radius,
    strokeColor: "black",
    fillColor: "white",
    strokeWidth: 3,
    rotation: 90,
  });

  console.log(hex);

  hex.onMouseEnter = function (event) {
    this.fillColor = "red";
  };

  hex.onMouseLeave = function (event) {
    this.fillColor = "white";
  };

  return hex;
};

function Map() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);

    const hexagons = [];
    const x = 0 - MAP_WIDTH / 2;
    const y = 0 - MAP_HEIGHT / 2;

    for (let row = 0; row < NUM_ROWS; row++) {
      const isOddRow = row % 2 === 0;
      for (let col = 0; col < NUM_COLS; col++) {
        const hex = makeHex(
          x + col * X_SPACING + (isOddRow ? ODD_ROW_OFFSET : 0),
          y + row * Y_SPACING,
          HEX_RADIUS
        );

        hexagons.push(hex);
      }
    }

    const group = new Paper.Group(...hexagons);
    group.translate(
      new Paper.Point(Paper.view.bounds.width / 2, Paper.view.bounds.height / 2)
    );

    Paper.view.onMouseDrag = (event) => {
      group.translate(event.delta);
      // myPath.add(event.point);
    };

    Paper.view.draw();
  }, []);

  return <canvas ref={canvasRef} id="canvas" resize="true" />;
}

export default Map;
