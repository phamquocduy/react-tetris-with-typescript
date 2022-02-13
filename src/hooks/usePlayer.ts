import { useCallback, useState } from "react";

import { STAGE_WIDTH, TETROMINOS } from "../constants";
import { PLAYER, STAGE } from "../types";
import { isColliding, createTetromino } from "../utils";

export const usePlayer = () => {
  const [player, setPlayer] = useState({} as PLAYER);

  const rotate = (shape: PLAYER["tetrominoShape"]) => {
    // Make the rows to become cols (transpose)
    const matrix = shape.map((_, i) => shape.map((column) => column[i]));
    // Reverse each row to get a rotated matrix
    return matrix.map((row) => row.reverse());
  };

  const playerRotate = (stage: STAGE) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player)) as PLAYER;
    clonedPlayer.tetrominoShape = rotate(clonedPlayer.tetrominoShape);

    // This one is so the player can't rotate into the walls or other tetrominos that's merged
    const posX = clonedPlayer.position.x;
    let offset = 1;
    while (isColliding(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > clonedPlayer.tetrominoShape[0].length) {
        clonedPlayer.position.x = posX;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPosition = ({ x, y, collided }: { x: number; y: number; collided: boolean }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.position.x += x), y: (prev.position.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(
    () =>
      setPlayer({
        position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetrominoShape: createTetromino().shape as (keyof typeof TETROMINOS)[][],
        collided: false,
      }),
    []
  );

  return { player, updatePlayerPosition, resetPlayer, playerRotate };
};
