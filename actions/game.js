import * as actionsTypes from './actionTypes';

export const verifyBoard = () => ({
  type: actionsTypes.VERIFY_BOARD,
});

export const nextPlayer = () => ({
  type: actionsTypes.NEXT_PLAYER,
});

export const newSignOnBoard = (column, row) =>
  (dispatch) => {
    dispatch({
      type: actionsTypes.NEW_SIGN,
      column,
      row,
    });

    dispatch(verifyBoard());

    return dispatch(nextPlayer());
  };

export const restartGame = () => ({
  type: actionsTypes.RESTART_GAME
});