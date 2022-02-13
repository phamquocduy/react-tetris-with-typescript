import React, { useRef, useState } from "react";

import { createStage, isColliding } from "./utils";
import { useInterval, usePlayer, useStage, useGameStatus } from "./hooks";

import Stage from "./components/Stage";

const App: React.FC = () => {
  const [dropSpeed, setDropSpeed] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState(true);

  const gameAreaRef = useRef<HTMLDivElement>(null);

  const { player, updatePlayerPosition, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, clearedRows, setClearedRows, level, setLevel } = useGameStatus(rowsCleared);

  const movePlayer = (dir: number) => {
    if (!isColliding(player, stage, { x: dir, y: 0 })) {
      updatePlayerPosition({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // Need to focus the window with the key events on start
    if (gameAreaRef.current) gameAreaRef.current.focus();

    // Reset everything
    setStage(createStage());
    setDropSpeed(1000);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setClearedRows(0);
    setGameOver(false);
  };

  const keyDown = ({ keyCode, repeat }: { keyCode: number; repeat: boolean }) => {
    if (!gameOver) {
      // LEFT_ARROW
      if (keyCode === 37) {
        movePlayer(-1);
      }
      // RIGHT_ARROW
      else if (keyCode === 39) {
        movePlayer(1);
      }
      // DOWN_ARROW
      else if (keyCode === 40) {
        // Just call once
        if (repeat) return;
        setDropSpeed(30);
      }
      // UP_ARROW
      else if (keyCode === 38) {
        playerRotate(stage);
      }
    }
  };

  const keyUp = ({ keyCode }: { keyCode: number }) => {
    if (!gameOver) {
      // Change the dropSpeed when user releases DOWN_ARROW
      if (keyCode === 40) {
        setDropSpeed(1000 / level + 200);
      }
    }
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (clearedRows > level * 10) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropSpeed(1000 / level + 200);
    }

    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.position.y < 1) {
        console.log("Game over!");
        setGameOver(true);
        setDropSpeed(null);
      }

      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  };

  // runs the game
  useInterval(drop, dropSpeed);

  return (
    <div
      className="h-screen w-full overflow-hidden outline-none"
      tabIndex={0}
      onKeyDown={keyDown}
      onKeyUp={keyUp}
      ref={gameAreaRef}
    >
      <div className="m-auto flex flex-col items-center">
        {/* toolbar */}
        <div className="flex h-[102px] items-center justify-between p-8">
          {gameOver ? (
            <button
              type="button"
              onClick={startGame}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Start game
            </button>
          ) : (
            <div className="flex justify-between space-x-4">
              <p>Score: {score}</p>
              <p>Rows: {clearedRows}</p>
              <p>Level: {level}</p>
            </div>
          )}
        </div>

        <Stage stage={stage} />
      </div>
    </div>
  );
};

export default App;
