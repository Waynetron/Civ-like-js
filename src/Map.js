import { useEffect, useRef } from "react";
import Two from "two.js";

const WIDTH = 30;
const HEIGHT = 10;

function Map() {
  const divRef = useRef();
  useEffect(() => {
    const two = new Two({
      fullscreen: true,
      autostart: true,
    }).appendTo(divRef.current);

    const hexagons = [];
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        hexagons.push(two.makePolygon(x * 50, y * 50, 50, 6));
      }
    }

    const group = two.makeGroup(...hexagons);

    two.bind("update", function () {
      group.rotation += 0.001;
    });

    two.scene.stroke = "#232323";
    two.scene.linewidth = 3;
    group.center();
  }, []);

  const drag = (e) => {
    console.log(e);
    e.preventDefault();
  };

  return (
    <div draggable="true" onDrag={drag} ref={divRef} className="Map">
      <h1>🗾</h1>
    </div>
  );
}

export default Map;
