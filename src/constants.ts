export const STAGE_WIDTH = 12;

export const STAGE_HEIGHT = 20;

// 1 row cleared - 40 points, 2 rows - 100, 3 rows - 300, 4 rows - 1200
export const ROW_POINTS = [40, 100, 300, 1200];

export const TETROMINOS = {
  0: { shape: [[0]], color: "bg-black" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "bg-cyan-500",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "bg-indigo-500",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "bg-yellow-500",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "bg-orange-500",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "bg-lime-500",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "bg-violet-500",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "bg-rose-500",
  },
};
