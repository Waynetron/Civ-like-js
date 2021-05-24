import { useEffect, useRef } from "react";
import { useDrag } from "react-use-gesture";
import Two from "two.js";
import "./Map.css";

const NUM_COLS = 10;
const NUM_ROWS = 20;
const HEX_RADIUS = 50;

const X_SPACING = HEX_RADIUS * 3;
const Y_SPACING = HEX_RADIUS * 0.85;
const ODD_ROW_OFFSET = HEX_RADIUS * 1.5;
const MAP_WIDTH = NUM_COLS * X_SPACING;
const MAP_HEIGHT = NUM_ROWS * Y_SPACING;

function Map() {
  const divRef = useRef();
  const two = useRef();

  useEffect(() => {
    two.current = new Two({
      fullscreen: true,
      autostart: true,
    }).appendTo(divRef.current);

    const hexagons = [];
    const x = 0 - MAP_WIDTH / 2;
    const y = 0 - MAP_HEIGHT / 2;

    for (let row = 0; row < NUM_ROWS; row++) {
      const isOddRow = row % 2 === 0;
      for (let col = 0; col < NUM_COLS; col++) {
        const hex = two.current.makePolygon(
          x + col * X_SPACING + (isOddRow ? ODD_ROW_OFFSET : 0),
          y + row * Y_SPACING,
          HEX_RADIUS,
          6
        );
        hexagons.push(hex);
      }
    }

    const group = two.current.makeGroup(...hexagons);
    two.current.bind("update", function () {
      // group.rotation += 0.001;
    });

    two.current.scene.stroke = "#232323";
    two.current.scene.linewidth = 3;

    // group.center();
    group.translation.set(two.current.width / 2, two.current.height / 2);
  }, []);

  const bind = useDrag(
    ({ offset: [x, y] }) => {
      two.current.scene.translation.set(x, y);
    },
    {
      bounds: {
        left: -MAP_WIDTH / 2,
        right: MAP_WIDTH / 2,
        top: -MAP_HEIGHT / 2,
        bottom: MAP_HEIGHT / 2,
      },
      // rubberband: true,
    }
  );

  return <div ref={divRef} className="Map" {...bind()} className="map"></div>;
}

export default Map;
