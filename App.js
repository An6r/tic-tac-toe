import React from 'react';
import { PropTypes } from 'prop-types';

/* React + Redux Setup */
import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux';
import { Provider } from 'react-redux';
import {
	persistStore,
	persistCombineReducers
} from 'redux-persist'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/es/storage';
import { PersistGate } from 'redux-persist/es/integration/react';
import reducers from './reducers';

const config = {
  key: 'root',
  storage,
};
const reducer = persistCombineReducers(config, reducers);

const middleware = [thunkMiddleware, createLogger({collapsed: true})];
const store = createStore(
	reducer,
	applyMiddleware(...middleware)
);
const persistor = persistStore(store);

/* High Level Container */
import AppContainer from './containers/AppContainer';

const App = () => (
	<Provider store={store} key='provider'>
		<PersistGate persistor={persistor}>
		  <AppContainer />
		</PersistGate>
	</Provider>
);

export default App;