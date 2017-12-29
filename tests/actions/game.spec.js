import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actionTypes from '../../actions/actionTypes';
import * as actions from '../../actions/game';
import { initialState } from '../../reducers/gameReducer';

describe('Actions', () => {
  it('should create an action to verify the status of the board', () => {
    const action = actions.verifyBoard();

    expect(action.type).toBe(actionTypes.VERIFY_BOARD);
  });

  it('should create an action to choose the next player', () => {
    const action = actions.nextPlayer();

    expect(action.type).toBe(actionTypes.NEXT_PLAYER);
  });

  it('should create an action to create new sign and handle gameVerify and nextPlayer', async () => {
    const column = 0;
    const row = 1;

    const mockStore = configureMockStore([thunk]);

    const store = mockStore(initialState);

    store.dispatch(actions.newSignOnBoard(column, row));

    const dispatchedActions = store.getActions();

    expect(dispatchedActions).toEqual([{
        type: actionTypes.NEW_SIGN,
        column,
        row,
      }, {
        type: actionTypes.VERIFY_BOARD,
      }, {
        type: actionTypes.NEXT_PLAYER,
      },
    ]);
  });
});
