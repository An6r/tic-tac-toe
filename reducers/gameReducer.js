import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';
import {
  BOARD_SIZE,
  generateBoardGrid,
  verifyBoardCells
} from '../helpers/game';

export const initialState = {
  boardGrid: generateBoardGrid(),
  currentPlayer: 1,
  playersSymbols: {
	  1: 'X',
	  2: 'O'
  },
  winnerMarks: {},
  winnerPlayer: null,
  marksCount: 0,
  isTie: false,
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_SIGN: {
      const { currentPlayer } = state;
      const boardGrid = _.cloneDeep(state.boardGrid); 

      const { column, row } = action;

      boardGrid[column][row] = currentPlayer;

      return {
        ...state,
        boardGrid,
        marksCount: state.marksCount + 1,
      };
    }
    case actionTypes.VERIFY_BOARD: {
      const boardSize = BOARD_SIZE;
      const maxMarksCount = boardSize ** 2;

      const {
		  currentPlayer: winnerPlayer,
		  marksCount
	  } = state;

      if (marksCount === maxMarksCount) {
        return {
          ...state,
          isTie: true,
        };
      }

      const boardGrid = _.cloneDeep(state.boardGrid);

      for (let i = 0; i < boardSize; i += 1) {
        // Check if user won horizontally
        if (verifyBoardCells(boardGrid[i][0], boardGrid[i][1], boardGrid[i][2])) {
          return {
            ...state,
            winnerMarks: {
              [i]: [0, 1, 2],
            },
            winnerPlayer,
          };
        }

        // Check if user won vertically
        if (verifyBoardCells(boardGrid[0][i], boardGrid[1][i], boardGrid[2][i])) {
          return {
            ...state,
            winnerMarks: {
              0: [i],
              1: [i],
              2: [i],
            },
            winnerPlayer,
          };
        }
      }

      /*
       Check if user won diagonally
       */
      if (verifyBoardCells(boardGrid[0][0], boardGrid[1][1], boardGrid[2][2])) {
        return {
          ...state,
          winnerMarks: {
            0: [0],
            1: [1],
            2: [2],
          },
          winnerPlayer,
        };
      }

      if (verifyBoardCells(boardGrid[0][2], boardGrid[1][1], boardGrid[2][0])) {
        return {
          ...state,
          winnerMarks: {
            0: [2],
            1: [1],
            2: [0],
          },
          winnerPlayer,
        };
      }

      return state;
    }
    case actionTypes.NEXT_PLAYER: {
      return {
        ...state,
        currentPlayer: ((state.currentPlayer === 1) ? 2 : 1),
      };
    }
    case actionTypes.RESTART_GAME: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};