import React, { useRef, useState } from "react";

import useInterval from "./hooks/useInterval";
import usePlayer from "./hooks/usePlayer";
import useStage from "./hooks/useStage";

import { createStage } from "./utils/game";
import Stage from "./components/Stage";
import { Simulate } from "react-dom/test-utils";
import drop = Simulate.drop;

const App: React.FC = () => {
  const [dropTime, setDropTime] = useState<null | number>(null);
  const [isGameOver, setGameOver] = useState(true);

  const gameAreaRef = useRef<HTMLDivElement>(null);

  const { player, updatePlayerPosition, resetPlayer } = usePlayer();
  const { stage, setStage } = useStage(player, resetPlayer);

  const handleStartGame = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // focus the gameAreaRef with key events
    gameAreaRef.current?.focus();

    // reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
  };

  const movePlayer = (dir: number) => {
    updatePlayerPosition({ x: dir, y: 0, collided: false });
  };

  const move = ({ keyCode, repeat }: { keyCode: number; repeat: boolean }) => {
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
      if (repeat) {
        return;
      }

      setDropTime(30);
    }
    // UP_ARROW
    else if (keyCode === 38) {
      // TODO
    }
  };

  const keyUp = ({ keyCode }: { keyCode: number }) => {
    // revert the dropTime speed when user releases DOWN_ARROW
    if (keyCode === 40) {
      setDropTime(1000);
    }
  };

  const drop = () => {
    updatePlayerPosition({ x: 0, y: 1, collided: false });
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div
      className="h-screen w-full overflow-hidden outline-none"
      tabIndex={0}
      onKeyDown={move}
      onKeyUp={keyUp}
      ref={gameAreaRef}
    >
      <div className="m-auto flex flex-col items-center">
        {/* toolbar */}
        <div className="flex items-center justify-between p-8">
          {isGameOver ? (
            <button
              type="button"
              onClick={handleStartGame}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Start game
            </button>
          ) : (
            <>
              <p>Score:</p>
              <p>Rows:</p>
              <p>Level:</p>
            </>
          )}
        </div>

        <Stage stage={stage}></Stage>
      </div>
    </div>
  );
};

export default App;
