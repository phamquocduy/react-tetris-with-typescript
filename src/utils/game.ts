import { STAGE_WIDTH, STAGE_HEIGHT, TETROMINOS } from "../constants";

export const createStage = () => {
  return Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, "clear"]));
};

// create random tetromino
export const createTetromino = () => {
  const tetrominos = ["I", "J", "L", "O", "S", "T", "Z"] as (keyof typeof TETROMINOS)[];
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];

  return TETROMINOS[randTetromino];
};
