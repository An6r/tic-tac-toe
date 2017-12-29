import { gameReducer as reducer, initialState as state } from '../../reducers/gameReducer';
import { BOARD_SIZE } from '../../helpers/game';
import * as types from '../../actions/actionTypes';

describe('Game Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toBe(state);
  });

  it('should handle a new sign', () => {
    expect(
      reducer(state, {
        type: types.NEW_SIGN,
        column: 0,
        row: 1,
      }),
    ).toMatchSnapshot();
  });

  it('should define player 1 as winner on vertical board spaces', () => {
    expect(
      reducer({
        ...state,
        boardGrid: [
          [
            1,
            null,
            null,
          ],
          [
            1,
            null,
            null,
          ],
          [
            1,
            null,
            null,
          ],
        ],
      }, {
        type: types.VERIFY_BOARD,
      }),
    ).toMatchSnapshot();
  });

  it('should define player 1 as winner on diagonal board spaces', () => {
    expect(
      reducer({
        ...state,
        boardGrid: [
          [
            1,
            null,
            null,
          ],
          [
            null,
            1,
            null,
          ],
          [
            null,
            null,
            1,
          ],
        ],
      }, {
        type: types.VERIFY_BOARD,
      }),
    ).toMatchSnapshot();
  });

  it('should define game as tie', () => {
    expect(
      reducer({
        ...state,
        marksCount: BOARD_SIZE ** 2,
      }, {
        type: types.VERIFY_BOARD,
      }),
    ).toMatchSnapshot();
  });

  it('should change to the next player', () => {
    expect(
      reducer(state, {
        type: types.NEXT_PLAYER,
      }),
    ).toMatchSnapshot();
  });

  it('should restart to the initial state but keep the chosen player symbol', () => {
    expect(
      reducer({
        ...state,
        playersSymbols: {
          1: 'X',
          2: 'O',
        },
      }, {
        type: types.RESTART_GAME,
      }),
    ).toMatchSnapshot();
  });
});
