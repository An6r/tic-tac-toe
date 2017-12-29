import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { initialState as game } from '../../reducers/gameReducer';
import ConnectedApp, { AppContainer } from '../../containers/AppContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setupComponent() {
  const props = {
    ...game,
    actions: {
      restartGame: jest.fn()
    },
  };

  const wrapper = shallow(
    <AppContainer {...props} />,
  );

  return {
    props,
    wrapper
  };
}

describe('<App />', () => {
  it('should render without exploding', () => {
    const store = mockStore({
      game,
    });

    const wrapper = shallow(
      <ConnectedApp store={store} />,
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should restart the game on button click', () => {
    const { wrapper, props } = setupComponent();

    wrapper.find('Button[name="restart"]').simulate('click');

    expect(props.actions.restartGame.mock.calls.length).toBe(1);
  });
});
