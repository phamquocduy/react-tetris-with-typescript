import { PLAYER, CELL, STAGE, POSITION } from "./types";
import { STAGE_WIDTH, STAGE_HEIGHT, TETROMINOS } from "./constants";

export const createStage = () => {
  return Array.from(Array(STAGE_HEIGHT), () => Array<CELL>(STAGE_WIDTH).fill([0, "clear"]));
};

// create random tetromino
export const createTetromino = () => {
  const tetrominos = ["I", "J", "L", "O", "S", "T", "Z"] as (keyof typeof TETROMINOS)[];
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];

  return TETROMINOS[randTetromino];
};

export const isColliding = (player: PLAYER, stage: STAGE, { x: moveX, y: moveY }: POSITION) => {
  // Using for loops to be able to return (and break)
  for (let y = 0; y < player.tetrominoShape.length; y += 1) {
    for (let x = 0; x < player.tetrominoShape[y].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (player.tetrominoShape[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game area's height (y)
          // That we're not moving through the bottom of the grid
          !stage[y + player.position.y + moveY] ||
          // 3. Check that our move is inside the game area's width (x)
          !stage[y + player.position.y + moveY][x + player.position.x + moveX] ||
          // 4. Check that the cell we're moving to isn't set to clear
          stage[y + player.position.y + moveY][x + player.position.x + moveX][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }

  // 5. If everything above is false
  return false;
};
