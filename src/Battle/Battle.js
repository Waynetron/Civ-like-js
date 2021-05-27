import { useEffect } from "react";
import { initBattle } from "./battle-logic";
import "./Battle.css";

function Battle({ finishBattle }) {
  useEffect(() => {
    initBattle();
  }, []);

  return (
    <div className="battle-container">
      <h1>Battle</h1>
      <button onClick={() => finishBattle("Player wins")}>Win</button>
      <button onClick={() => finishBattle("Player loses")}>Lose</button>
    </div>
  );
}

export default Battle;
