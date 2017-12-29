/* Import Styles */
import './styles/main.scss';

/* Import 3rd party dependencies */
import 'babel-polyfill';

/* Configure Hot Reload */
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';

/* Render React App and subscriber to hot reloader */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootEl = document.getElementById('root');

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		rootEl
	)
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => render(App));
}
