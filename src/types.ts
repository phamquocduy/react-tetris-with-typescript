import { TETROMINOS } from "./constants";

export type CELL = [keyof typeof TETROMINOS, string];
export type STAGE = CELL[][];

export type POSITION = {
  x: number;
  y: number;
};

export type PLAYER = {
  position: POSITION;
  tetrominoShape: (keyof typeof TETROMINOS)[][];
  collided: boolean;
};
