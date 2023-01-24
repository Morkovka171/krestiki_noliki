import { winningCombinationsList } from './helpers';

// Функция для проверки наличия победителя
// Принимает текущее состояние клеток в игре
// Возвращает победителя: или 'X', или 'O', или 'DRAW' или ''

export const checkForAWinner = (currentGameCells) => {

  //Расчёт количества непустых клеток в текущей игре
  const notEmptyCellsCounter = currentGameCells.filter((currentGameCell) => currentGameCell).length;

  // Для каждой строки (выигрышной комбинации):
  // Проверить, не пустая ли 1, 2 и 3 клетка?
  // После этого: равны ли значения в 1, 2 и 3 клетках? (есть ли Х-Х-Х или О-О-О)
  // Если выигрышная комбинация с Х-Х-Х или О-О-О нашлась - она попадёт в victoryCombination
  // Если не нашлась - там будет undefined
  const victoryCombination = winningCombinationsList.find(
    (winningCombination) =>
      currentGameCells[winningCombination[0]] &&
      currentGameCells[winningCombination[1]] &&
      currentGameCells[winningCombination[2]] &&
      currentGameCells[winningCombination[0]] === currentGameCells[winningCombination[1]] &&
      currentGameCells[winningCombination[1]] === currentGameCells[winningCombination[2]]
  );

  // Если победная комбинация нашлась - функция вернёт букву из первой её клетки
  if (victoryCombination) { return currentGameCells[victoryCombination[0]] }
  // Если победная комбинация не нашлась, но все 9 клеток полные - функция вернёт "DRAW" (ничья)
  if (notEmptyCellsCounter === 9) { return "DRAW" }
  // Если победная комбинация не нашлась, и не все 9 клеток заполнены - функия вернёт пустую строку
  return ''
};

//Если у функции выполнился return - дальше она не исполняется.
//Поэтому если выполнится первый return - остальные не исполнятся.