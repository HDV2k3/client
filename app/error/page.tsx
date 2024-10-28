"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  TouchEvent,
} from "react";
import {
  FaPlay,
  FaRedo,
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
} from "react-icons/fa";

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
const INITIAL_DIRECTION: Position = { x: 0, y: -1 };
const INITIAL_FOOD: Position = { x: 15, y: 15 };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | undefined>();
  const touchStartRef = useRef<Position>({ x: 0, y: 0 });

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    setFood(newFood);
  }, [snake]);

  const moveSnake = useCallback(() => {
    const newSnake = [...snake];
    const head: Position = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }
    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setScore((prevScore) => prevScore + 1);
      generateFood();
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  }, [snake, direction, food, generateFood]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space" && !gameStarted) {
        setGameStarted(true);
      } else if (gameStarted && !gameOver) {
        switch (e.key) {
          case "ArrowUp":
            if (direction.y === 0) setDirection({ x: 0, y: -1 });
            break;
          case "ArrowDown":
            if (direction.y === 0) setDirection({ x: 0, y: 1 });
            break;
          case "ArrowLeft":
            if (direction.x === 0) setDirection({ x: -1, y: 0 });
            break;
          case "ArrowRight":
            if (direction.x === 0) setDirection({ x: 1, y: 0 });
            break;
          default:
            break;
        }
      }
    },
    [gameStarted, gameOver, direction]
  );

  const handleTouchStart = useCallback((e: Event) => {
    if (e instanceof TouchEvent) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: Event) => {
      if (e instanceof TouchEvent) {
        if (!gameStarted) {
          setGameStarted(true);
          return;
        }
        if (gameStarted && !gameOver) {
          const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
          };
          const dx = touchEnd.x - touchStartRef.current.x;
          const dy = touchEnd.y - touchStartRef.current.y;
          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0 && direction.x === 0) setDirection({ x: 1, y: 0 });
            else if (dx < 0 && direction.x === 0) setDirection({ x: -1, y: 0 });
          } else {
            if (dy > 0 && direction.y === 0) setDirection({ x: 0, y: 1 });
            else if (dy < 0 && direction.y === 0) setDirection({ x: 0, y: -1 });
          }
        }
      }
    },
    [gameStarted, gameOver, direction]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleKeyDown, handleTouchStart, handleTouchEnd]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, 100);
    } else {
      clearInterval(gameLoopRef.current);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [gameStarted, gameOver, moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    generateFood();
    setGameOver(false);
    setGameStarted(false);
    setScore(0);
  };

  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0].x === x && snake[0].y === y;
    const isSnakeBody = snake.some(
      (segment, index) => segment.x === x && segment.y === y && index > 0
    );
    const isFood = food.x === x && food.y === y;
    let cellClass = "w-full h-full ";

    if (isSnakeHead) {
      cellClass += "bg-white shadow-lg shadow-white square";
    } else if (isSnakeBody) {
      cellClass += "bg-gray-500 square";
    } else if (isFood) {
      cellClass += "bg-red-500 shadow-lg shadow-red-500 animate-pulse square";
    } else {
      cellClass += "bg-black";
    }

    return <div key={`${x}-${y}`} className={cellClass} />;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#191919]">
      <div className="w-full max-w-md bg-[#191919] text-white rounded-lg">
        <div className="p-4">
          <div className="flex flex-col items-center justify-center mb-3">
            {!gameStarted && (
              <p className="text-[12px] text-[#807E7E] ">
                Press{" "}
                <span className="px-3 py-1 m-0 bg-gray-900 border border-[#2E2E2E] text-white rounded">
                  SPACE
                </span>{" "}
                to play
              </p>
            )}
            {gameStarted && !gameOver && (
              <div className="flex items-center space-x-1 justify-center">
                <p className="text-sm text-[#807E7E]">Move with</p>
                <div className="grid grid-cols-4 gap-1 ml-2">
                  <button
                    className="bg-gray-900 border border-[#2E2E2E] rounded text-[#807E7E] text-center p-1 focus:outline-none"
                    onClick={() => setDirection({ x: -1, y: 0 })}
                  >
                    <FaAngleLeft size={12} />
                  </button>
                  <button
                    className="bg-gray-900 border border-[#2E2E2E] rounded text-[#807E7E] text-center p-1 focus:outline-none"
                    onClick={() => setDirection({ x: 1, y: 0 })}
                  >
                    <FaAngleRight size={12} />
                  </button>
                  <button
                    className="bg-gray-900 border border-[#2E2E2E] rounded text-[#807E7E] text-center p-1 focus:outline-none"
                    onClick={() => setDirection({ x: 0, y: -1 })}
                  >
                    <FaAngleUp size={12} />
                  </button>
                  <button
                    className="bg-gray-900 border border-[#2E2E2E] rounded text-[#807E7E] text-center p-1 focus:outline-none"
                    onClick={() => setDirection({ x: 0, y: 1 })}
                  >
                    <FaAngleDown size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
          {!gameOver && (
            <div
              className="grid gap-0 border border-[#2E2E2E] rounded"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
                width: "100%",
                height: "300px",
              }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);
                return renderCell(x, y);
              })}
            </div>
          )}
          {gameOver && (
            <div className="text-center h-[300px] flex items-center justify-center flex-col">
              <h2 className="text-3xl font-bold mb-2">Game Over</h2>
              <p className="text-xl mb-2">Score: {score}</p>
              <button
                className="text-white p-2 rounded border border-[#2E2E2E] hover:bg-[#292929] transition-colors"
                onClick={resetGame}
              >
                <FaRedo />
              </button>
            </div>
          )}
          <div className="flex justify-between items-center">
            {!gameOver && (
              <p className="text-xl font-bold mt-2 mb-2">{score}</p>
            )}
            <div className="space-x-1 mt-3 mb-3">
              {!gameStarted && (
                <button
                  className="text-white px-2 py-1 rounded"
                  onClick={() => setGameStarted(true)}
                >
                  <FaPlay />
                </button>
              )}
              {!gameOver && (
                <button
                  className="text-white px-2 py-1 rounded"
                  onClick={resetGame}
                >
                  <FaRedo />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
