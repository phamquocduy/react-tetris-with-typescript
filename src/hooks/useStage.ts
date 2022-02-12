import { useEffect, useState } from "react";

import { createStage } from "../utils/game";
import type { PLAYER, CELL, STAGE } from "../types";

const useStage = (player: PLAYER, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    if (!player.position) {
      return;
    }

    const updateStage = (prevStage: STAGE): STAGE => {
      // first flush the stage
      // if it says "clear" but do not have a 0, it means that it is player's move and should be cleared
      const newStage = prevStage.map((row) => row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)) as CELL[]);

      // then draw the tetromino
      player.tetrominoShape.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (cell !== 0) {
            newStage[rowIndex + player.position.y][cellIndex + player.position.x] = [
              cell,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      return newStage;
    };

    setStage((prevStateValue) => updateStage(prevStateValue));
  }, [player.collided, player.position?.x, player.position?.y, player.tetrominoShape]);

  return { stage, setStage };
};

export default useStage;
