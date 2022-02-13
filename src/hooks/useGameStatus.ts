import { useEffect, useState } from "react";

import { ROW_POINTS } from "../constants";

export const useGameStatus = (rowsCleared: number) => {
  const [score, setScore] = useState(0);
  const [clearedRows, setClearedRows] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (rowsCleared > 0) {
      setScore((prev) => prev + ROW_POINTS[rowsCleared - 1] * level);
      setClearedRows((prev) => prev + rowsCleared);
    }
  }, [rowsCleared]);

  return { score, setScore, clearedRows, setClearedRows, level, setLevel };
};
