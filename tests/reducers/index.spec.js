import reducers from '../../reducers';

describe('reducers', () => {
	it('should describe all application reducers', () => {
		expect(reducers).toMatchSnapshot();
	});
});
