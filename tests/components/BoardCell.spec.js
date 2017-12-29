import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import BoardCell from '../../components/BoardCell';

function setupComponent() {
  const props = {
    column: 2,
    index: 1,
    value: 1,
    handleCellClick: jest.fn(),
    isWinnerMark: jest.fn(),
    getPlayerSymbol: () => 'X',
  };

  const wrapper = shallow(
    <BoardCell {...props} />,
  );

  return {
    props,
    wrapper,
  };
}

describe('<BoardCell />', () => {
  it('should render', () => {
    const { wrapper } = setupComponent();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should handle new sign on board space click', () => {
    const { wrapper, props } = setupComponent();

    wrapper.find('li').first().simulate('click');

    expect(props.handleCellClick.mock.calls).toEqual([
      [props.column, props.index],
    ]);
  });
});
