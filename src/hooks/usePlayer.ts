import { useCallback, useState } from "react";

import { STAGE_WIDTH, TETROMINOS } from "../constants";
import { createTetromino } from "../utils/game";
import { PLAYER } from "../types";

const usePlayer = () => {
  const [player, setPlayer] = useState({} as PLAYER);

  const updatePlayerPosition = ({ x, y, collided }: { x: number; y: number; collided: boolean }) => {
    setPlayer((prevPlayerValue) => ({
      ...prevPlayerValue,
      position: { x: (prevPlayerValue.position.x += x), y: (prevPlayerValue.position.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetrominoShape: createTetromino().shape as (keyof typeof TETROMINOS)[][],
      collided: false,
    });
  }, []);

  return { player, updatePlayerPosition, resetPlayer };
};

export default usePlayer;
