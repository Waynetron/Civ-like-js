import { useEffect, useRef, useState } from "react";
import { initMap } from "./map-logic";
import "./Map.css";

function Map() {
  const canvasRef = useRef();

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    initMap(canvasRef.current, setSelected);
  }, []);

  return (
    <div className="map-container">
      {selected && (
        <div className="selection-info">
          <h2>Selected: {selected.type}</h2>
          <button>Build unit</button>
        </div>
      )}
      <canvas ref={canvasRef} id="canvas" resize="true" />
    </div>
  );
}

export default Map;
