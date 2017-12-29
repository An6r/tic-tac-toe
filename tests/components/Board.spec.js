import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { initialState } from '../../reducers/gameReducer';

import Board from '../../components/Board';

function setupComponent() {
  const props = {
    grid: initialState.boardGrid,
    handleCellClick: jest.fn(),
    isWinnerMark: jest.fn(),
    getPlayerSymbol: jest.fn(),
  };

  const wrapper = shallow(
    <Board {...props} />,
  );

  return {
    props,
    wrapper,
  };
}

describe('<Board />', () => {
  it('should render', () => {
    const { wrapper } = setupComponent();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
