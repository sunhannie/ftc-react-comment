import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore,applyMiddleware,compose} from 'redux'
import { Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import {rootReducer,fetchDataInGet} from './reducers/question'
import App from './app'  //不需要添加{}
const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const enhancer = compose(
  applyMiddleware(...middleware),
);
const store = createStore(rootReducer,
   enhancer);


// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );

// const store = createStore(
//   reducer,
//   applyMiddleware(...middleware)
// )

// store.dispatch(fetchDataInGet());  
ReactDOM.render(
  <Provider store={store}>
  <App/>
  </Provider>,
  document.getElementById('root')
);
