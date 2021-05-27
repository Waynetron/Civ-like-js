import Paper from "paper";
import { useEffect, useRef, useState } from "react";
import { preloadImages } from "../Images/images";
import Map from "../Map/Map";
import Battle from "../Battle/Battle";
import "./App.css";

function App() {
  const canvasRef = useRef();
  const [isLoaded, setLoaded] = useState(false);
  const [screen, setScreen] = useState("map");

  useEffect(() => {
    Paper.setup(canvasRef.current);
    preloadImages({
      onComplete: () => setLoaded(true),
    });
  }, [setLoaded]);
  return (
    <div className="App">
      <div className="UI">
        {isLoaded ? (
          <>
            {screen === "map" && (
              <Map
                startBattle={() => {
                  setScreen("battle");
                }}
              />
            )}
            {screen === "battle" && (
              <Battle
                finishBattle={(result) => {
                  console.log(result);
                  setScreen("map");
                }}
              />
            )}
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
      <canvas ref={canvasRef} id="canvas" resize="true" />
    </div>
  );
}

export default App;
