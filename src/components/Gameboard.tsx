import React, { useState } from "react";
import { checkForAWinner } from "../functions";

import { CellsWrapper } from "../styled-components";
import Gamecell from "./Gamecell";

// Компонент Gameboard
// Отрисовывает 9 клеток для игры
// Содержит в себе информацию о состоянии игры, gameState
const Gameboard = () => {
  // В объекте gameState есть 4 поля:
  const [gameState, setGameState] = useState({
    // cells отображает состояние клеток. Изначально все 9 - пустые
    cells: [null, null, null, null, null, null, null, null, null],
    // currentPlayer отображает игрока, который должен ходить. Первым ходит Х
    currentPlayer: "X",
    // gameOver отображает состояние "игра окончена". Изначально игра не окончена
    gameOver: false,
    // winner отображает победителя. Изначально победителя нет
    winner: "",
  });

  // Для удобства, развёрнут gameState. Чтобы каждый раз не писать "gameState.cells" или "gameState.winner"
  const { cells, currentPlayer, gameOver, winner } = gameState;

  // Функция обработки клика по клетке. Получает порядковый номер клетки.
  const handleCellClick = (cellIndex) => {
    // Создание копии массива с текущими клетками
    const newCells = [...cells];
    // Изменение нужного элемента по порядковому номеру (который пришёл из Gamecell onClick)
    newCells[cellIndex] = currentPlayer;
    // Попытка найти победителя с новым, изменённым массивом клеток
    const winner = checkForAWinner(newCells);
    // Обновление текущего состояние игры
    setGameState({
      // Помещение в новое состояние нового, изменённого массива клеток
      cells: newCells,
      // Изменение игрока, который сейчас ходит: если был Х - станет О и наоборот
      currentPlayer: currentPlayer === "X" ? "O" : "X",
      // Изменение статуса "игра окончена": если будет непустая строка (не ''), то игра закончится (gameOver = true)
      gameOver: Boolean(winner),
      // Изменение победителя на того, которого выдаст проверка checkForAWinner
      winner,
    });
  };

  // Функция обработки клика по кнопке Restart
  // Обнуляет состояние игры до изначального значения
  const handleRestartClick = () => {
    setGameState({
      cells: [null, null, null, null, null, null, null, null, null],
      currentPlayer: "X",
      gameOver: false,
      winner: "",
    });
  };

  return (
    <>
      {/* Если есть победитель, будет span с надписью "Winner: *победитель*". Или просто "DRAW". */}
      {winner && <span>{winner !== 'DRAW' ? `Winner: ${winner}` : winner}</span>}
      <CellsWrapper>
        {/* Для каждой клетки из игрового состояния получаем её значение (cellValue: Х или О или null) и порядковый номер (cellIndex) */}
        {cells.map((cellValue, cellIndex) => (
          // Для каждой клетки создаём компонент Gamecell, передаём ему: 
          <Gamecell
            // - ключ (key, для корректной работы React) равный порядковому номеру клетки, cellIndex
            key={cellIndex}
            // - значение value равное значению клетки (cellValue: Х или О или null)
            value={cellValue}
            // - функцию () => handleCellClick(cellIndex) для отлавливания клика по данной клетке (она уже приняла в себя порядковый номер этой клетки)
            onClick={() => handleCellClick(cellIndex)}
            // - булевый флаг isClickable - ответ на вопрос "кликабельна ли эта клетка?". Она кликабельна только если:
            //      - значение клетки не пустое (не null)
            //      - и если игра не закончена
            isClickable={Boolean(!cellValue) && !gameOver}
          />
        ))}
      </CellsWrapper>
      {/* Если игра окончена, будет кнопка Restart с возможностью начать игру заново */}
      {gameOver && <button onClick={handleRestartClick}>Restart</button>}
    </>
  );
};

export default Gameboard;
