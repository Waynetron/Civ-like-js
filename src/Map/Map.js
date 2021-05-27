import { useEffect, useState } from "react";
import { initMap } from "./map-logic";
import "./Map.css";

function Map({ startBattle }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    initMap(setSelected);
  }, []);

  return (
    <div className="map-container">
      {selected && (
        <div className="selection-info">
          <h2>Selected: {selected.type}</h2>
          <button onClick={startBattle}>Build unit</button>
        </div>
      )}
    </div>
  );
}

export default Map;
