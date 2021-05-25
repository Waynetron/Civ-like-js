import { useEffect, useRef, useState } from "react";
import { initMap } from "./map-logic";
import "./Map.css";

function Map() {
  const canvasRef = useRef();

  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState(null);
  console.log(selected);

  useEffect(() => {
    initMap(canvasRef.current, setTiles, setSelected);
  }, []);

  return (
    <div className="map-container">
      {selected && (
        <div className="selection-info">
          <h2>Selected: {selected.type}</h2>
        </div>
      )}
      <canvas ref={canvasRef} id="canvas" resize="true" />
    </div>
  );
}

export default Map;
