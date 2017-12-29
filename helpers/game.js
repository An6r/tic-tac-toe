export const BOARD_SIZE = 3;
export const SYMBOLS = {
  X: 'times',
  O: 'circle-o',
};

export const generateBoardGrid = (boardSize = BOARD_SIZE) => {
  const boardGrid = new Array(boardSize);

  for (let i = 0; i < boardSize; i++) {
    const boardRows = new Array(boardSize);

    for (let j = 0; j < boardSize; j++) {
      boardRows[j] = null;
    }

    boardGrid[i] = boardRows;
  }

  return boardGrid;
};

export const verifyBoardCells = (firstSpace, secondSpace, thirdSpace) => (
	firstSpace !== null &&
	firstSpace === secondSpace &&
	firstSpace === thirdSpace
);